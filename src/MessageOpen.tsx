import React, { useState } from "react";
import { Message } from "./Types";
import { WalletContext } from "./App";
import { sendNFTSMS } from "./Tokens";
import { fn_url } from "./Config";

export default function MessageOpen(props: {message: Message, selectMessage: any, successFn: any}) {
    const wallet = React.useContext(WalletContext);
    const [sending, setSending] = useState<boolean | undefined>(undefined);
    const [error, setError] = useState<string | undefined>(undefined);

    async function openMessage() {
        if (!wallet.provider || !wallet.key) return;
        console.log('opening message...');
        let signature = await sendNFTSMS(wallet.provider, wallet.key, 1);
        if (!signature) return;
        setSending(true);
        console.log('message opened, signature:', signature);
        let response = await fetch(fn_url + "messageopen", {
            method: 'POST',
            headers: {'Accept': 'application/json', 'Content-Type': 'text/plain'},
            body: JSON.stringify({
                walletKey: wallet.key,
                id: props.message.id,
                signature: signature,
            })
        });
        if (response.ok) {
            props.successFn();
        } else {
            console.log(response);
            setError('error.');
        }
    }

    return (
        <div style={{height: '50px'}}>
            <div className='flexColumn'>
                <div style={{margin: '10px', color: 'lawngreen'}}>Message from: { props.message.fromAlias }</div>
                <div>
                    Exchange your NFTSMS token to open this message.
                </div>
                <img alt='' height='50px' src='nftsms-50.png'/>
                {   error ? <div style={{color: 'red'}}>{error}</div>
                    : sending ? <div>Sending...</div>
                    : <button className='clickButton' onClick={() => openMessage()}>OPEN MESSAGE</button>
                }
                <div className='flexRow'>
                    <button className='clickButton' onClick={() => props.selectMessage(undefined)}>BACK</button>
                </div>
            </div>
        </div>
    )
}
