import * as React from "react";
import { Link } from "react-router-dom";
import { KeyContext } from "../App";

export default function WalletPanel(props: {connect: any, disconnect: any}) {
    const walletKey = React.useContext(KeyContext);

    const signOut = () => {
        props.disconnect();
    }

    return (
        <div className='flexRow'>
            <Link to='/'><button className='blueButton'>HOME</button></Link>

            {walletKey ?
                <div className='flexRow' style={{width: '225px', height: '30px', marginTop: '0px', backgroundColor: '#0052a1', borderRadius: '10px'}}>
                    <img alt='' style={{marginTop: '0px', height: '20px', width:'20px'}} src='/phantom-32.png'/>
                    <div style={{fontSize: '15px'}}>{ walletKey.slice(0,4) + '....' + walletKey.slice(-4) }</div>
                    <div title='sign out'><svg style={{marginTop: '0px', color: 'white'}} stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" color="#fff" height="24" width="24" xmlns="http://www.w3.org/2000/svg" onClick={signOut}><polyline points="7 11 15 19 11 15 7 19 15 11"></polyline></svg></div>
                </div>
                :
                <button className='blueButton flexRow' title='Connect your Phantom wallet' onClick={props.connect} style={{width: '225px'}}>
                    <img alt='' style={{marginTop: '0px', height: '20px', width:'20px'}} src='/phantom-32.png'/>
                    CONNECT WALLET
                </button>
            }
        </div>
    )
}