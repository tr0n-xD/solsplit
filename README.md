# SOLSPLIT.io

Royalty sharing app for Solana, made by Tr0n from Restack.AI for MagicEden Hackathon :) 

## 1. Submission

Project name: "Solsplit", team members: "Tr0n".

Description of project: Solsplit is a safe and secure royalty sharing app for Solana.

I imagined an easy way for teams to receive royalty payments, and those payments would
be automatically split and dispursed to the team members in the percentages they agreed.
Hopefully, Solsplit can help with dynamic royalty sharing for teams in the future :)

Demo video: Please watch the Solsplit demo at https://www.youtube.com/watch?v=8rDZctLgxao

Access to github: https://github.com/tr0n-xD/solsplit

Working application: You can use also use the frontend at: https://solsplit.io
(note: the backend must be running locally for this to work, see below)

## 2. Technical architecture

Frontend - React
Backend - node
Web3 - solana, web3, metaplex

Please first set up and run the node solsplit backend locally on localhost:8080.

Then, go to solsplit.io and test the frontend.

## 3. Set up and run the backend

Clone this repo and open a command line at server/

Run the command: ./grindkey.sh
This will set up a keypair starting with "SPL" for use by the application. Keep the private key private :)

Now run the command: node solsplit.js

## 4. Run the frontend

Build the frontend: npm install

Run the frontend as a react app.

Navigate through the frontend pages to create a solsplit. Clicking the final button "CREATE SOLSPLIT"
will communicate with the backend and set up the solsplit.

Once this is successful, you can copy the solsplit public wallet address from the frontend.

Now, solsplit is running and ready for use :)

## 5. Send a payment

Send a small payment (e.g. 0.01 SOL) to the SPL* wallet address.

Watch the server logs from part 1 (your node solsplit.js server should still be running...)

Every 20 seconds solsplit will look for incoming payments to the SPL* wallet and disburse them to
the team members defined in the solsplit, according to the share amounds, and less a small fee (1%)

To verify that solsplit is working properly, look at SOL transfers on the account in solscan.

E.g.: https://solscan.io/account/SPLhaiLwHYVzLS9739CAX9cShr4pxzPje28b4EhBoMS#solTransfers

## 6. Tidy up

You can look at the SPL*.json file to find the private key for the solsplit wallet.

Import this private key into phantom wallet to access the wallet, if you need to tidy up any funds.

