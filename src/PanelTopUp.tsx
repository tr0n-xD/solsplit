import React, { useEffect, useState } from "react";
import { WalletContext } from "./App";
import { Link } from "react-router-dom";
import { getRSTK } from "./Tokens";

export default function PanelTopUp() {
    const wallet = React.useContext(WalletContext);
    const [rstk, setRstk] = useState<number|undefined>(undefined);

    const loadRstk = async () => {
        console.log('Loading rstk...');
        setRstk(await getRSTK(wallet.key));
    }

    useEffect(() => {
        loadRstk();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        wallet.player.messages === undefined ? <div style={{height: '300px'}}><div style={{textAlign: 'center'}}>loading...</div></div> :
            <div style={{height: '300px'}}>
                <div style={{height: '50px'}}>
                    <b>Top Up Credit</b>
                </div>
                <div className='flexColumn' style={{width: '350px'}}>
                    <div>You need RESTACK coins to send an NFT SMS.</div>

                    <div className='flexRow'>
                        <div>Your balance: {!rstk ? 'loading...' : rstk + ' RESTACK'}</div>
                        <img alt='' height='32px' src='restackcoin-32.png' style={{marginTop: '2px'}}/>
                    </div>

                    <div style={{marginTop: '10px'}}>
                        <a target='restackcoin' href='https://restackcoin.com'><button className='blueButton'>Buy Restack Coins</button></a>
                    </div>

                    <Link to='/'>
                        <button className='clickButton' style={{marginTop: '15px'}}>OKAY</button>
                    </Link>
                </div>
            </div>
    )
}
