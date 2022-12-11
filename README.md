# SOLSPLIT.io

Royalty sharing app for solana, made by tr0n_xD#6641, for MagicEden hackathon :) 

This app consists of a frontend and a backend.

Please watch the Solsplit demo at https://www.youtube.com/watch?v=8rDZctLgxao

You can use also use the frontend at: https://solsplit.io (note: the backend must be running locallt for this to work, see below)

## 1. Set up and run the backend

Clone this repo and open a command line at server/

Run the command: ./grindkey.sh
This will set up a keypair starting with "SPL" for use by the application. Keep the private key private :)

Now run the command: node solsplit.js

## 2. Run the frontend

Build the frontend: npm install

Run the frontend as a react app.

Navigate through the frontend pages to create a solsplit. Clicking the final button "CREATE SOLSPLIT"
will communicate with the backend and set up the solsplit.

Once this is successful, you can copy the solsplit public wallet address from the frontend.

Now, solsplit is running and ready for use :)

## 3. Send a payment

Send a small payment (e.g. 0.01 SOL) to the SPL* wallet address.

Watch the server logs from part 1 (your node solsplit.js server should still be running...)

Every 20 seconds solsplit will look for incoming payments to the SPL* wallet and disburse them to
the team members defined in the solsplit, according to the share amounds, and less a small fee (1%)

To verify that solsplit is working properly, look at SOL transfers on the account in solscan.

E.g.: https://solscan.io/account/SPLhaiLwHYVzLS9739CAX9cShr4pxzPje28b4EhBoMS#solTransfers

## 4. Tidy up

You can look at the SPL*.json file to find the private key for the solsplit wallet.

Import this private key into phantom wallet to access the wallet, if you need to tidy up any funds.

