var http = require('http');
var fs = require('fs');

console.log('Welcome to solsplit :)')

// locate the keyfile
let files = fs.readdirSync('.').filter(x => x.startsWith('SPL'));
if (files.length === 0) {
    console.log('didnt find the key file - run grindkey.sh first.');
    return;
}
let keyfile = files[0];
console.log('using keyfile: ' + keyfile);

// start http server
http.createServer(function (req, res) {
    console.log('req from ' + req.url);
    if (req.url !== '/create') return;
    if (req.method === 'POST') {
        req.on('data', function(chunk) {
            console.log("Received body data:");
            let participants = chunk.toString();
            console.log(participants);
            console.log('starting server process...');
        });
    }
    res.writeHead(200, {'Content-Type': 'text/plain', 'access-control-allow-origin': '*'});
    res.end('OK');
}).listen(8080);

console.log('http server started on http://localhost:8080/create...');
