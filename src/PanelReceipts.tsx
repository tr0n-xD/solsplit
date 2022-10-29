import React from "react";
import { Link } from "react-router-dom";

export default function PanelReceipts() {
    // const wallet = React.useContext(WalletContext);

    return (
        <div style={{height: '300px', width: '300px'}}>
            <div style={{height: '50px'}}>
                <b>Your read receipts</b>
            </div>
            <div>
                Read receipts for your messages will appear here.
            </div>
            <div style={{height: '50px', marginTop: '25px'}}>
                <Link to='/'><button className='clickButton'>BACK</button></Link>
            </div>
        </div>
    )
}
