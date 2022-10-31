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
    // test web3
    console.log(keypair.publicKey);
    getTransactions(keypair.publicKey);
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
        });
    }
    res.writeHead(200, {'Content-Type': 'text/plain', 'access-control-allow-origin': '*'});
    res.end('OK');
}).listen(8080);


async function getTransactions(publicKey) {
    console.log('connecting to ' + web3.clusterApiUrl('mainnet-beta'))
    const connection = new web3.Connection(web3.clusterApiUrl('mainnet-beta'), 'confirmed',);
    let tx_sigs = await connection.getSignaturesForAddress(new web3.PublicKey('7KQWkLzkCqvncLPxZufEoKcPo8Zyf3EmhJUXChukr5EZ'), {limit: 10});
    tx_sigs = tx_sigs.map(x => x.signature).slice(0, 1);        // TODO: remove slice
    // let tx = await connection.getTransactions(tx_sigs);
    let tx = await connection.getTransactions(['4BYBoYx2ts85NYorq2HKJxVLN1JzGEetBzXXEmpgF7jkDMQnmPdCD9TwJvLMLhNDgyHGtqnEQ3c7hqUjpMAAtTy9']);
    console.log('found tx: ' + tx.length);
    isIncomingPayment(tx[0]);

}

async function isIncomingPayment(tx) {
    console.log('checking for an incoming payment...')
    console.log('tx_sig: ' + tx.transaction.signatures);
    console.log('wallet: ' + tx.transaction.message.accountKeys[1].toString());
    let delta = tx.meta.postBalances[1] - tx.meta.preBalances[1];
    console.log('balance change: ' + delta / LAMPORTS_PER_SOL);
}