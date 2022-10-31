import * as React from "react";
import { WalletContext } from "../App";
import { Link } from "react-router-dom";

export default function WalletPanel() {
    let wallet = React.useContext(WalletContext);

    const signOut = () => {
        wallet.disconnect();
    }

    return (
        <div className='flexRow'>
            <Link to='/'><button className='blueButton'>HOME</button></Link>

            {wallet.key ?
                <div className='flexRow' style={{width: '225px', height: '30px', marginTop: '0px', backgroundColor: '#0052a1', borderRadius: '10px'}}>
                    <img alt='' style={{marginTop: '0px', height: '20px', width:'20px'}} src='/phantom-32.png'/>
                    <div style={{fontSize: '15px'}}>{ wallet.key.slice(0,4) + '....' + wallet.key.slice(-4) }</div>
                    <div title='sign out'><svg style={{marginTop: '0px', color: 'white'}} stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" color="#fff" height="24" width="24" xmlns="http://www.w3.org/2000/svg" onClick={signOut}><polyline points="7 11 15 19 11 15 7 19 15 11"></polyline></svg></div>
                </div>
                :
                <button className='blueButton flexRow' title='Connect your Phantom wallet' onClick={wallet.connect} style={{width: '225px'}}>
                    <img alt='' style={{marginTop: '0px', height: '20px', width:'20px'}} src='/phantom-32.png'/>
                    CONNECT WALLET
                </button>
            }
        </div>
    )
}