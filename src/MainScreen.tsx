import React from 'react';
import './App.css';
import WalletPanel from "./panels/WalletPanel";
import SolsplitMain from "./views/SolsplitMain";
import SolsplitCreate from "./views/SolsplitCreate";
import { KeyContext } from "./App";

export default function MainScreen(props: {view: string, connect: any, disconnect: any}) {
    const walletKey = React.useContext(KeyContext);
    return (
        <div className="App">
            <div className='flexColumn' style={{padding: '20px'}}>
                <WalletPanel connect={props.connect} disconnect={props.disconnect}/>
                <div className='headingText' style={{height: '60px'}}>SOLSPLIT</div>
                { walletKey ?
                    (   props.view === 'main' ? <SolsplitMain/> :
                        props.view === 'create' ? <SolsplitCreate/> :
                        <div>huh?</div>)
                    :
                    <div style={{height: '300px', width: '300px'}}>
                        <img alt='nokia' src='/solsplit.png' height='200px' style={{padding: '15px'}}/>
                        <div>Secure and easy royalty sharing for Solana :)</div>
                    </div>
                }
            </div>
        </div>
    );
}
