import React from "react";
import { WalletContext } from "./App";
import { Link } from "react-router-dom";

export default function PanelCreate() {

    return (
        <div className='flexColumn justifyStart' style={{height: '300px'}}>
            <div style={{marginTop: '20px', fontWeight: 'bold'}}>Create your Solsplit:</div>

            <div>Who are the partipicants and their royalty shares?</div>

            <div>
                <table>
                    <tr>
                        <td><img alt='' height='32px' title='Participant 1' src='plr1-50.png' style={{paddingTop: '5px'}}/></td>
                        <td>Wallet 1:</td>
                        <td><input></input></td>
                        <td>Share:</td>
                        <td><input></input></td>
                    </tr>
                </table>
            </div>

            <Link to='/' style={{marginTop: '20px'}}><button className='blueButton'>READY - LET'S DO THIS</button></Link>

            <Link to='/' style={{marginTop: '50px'}}><button className='blueButton'>HOME</button></Link>
        </div>
    )
}
