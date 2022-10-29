import React from "react";
import { Link } from "react-router-dom";

export default function PanelMain() {

    return (
        <div className='flexColumn justifyStart' style={{height: '300px'}}>
            <div className='flexRow gap5' style={{marginTop: '20px'}}>
                <div>Welcome to Solsplit</div><img alt='' height='24px' src='heart-32.png' style={{marginTop: '2px'}}/>
            </div>
            <div>Set up royalty sharing with your friends and colleagues</div>
            <div>It's safe, secure and easy!</div>

            <div style={{marginTop: '20px'}}>This project is an entry to the MagicEden hackathon</div>
            <div>We hope you like it :)</div>

            <Link to='/create' style={{marginTop: '20px'}}><button className='blueButton'>CREATE SOLSPLIT</button></Link>
        </div>
    )
}
