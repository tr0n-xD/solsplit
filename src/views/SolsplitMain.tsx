import React from "react";
import { Link } from "react-router-dom";

export default function SolsplitMain() {

    return (
        <div className='flexColumn justifyStart' style={{minHeight: '300px', width: '450px'}}>
            <div className='flexRow gap5' style={{marginTop: '20px'}}>
                <div>Welcome to Solsplit</div><img alt='' height='24px' src='heart-32.png' style={{marginTop: '2px'}}/>
            </div>
            <div>Set up royalty sharing for your team.</div>
            <div>It's safe, secure and easy!</div>

            <div style={{marginTop: '20px'}}>This project was made for the MagicEden hackathon by tr0n-xD.</div>

            <Link to='/create' style={{marginTop: '20px'}}><button className='blueButton'>CREATE A SOLSPLIT</button></Link>
        </div>
    )
}
