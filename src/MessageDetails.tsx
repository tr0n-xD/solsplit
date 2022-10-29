import React from "react";
import { Message } from "./Types";

export default function MessageDetails(props: {message: Message, selectMessage: any}) {

    return (
        <div style={{height: '50px'}}>
            <div className='flexColumn'>
                <div style={{color: 'lawngreen'}}>Message from: { props.message.fromAlias }</div>
                <div className='messageText' style={{width: '300px', padding: '20px', backgroundColor: 'grey', borderRadius: '20px'}}>
                    { props.message.text }
                </div>
                { props.message.rewardSignature &&
                    <div className='flexRow gap5'>
                        <div>You received</div>
                        <img alt='' height='24px' src='reward-32.png'/>
                        <div>{ props.message.reward } SOL</div>
                        <a target='solscan' href={'https://solscan.io/tx/' + props.message.rewardSignature}>
                            <img alt='' height='20px' src='solscan.png' style={{marginTop: '6px'}}/>
                        </a>
                    </div>
                }
                <div>
                    <button className='clickButton' onClick={() => props.selectMessage(undefined)}>OKAY</button>
                </div>
            </div>
        </div>
    )
}
