import React from "react";
import { WalletContext } from "./App";

export default function PanelMain() {
    const wallet = React.useContext(WalletContext);
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
