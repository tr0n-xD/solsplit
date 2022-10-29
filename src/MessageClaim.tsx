import React, { useState } from "react";
import { Message } from "./Types";
import { WalletContext } from "./App";
import { fn_url } from "./Config";

export default function MessageClaim(props: {message: Message, selectMessage: any, successFn: any}) {
    const wallet = React.useContext(WalletContext);
    const [sending, setSending] = useState<boolean | undefined>(undefined);
    const [error, setError] = useState<string | undefined>(undefined);

    async function claimReward() {
        if (!wallet.provider || !wallet.key) return;
        setSending(true);
        let response = await fetch(fn_url + "messageclaim", {
            method: 'POST',
            headers: {'Accept': 'application/json', 'Content-Type': 'text/plain'},
            body: JSON.stringify({
                walletKey: wallet.key,
                id: props.message.id,
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
                    There is a {props.message.reward} SOL reward to read this message!
                </div>
                <img alt='' height='90px' src='reward.png'/>
                {   error ? <div style={{color: 'red'}}>{error}</div>
                    : sending ? <div>Sending...</div>
                    : <button className='clickButton' onClick={() => claimReward()}>CLAIM REWARD</button>
                }
                <div className='flexRow'>
                    <button className='clickButton' onClick={() => props.selectMessage(undefined)}>BACK</button>
                </div>
            </div>
        </div>
    )
}
