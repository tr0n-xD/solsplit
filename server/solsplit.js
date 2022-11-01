var http = require('http');
var fs = require('fs');
const web3 = require("@solana/web3.js");
const {LAMPORTS_PER_SOL} = require("@solana/web3.js");

let participants;
let keypair;

console.log('*** Welcome to Solsplit server v1.0.0 ***')

// locate the keyfile and make keypair
let files = fs.readdirSync('.').filter(x => x.startsWith('SPL'));
if (files.length === 0) {
    console.log('didnt find the key file - run grindkey.sh first.');
    return;
}
let keyfile = files[0];
console.log('using keyfile: ' + keyfile);
fs.readFile(keyfile, (err, data) => {
    if (err) throw err;
    keypair = web3.Keypair.fromSecretKey(new Uint8Array(JSON.parse(data.toString())));
});

// start http server
console.log('starting http server on http://localhost:8080/create...');
http.createServer(function (req, res) {
    console.log('req from ' + req.url);
    if (req.url !== '/create') return;
    if (req.method === 'POST') {
        req.on('data', function(chunk) {
            console.log("Received body data:");
            participants = JSON.parse(chunk.toString());
            console.log(participants);
            console.log('starting server process...');
            getTransactions(keypair.publicKey);
        });
    }
    res.writeHead(200, {'Content-Type': 'text/plain', 'access-control-allow-origin': '*'});
    res.end(JSON.stringify({walletKey: keypair.publicKey.toString()}));
}).listen(8080);


async function getTransactions(publicKey) {
    console.log('getting transactions for: ' + publicKey.toString());
    console.log('connecting to ' + web3.clusterApiUrl('mainnet-beta'))
    const connection = new web3.Connection(web3.clusterApiUrl('mainnet-beta'), 'confirmed',);
    let tx_sigs = await connection.getSignaturesForAddress(new web3.PublicKey('7KQWkLzkCqvncLPxZufEoKcPo8Zyf3EmhJUXChukr5EZ'), {limit: 10});
    tx_sigs = tx_sigs.map(x => x.signature).slice(0, 1);        // TODO: remove slice
    // let tx = await connection.getTransactions(tx_sigs);
    let tx = await connection.getTransactions(['7nWPcwHjckxjZHtJiH78miK3upPH5hNuN9S3VTA3gzuQKASEzY1TcySNHu6dytuiT4xW7Ce14ieLnZo2NbdRwo7']);
    console.log('found tx: ' + tx.length);
    if (isIncomingPayment(tx[0])) {
        sendOutgoingPayments(connection, tx[0]);
    }

}

async function isIncomingPayment(tx) {
    console.log('checking tx: ' + tx.transaction.signatures)
    let delta = tx.meta.postBalances[1] - tx.meta.preBalances[1];
    console.log('sol delta: ' + delta / LAMPORTS_PER_SOL);
    if (delta > 0.001) {
        console.log('> yes, this is an incoming payment.');
        return true;
    } else if (delta > 0) {
        console.log('! payment is below minimum amount: 0.001 SOL, ignoring.');
        return true;
    } else {
        console.log('! not an incoming payment, ignoring.');
        return false;
    }
}

async function sendOutgoingPayments(connection, tx) {
    if (!participants) return;
    console.log('sending outgoing payments...');
    let totalAmount = Math.trunc((tx.meta.postBalances[1] - tx.meta.preBalances[1]) * 0.98);    // 2% commission
    let totalShares = participants.reduce((sum, x) => sum + x.share, 0);
    let teamWithAmounts = participants.map(x => ({...x, amount: Math.trunc((totalAmount * x.share) / totalShares)}));

    for (const x of teamWithAmounts) {
        await sendPayment(connection, x.walletKey, x.amount);
    }
}

async function sendPayment(connection, walletKey, amount) {
    console.log('sending ' + amount / LAMPORTS_PER_SOL + ' SOL to ' + walletKey + '...');
    let transaction = new web3.Transaction({feePayer: keypair.publicKey, recentBlockhash: (await connection.getLatestBlockhash()).blockhash});
    transaction.add(
        web3.SystemProgram.transfer({
            fromPubkey: keypair.publicKey,
            toPubkey: new web3.PublicKey(walletKey),
            lamports: amount,
        })
    );
    transaction.sign(keypair);
    console.log('signature: ' + await connection.sendRawTransaction(transaction.serialize()));
}
