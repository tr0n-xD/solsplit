import React, { useState } from "react";
import { WalletContext } from "./App";
import { Link } from "react-router-dom";
import { fee_restack } from "./Config";

export default function PanelHelp() {
    const wallet = React.useContext(WalletContext);

    const [page, setPage] = useState(0);

    const nextPage = async () => {
        setPage((page + 1) % 10);
    }

    return (
        wallet.player.messages === undefined ? <div style={{height: '300px'}}><div style={{textAlign: 'center'}}>loading...</div></div> :
            <div style={{height: '300px'}}>
                <div style={{height: '50px'}}>
                    <b>How it works</b>
                </div>
                {page === 0 &&
                    <div className='flexColumn' style={{width: '350px'}}>
                        <div>You can send an NFT SMS to any wallet address on the solana blockchain</div>
                        <div className='flexRow'>
                            <img alt='' height='50px' src='/solcoin-100.png'/>
                            <img alt='' height='50px' src='/nftsms-50.png'/>
                        </div>
                        <button className='clickButton' onClick={nextPage} style={{marginTop: '15px'}}>NEXT</button>
                    </div>
                }
                {page === 1 &&
                    <div className='flexColumn' style={{width: '350px'}}>
                        <div>It costs {fee_restack} RESTACK coins to send an NFT SMS</div>
                        <img alt='' height='50px' src='/restackcoin-100.png'/>
                        <button className='clickButton' onClick={nextPage} style={{marginTop: '15px'}}>NEXT</button>
                    </div>
                }
                {page === 2 &&
                    <div className='flexColumn' style={{width: '350px'}}>
                        <div>The recipient will receive an NFTSMS token in their Solana wallet.</div>
                        <img alt='' height='50px' src='/nftsms-50.png'/>
                        <div>They can read their message here on nftsms.io</div>
                        <button className='clickButton' onClick={nextPage} style={{marginTop: '15px'}}>NEXT</button>
                    </div>
                }
                {page === 3 &&
                    <div className='flexColumn' style={{width: '350px'}}>
                        <div>Please don't send bad messages :(</div>
                        <img alt='' height='50px' src='/unhappy-50.png'/>
                        <div>Messages are scanned for malicious links and content.</div>
                        <button className='clickButton' onClick={nextPage} style={{marginTop: '15px'}}>NEXT</button>
                    </div>
                }
                {page === 4 &&
                    <div className='flexColumn' style={{width: '350px'}}>
                        <div>You can also add a reward to your message!</div>
                        <img alt='' height='100px' src='/reward.png'/>
                        <button className='clickButton' onClick={nextPage} style={{marginTop: '15px'}}>NEXT</button>
                    </div>
                }
                {page === 5 &&
                    <div className='flexColumn' style={{width: '350px'}}>
                        <div>The recipient receives a reward in SOL for reading your message</div>
                        <img alt='' height='50px' src='/solcoin-100.png'/>
                        <div>And the sender gets a read receipt :)</div>
                        <Link to='/'>
                            <button className='clickButton' style={{marginTop: '15px'}}>OKAY</button>
                        </Link>
                    </div>
                }
            </div>
    )
}
