import { Connection, Keypair, LAMPORTS_PER_SOL, PublicKey, SystemProgram } from "@solana/web3.js";
import { AccountInfo, Token, TOKEN_PROGRAM_ID } from "@solana/spl-token";

const bs58 = require('bs58');
const web3 =  require('@solana/web3.js');
const splToken = require('@solana/spl-token');

global.Buffer = global.Buffer || require('buffer').Buffer;

export async function solXfer(walletKey: string, amount: number) {

    console.log('sending ' + amount + ' SOL to ' + walletKey + '...');

    const bankKeypair = web3.Keypair.fromSecretKey(bs58.decode(process.env.REACT_APP_BANK_PRIVATE_KEY));
    const bankWallet = new PublicKey(''+process.env.REACT_APP_BANK_WALLET_ADDRESS);
    const solReceiver = new PublicKey(walletKey);

    //Create connection to mainnet
    const connection = new web3.Connection(web3.clusterApiUrl('mainnet-beta'),
        {commitment: 'confirmed', confirmTransactionInitialTimeout: 120 * 1000});

    try {
        return await transfer_sol(
            bankKeypair,
            connection,
            amount,
            bankWallet,
            solReceiver,
        )
    } catch (error) {
        console.log(error)
    }
}

async function transfer_sol(signer: Keypair, connection: Connection, amount: number, fromAddress: PublicKey, toAddress: PublicKey) {
    var transferTrx = new web3.Transaction().add(
        SystemProgram.transfer({
            fromPubkey: fromAddress,
            toPubkey: toAddress,
            lamports: amount * LAMPORTS_PER_SOL,
        }),
    );

    var signature = await web3.sendAndConfirmTransaction(
        connection,
        transferTrx,
        [signer],
    );

    console.log("Transaction signature", signature);
    console.log("Success!");
    return signature;
}
