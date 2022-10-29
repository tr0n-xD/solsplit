import { PhantomProvider } from "./App";
import { LAMPORTS_PER_SOL, PublicKey, SystemProgram, Transaction, TransactionSignature } from "@solana/web3.js";
import { ASSOCIATED_TOKEN_PROGRAM_ID, TOKEN_PROGRAM_ID } from "@solana/spl-token";

const web3 = require("@solana/web3.js");
const splToken = require('@solana/spl-token');

global.Buffer = global.Buffer || require('buffer').Buffer;

export async function getRSTK(walletKey: string | undefined) {
    if (!walletKey) return;

    // token config
    const playerPubkey = new PublicKey(walletKey);
    const tokenMintAddress = new PublicKey(process.env.REACT_APP_RESTACK_TOKEN_ADDRESS!);

    // Connect to cluster
    const connection = new web3.Connection(web3.clusterApiUrl('mainnet-beta'), 'confirmed',);

    console.log('player splToken.getOrCreateAssociatedTokenAccount...');
    let playerTokenAccount = await splToken.Token.getAssociatedTokenAddress(ASSOCIATED_TOKEN_PROGRAM_ID, TOKEN_PROGRAM_ID, tokenMintAddress, playerPubkey)
        .catch((reason :any) => { return {amount: BigInt(0)}; });

    let accountInfo = await new splToken.Token(connection, tokenMintAddress, TOKEN_PROGRAM_ID, null).getAccountInfo(playerTokenAccount)
        .catch((reason :any) => { return {amount: BigInt(0)}; });

    return Number(BigInt(accountInfo.amount) / BigInt(LAMPORTS_PER_SOL));
}

export async function sendRSTKandSOL(provider: PhantomProvider, walletKey: string, amount_rstk: number, amount_sol: number) {
    console.log('sendRSTKandSOL...');
    if (!provider || !walletKey) return;

    console.log('wallet ' + walletKey + ' is sending ' + amount_rstk + ' RSTK and ' + amount_sol + ' SOL to bank...');

    // token xfer
    const playerPubkey = new PublicKey(walletKey);
    const bankPubkey = new PublicKey(process.env.REACT_APP_BANK_WALLET_ADDRESS!);
    const tokenMintAddress = new PublicKey(process.env.REACT_APP_RESTACK_TOKEN_ADDRESS!);
    const bankTokenAccount = new PublicKey(process.env.REACT_APP_BANK_TOKEN_ACCOUNT!);

    // Connect to cluster
    const connection = new web3.Connection(web3.clusterApiUrl('mainnet-beta'), 'confirmed',);

    console.log('player splToken.getOrCreateAssociatedTokenAccount...');
    let playerTokenAccount = await splToken.Token.getAssociatedTokenAddress(ASSOCIATED_TOKEN_PROGRAM_ID, TOKEN_PROGRAM_ID, tokenMintAddress, playerPubkey)
        .catch((reason :any) => { return {amount: BigInt(0)}; });

    console.log('Source token account public address: ' + playerTokenAccount.toBase58());
    console.log('Dest token account public address: ' + bankTokenAccount);

    console.log('creating transaction...');
    // Create a TX object
    let transaction = new Transaction({
        feePayer: playerPubkey,
        recentBlockhash: (await connection.getLatestBlockhash()).blockhash
    });

    // Add instructions to the tx
    transaction.add(
        splToken.Token.createTransferInstruction(
            TOKEN_PROGRAM_ID,
            playerTokenAccount,
            bankTokenAccount,
            playerPubkey,
            [],
            amount_rstk * LAMPORTS_PER_SOL,
        )
    );

    if (amount_sol > 0) {
        transaction.add(
            SystemProgram.transfer({
                fromPubkey: playerPubkey,
                toPubkey: bankPubkey,
                lamports: amount_sol * LAMPORTS_PER_SOL,
            }),
        )
    }

    // Get the TX signed by the wallet (signature stored in-situ)
    await provider.signTransaction(transaction);

    // Send the TX to the network
    let signature;
    await connection.sendRawTransaction(transaction.serialize())
        .then((sig: TransactionSignature) => {
            signature = sig;
            console.log(`Transaction: ${sig}`);
            connection.confirmTransaction(sig);
        })
        .catch(console.error);

    return signature;
}


export async function sendNFTSMS(provider: PhantomProvider, walletKey: string, amount_nftsms: number) {
    console.log('sendRSTKandSOL...');
    if (!provider || !walletKey) return;

    console.log('wallet ' + walletKey + ' is sending ' + amount_nftsms + ' NFTSMS.io token to bank...');

    // token xfer
    const playerPubkey = new PublicKey(walletKey);
    const tokenMintAddress = new PublicKey(process.env.REACT_APP_NFTSMS_TOKEN_ADDRESS!);
    const bankTokenAccount = new PublicKey(process.env.REACT_APP_BANK_NFTSMS_TOKEN_ACCOUNT!);

    // Connect to cluster
    const connection = new web3.Connection(web3.clusterApiUrl('mainnet-beta'), 'confirmed',);

    console.log('player splToken.getOrCreateAssociatedTokenAccount...');
    let playerTokenAccount = await splToken.Token.getAssociatedTokenAddress(ASSOCIATED_TOKEN_PROGRAM_ID, TOKEN_PROGRAM_ID, tokenMintAddress, playerPubkey)
        .catch((reason :any) => { return {amount: BigInt(0)}; });

    console.log('Source token account public address: ' + playerTokenAccount.toBase58());
    console.log('Dest token account public address: ' + bankTokenAccount);

    console.log('creating transaction...');
    // Create a TX object
    let transaction = new Transaction({
        feePayer: playerPubkey,
        recentBlockhash: (await connection.getLatestBlockhash()).blockhash
    });

    // Add instructions to the tx
    transaction.add(
        splToken.Token.createTransferInstruction(
            TOKEN_PROGRAM_ID,
            playerTokenAccount,
            bankTokenAccount,
            playerPubkey,
            [],
            amount_nftsms * LAMPORTS_PER_SOL,
        )
    );

    // Get the TX signed by the wallet (signature stored in-situ)
    await provider.signTransaction(transaction);

    // Send the TX to the network
    let signature;
    await connection.sendRawTransaction(transaction.serialize())
        .then((sig: TransactionSignature) => {
            signature = sig;
            console.log(`Transaction: ${sig}`);
            connection.confirmTransaction(sig);
        })
        .catch(console.error);

    return signature;
}

