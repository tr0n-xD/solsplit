import React from "react";
import { WalletContext } from "./App";
import { Link } from "react-router-dom";

export default function PanelMain() {
    const wallet = React.useContext(WalletContext);
    // const testMsg1 = {id: 1001, walletFrom: '111', walletTo: '999', aliasFrom: 'Steve', text: 'This is a really really cool message! Call me :)', status: 'SENT', dateSent: new Date(), dateRead: undefined, dateDeleted: undefined,}
    // const testMsg2 = {id: 1002, walletFrom: '122', walletTo: '999', aliasFrom: 'John', text: 'Wow, this message system works! Awesome.', status: 'SENT', dateSent: new Date(), dateRead: undefined, dateDeleted: undefined,}
    // const messages = [testMsg1, testMsg2];
    const messages = wallet.player.messages;

    return (
        messages === undefined ? <div style={{height: '300px'}}><div style={{textAlign: 'center'}}>loading...</div></div> :
                    <div className='flexColumn justifyStart' style={{height: '300px'}}>
                        <div className='flexRow gap5' style={{marginTop: '20px'}}>
                            <div>Welcome to Solsplit</div><img alt='' height='24px' src='heart-32.png' style={{marginTop: '2px'}}/>
                        </div>
                        <div>Set up royalty sharing with your friends and colleagues</div>
                        <div>It's safe, secure and easy!</div>

                        <div style={{marginTop: '20px'}}>This project is an entry to the MagicEden hackathon</div>
                        <div>We hope you like it :)</div>
                    </div>
    )
}
