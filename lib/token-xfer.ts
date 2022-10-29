import { Connection, Keypair, LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";
import { AccountInfo, Token, TOKEN_PROGRAM_ID } from "@solana/spl-token";

const bs58 = require('bs58');
const web3 =  require('@solana/web3.js');
const splToken = require('@solana/spl-token');

global.Buffer = global.Buffer || require('buffer').Buffer;

export async function tokenXfer(walletKey: string, amount: number) {

    console.log('sending ' + amount + ' tokens to ' + walletKey + '...');

    const bankKeypair = web3.Keypair.fromSecretKey(bs58.decode(process.env.REACT_APP_BANK_PRIVATE_KEY));
    const bankWallet = new PublicKey(''+process.env.REACT_APP_BANK_WALLET_ADDRESS);
    const tokenAddr = new PublicKey(''+process.env.REACT_APP_NFTSMS_TOKEN_ADDRESS);
    const tokenMintAddress = new PublicKey(tokenAddr);
    const nftReceiver = new PublicKey(walletKey);

    //Create connection to mainnet
    const connection = new web3.Connection(web3.clusterApiUrl('mainnet-beta'),
        {commitment: 'confirmed', confirmTransactionInitialTimeout: 120 * 1000});

    let bankTokenAccount = await new Token(connection, tokenMintAddress, TOKEN_PROGRAM_ID, bankKeypair)
        .getOrCreateAssociatedAccountInfo(bankKeypair.publicKey);

    let receiverTokenAccount = await new Token(connection, tokenMintAddress, TOKEN_PROGRAM_ID, bankKeypair)
        .getOrCreateAssociatedAccountInfo(nftReceiver);

    console.log('Bank token account public address: ' + bankTokenAccount.address);
    console.log('Receiver token account public address: ' + receiverTokenAccount.address);

    try {
        return await transfer_tokens(
            bankKeypair,
            connection,
            amount,
            bankTokenAccount,
            receiverTokenAccount,
            bankWallet,
        )
    } catch (error) {
        console.log(error)
    }
}

async function transfer_tokens(signer: Keypair, connection: Connection, amount: number, fromTokenAccount: AccountInfo, toTokenAccount: AccountInfo, fromAddress: PublicKey) {
    var transferTrx = new web3.Transaction().add(
        splToken.Token.createTransferInstruction(
            splToken.TOKEN_PROGRAM_ID,
            fromTokenAccount.address,
            toTokenAccount.address,
            fromAddress,
            [signer],
            amount * LAMPORTS_PER_SOL,
        )
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
