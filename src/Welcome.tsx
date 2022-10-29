import React from 'react';
import './App.css';
import WalletPanel from "./WalletPanel";
import PanelMain from "./PanelMain";
import { WalletContext } from "./App";
import CreditPanel from "./CreditPanel";
import PanelHelp from "./PanelHelp";

export default function Welcome(props: {panel: string}) {
    const wallet = React.useContext(WalletContext);
    return (
        <div className="App">
            <div className='flexColumn'>
                <WalletPanel/>
                <div className='headingText' style={{height: '60px'}}>SOLSPLIT</div>
                { wallet.key ?
                    (   props.panel === 'main' ? <PanelMain/> :
                        props.panel === 'help' ? <PanelHelp/> :
                        <div>huh?</div>)
                    :
                    <div style={{height: '300px', width: '300px'}}>
                        <img alt='nokia' src='/solsplit.png' height='200px' style={{padding: '15px'}}/>
                        <div>Secure and easy royalty sharing for Solana :)</div>
                    </div>
                }
                <CreditPanel/>
            </div>
        </div>
    );
}
