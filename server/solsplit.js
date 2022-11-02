var http = require('http');
var fs = require('fs');
const web3 = require("@solana/web3.js");
const {LAMPORTS_PER_SOL} = require("@solana/web3.js");

let MINIMUM_AMOUNT_SOL = 0.001;
let COMMISSION_PCT = 1;
let participants;
let keypair;

console.log('*** welcome to Solsplit server v1.0.0 ***')

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
    console.log('request from solsplit frontend (url: /create)');
    if (req.url !== '/create') return;
    if (req.method === 'POST') {
        req.on('data', function(chunk) {
            console.log("Received data:");
            participants = JSON.parse(chunk.toString());
            console.log(participants);
            console.log('solsplit is now configured!');
        });
    }
    res.writeHead(200, {'Content-Type': 'text/plain', 'access-control-allow-origin': '*'});
    res.end(JSON.stringify({walletKey: keypair.publicKey.toString()}));
}).listen(8080);

let lastSignature = null;

async function getTransactions(publicKey) {
    if (!keypair) return;
    console.log('\ngetting signatures for: ' + publicKey.toString() + ' after : ' + (lastSignature ? lastSignature.slice(0, 6) + '....' : 'start'));
    const connection = new web3.Connection(web3.clusterApiUrl('mainnet-beta'), 'confirmed',);
    let tx_sigs = await connection.getSignaturesForAddress(new web3.PublicKey(keypair.publicKey), {limit: 10, until: lastSignature});
    if (tx_sigs.length === 0) {
        console.log('No new signatures.');
        return;
    }
    console.log('Found: ' + tx_sigs.length + ' new signatures.');
    lastSignature = tx_sigs[0].signature;
    tx_sigs = tx_sigs.map(x => x.signature);
    let transactions = await Promise.all(tx_sigs.map(x => connection.getTransactions([x])));
    transactions = transactions.map(arr => arr[0]).reverse();
    for (const tx of transactions) {
        if (isIncomingPayment(tx)) {
            sendOutgoingPayments(connection, tx);
        }
    }
}

setInterval(() => getTransactions(keypair.publicKey), 20000);

function isIncomingPayment(tx) {
    console.log('checking tx: ' + tx.transaction.signatures);
    if (!tx.meta.logMessages.includes('Program 11111111111111111111111111111111 success')) return false;
    if (tx.transaction.message.accountKeys[1].toString() !== keypair.publicKey.toString()) return false;
    if (tx.transaction.message.accountKeys[2].toString() !== '11111111111111111111111111111111') return false;
    if (tx.meta.postBalances[1] - tx.meta.preBalances[1] < MINIMUM_AMOUNT_SOL) return false;
    console.log('> yes, this is an incoming payment.');
    return true;
}

async function sendOutgoingPayments(connection, tx) {
    if (!participants) {
        console.log('No participatns to send to! Run solsplit frontend.');
        return;
    }
    console.log('sending outgoing payments...');
    let totalAmount = Math.trunc((tx.meta.postBalances[1] - tx.meta.preBalances[1]) * (100-COMMISSION_PCT) / 100);
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
