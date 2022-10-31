import React from 'react';
import './App.css';
import WalletPanel from "./panels/WalletPanel";
import SolsplitMain from "./views/SolsplitMain";
import { WalletContext } from "./App";
import SolsplitCreate from "./views/SolsplitCreate";

export default function MainScreen(props: {view: string}) {
    const wallet = React.useContext(WalletContext);
    return (
        <div className="App">
            <div className='flexColumn' style={{padding: '20px'}}>
                <WalletPanel/>
                <div className='headingText' style={{height: '60px'}}>SOLSPLIT</div>
                { wallet.key ?
                    (   props.view === 'main' ? <SolsplitMain/> :
                        props.view === 'create' ? <SolsplitCreate/> :
                        <div>huh?</div>)
                    :
                    <div style={{height: '300px', width: '300px'}}>
                        <img alt='nokia' src='/solsplit.png' height='200px' style={{padding: '15px'}}/>
                        <div>Secure and easy royalty sharing for Solana :)</div>
                    </div>
                }
                {/*<CreditPanel/>*/}
            </div>
        </div>
    );
}
