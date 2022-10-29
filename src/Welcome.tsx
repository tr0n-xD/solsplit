import React from 'react';
import './App.css';
import WalletPanel from "./WalletPanel";
import PanelMain from "./PanelMain";
import { WalletContext } from "./App";
import CreditPanel from "./CreditPanel";
import PanelMessages from "./PanelMessages";
import PanelSend from "./PanelSend";
import PanelHelp from "./PanelHelp";
import PanelTopUp from "./PanelTopUp";
import PanelReceipts from "./PanelReceipts";

export default function Welcome(props: {panel: string}) {
    const wallet = React.useContext(WalletContext);
    return (
        <div className="App">
            <div className='flexColumn'>
                <WalletPanel/>
                <div className='headingText' style={{height: '60px'}}>SOLSPLIT</div>
                { wallet.key ?
                    (   props.panel === 'main' ? <PanelMain/> :
                        props.panel === 'messages' ? <PanelMessages/> :
                        props.panel === 'send' ? <PanelSend/> :
                        props.panel === 'receipts' ? <PanelReceipts/> :
                        props.panel === 'topup' ? <PanelTopUp/> :
                        props.panel === 'help' ? <PanelHelp/> :
                        <div>huh?</div>)
                    :
                    <div style={{height: '300px', width: '300px'}}>
                        <img alt='nokia' src='/split.png' height='200px' style={{padding: '15px'}}/>
                        <div>Secure and easy royalty sharing for Solana :)</div>
                    </div>
                }
                <CreditPanel/>
            </div>
        </div>
    );
}
