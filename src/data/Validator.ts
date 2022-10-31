import { Participant } from "./Types";
import { PublicKey } from "@solana/web3.js";

export function ValidateParticipant(participant: Participant) {
    let errors : string[] = [];
    if (participant.name.length < 1) errors.push('Please enter a name');
    try {
        if (participant.walletKey.length < 1) errors.push('Please enter a wallet address');
        else if (participant.walletKey.length !== 44) errors.push('Wallet address too short');
        else if (!PublicKey.isOnCurve(new PublicKey(participant.walletKey))) errors.push('Invalid wallet address');
    } catch (e : any) {
        errors.push(e.message);
    }
    return errors;
}