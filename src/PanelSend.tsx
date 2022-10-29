import React, { useState } from "react";
import { WalletContext } from "./App";
import { Link } from "react-router-dom";
import { sendRSTKandSOL } from "./Tokens";
import { PublicKey } from "@solana/web3.js";
import { fee_restack, commission_percent, fn_url } from "./Config";

export default function PanelSend() {
    const wallet = React.useContext(WalletContext);
    const [page, setPage] = useState(0);
    const [error, setError] = useState<string | undefined>(undefined);
    const [toWallet, setToWallet] = useState('');
    const [fromAlias, setFromAlias] = useState('');
    const [text, setText] = useState('');
    const [reward, setReward] = React.useState('0');
    const [confirm, setConfirm] = useState(false);

    const prevPage = async () => { setPage(page - 1); setError(undefined); }
    const nextPage = async () => { setPage(page + 1); }
    const checkWalletAddress = async () => {
        if (wallet.key === toWallet) {
            setError('Cant send SMS to same wallet.');
            return;
        }
        try {
            let pubkey = new PublicKey(toWallet);
            if (PublicKey.isOnCurve(pubkey)) {
                setError(undefined);
                nextPage();
                return;
            }
        } catch (e) {
        }
        setError('Invalid wallet address.');
    }

    const checkName = async () => {
        if (fromAlias.length >= 3) {
            setError(undefined);
            nextPage();
        } else {
            setError('Name is too short.');
        }
    }

    const checkMessage = async () => {
        if (text.length >= 5) {
            setError(undefined);
            nextPage();
        } else {
            setError('Message too short.');
        }
    }

    const payAndSend = async () => {
        if (!wallet.provider || !wallet.key) return;
        console.log('paying for message...');
        let signature = await sendRSTKandSOL(wallet.provider, wallet.key, fee_restack, +reward * (100 + commission_percent) / 100);
        if (!signature) {
            setError('transaction failed.');
            return;
        }
        console.log('signature was ' + signature);

        await fetch(fn_url + "messagesend", {
            method: 'POST',
            headers: {'Accept': 'application/json', 'Content-Type': 'text/plain'},
            body: JSON.stringify({
                fromWallet: wallet.key,
                fromAlias: fromAlias,
                toWallet: toWallet,
                text: text,
                currency: 'RSTK',
                fee: 10,
                reward: reward,
                signature: signature,
            })
        });

        nextPage();
    }

    return (
        wallet.player.messages === undefined ? <div style={{height: '300px'}}><div style={{textAlign: 'center'}}>loading...</div></div> :
            <div style={{height: '300px', width: '300px'}}>
                <div style={{height: '50px'}}>
                    <b>Send an NFT SMS</b>
                </div>
                {page === 0 &&
                    <div className='flexColumn'>
                        <div><b>To wallet address:</b></div>
                        <div><input className='textInput' maxLength={50} value={toWallet} onChange={(event) => setToWallet(event.target.value)}/></div>
                        {error && <div style={{color: 'red'}}>{error}</div>}
                        <div className='flexRow' style={{marginTop: '10px'}}>
                            <Link to='/'><button className='clickButton'>BACK</button></Link>
                            <button className='clickButton' onClick={checkWalletAddress}>NEXT</button>
                        </div>
                    </div>
                }
                {page === 1 &&
                    <div className='flexColumn'>
                        <div><b>Your name:</b></div>
                        <div><input className='textInput' maxLength={25} value={fromAlias} onChange={(event) => setFromAlias(event.target.value)}/></div>
                        {error && <div style={{color: 'red'}}>{error}</div>}
                        <div className='flexRow' style={{marginTop: '10px'}}>
                            <button className='clickButton' onClick={prevPage}>BACK</button>
                            <button className='clickButton' onClick={checkName}>NEXT</button>
                        </div>
                    </div>
                }
                {page === 2 &&
                    <div className='flexColumn'>
                        <div><b>Your message:</b></div>
                        <div><textarea className='textInput' maxLength={160} rows={4} value={text} onChange={(event) => setText(event.target.value)}/></div>
                        {error && <div style={{color: 'red'}}>{error}</div>}
                        <div className='flexRow' style={{marginTop: '10px'}}>
                            <button className='clickButton' onClick={prevPage}>BACK</button>
                            <button className='clickButton' onClick={checkMessage}>NEXT</button>
                        </div>
                    </div>
                }
                {page === 3 &&
                    <div className='flexColumn'>
                        <div><b>Your reward:</b></div>
                        <div className='flexColumn'>
                            <select className='selectInput' value={reward} onChange={(event) => setReward(event.target.value)}
                                style={{marginBottom: '10px'}}>
                                <option value={0}>no reward</option>
                                <option value={0.1}>tiny reward</option>
                                <option value={1}>rare reward</option>
                                <option value={5}>epic reward</option>
                                <option value={10}>legendary reward</option>
                            </select>
                            {+reward > 0 ?
                                <div className='flexColumn'>
                                    <div className='flexRow'>
                                        <div>Reward: {reward} SOL</div><img alt='' height='24px' src='solcoin-100.png' style={{marginTop: '2px'}}/>
                                    </div>
                                    <div className='flexRow gap5'>
                                        {+reward >= 1 && <img alt='' src='reward-32.png'/>}
                                        {+reward >= 5 && <img alt='' src='reward-32.png'/>}
                                        {+reward >= 10 && <img alt='' src='reward-32.png'/>}
                                    </div>
                                    <div>(plus our commission {commission_percent}%)</div>
                                </div>
                            :
                                <div>
                                    You can add a reward for the recipient to read the message.
                                </div>
                            }
                        </div>
                        {error && <div style={{color: 'red'}}>{error}</div>}
                        <div className='flexRow' style={{marginTop: '10px'}}>
                            <button className='clickButton' onClick={prevPage}>BACK</button>
                            <button className='clickButton' onClick={checkMessage}>NEXT</button>
                        </div>
                    </div>
                }
                {page === 4 &&
                    <div className='flexColumn'>
                        <div><b>Please confirm:</b></div>
                        <div><input type="checkbox" style={{marginRight: '10px'}} defaultChecked={confirm} onChange={(event) => setConfirm(!confirm)}/>
                            I confirm the message does not contain offensive content or malicious links.
                        </div>
                        <div className='flexRow' style={{marginTop: '10px'}}>
                            <button className='clickButton' onClick={prevPage}>BACK</button>
                            {confirm && <button className='clickButton' onClick={nextPage}>NEXT</button> }
                        </div>
                    </div>
                }
                {page === 5 &&
                    <div className='flexColumn'>
                        <div><b>Pay and send:</b></div>
                        <div className='flexRow'>
                            <div>SMS fee: 10 RESTACK</div>
                            <img alt='' height='24px' src='/restackcoin-32.png' style={{marginTop: '2px'}}/>
                        </div>
                        {+reward > 0 &&
                            <div className='flexRow'>
                                <div>Reward fee: {+reward * (100 + commission_percent) / 100} SOL</div>
                                <img alt='' height='24px' src='/solcoin-32.png' style={{marginTop: '2px'}}/>
                            </div>
                        }
                        <div className='flexRow' style={{marginTop: '10px'}}>
                            <button className='clickButton' onClick={prevPage}>BACK</button>
                            <button className='clickButton' onClick={payAndSend}>SEND</button>
                        </div>
                        {error && <div style={{color: 'red'}}>{error}</div>}
                    </div>
                }
                {page === 6 &&
                    <div className='flexColumn'>
                        <div><b>Message sent.</b></div>
                        <div>The recipient will receive your message after 2 minutes</div>
                        <img alt='' height='44px' src='/nftsms-50.png'/>
                        <div className='flexRow' style={{marginTop: '10px'}}>
                            <Link to='/'><button className='clickButton'>OKAY</button></Link>
                        </div>
                    </div>
                }
            </div>
    )
}
