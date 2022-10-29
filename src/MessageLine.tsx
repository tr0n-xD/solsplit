import React from "react";
import { Message } from "./Types";

export default function MessageLine(props: {message: Message, selectMessage: any}) {

    function maxChars(max: number, value: string) {
        return value.length > max ? value.slice(0, max) + '...' : value;
    }

    return (
        <div style={{height: '42px', width: '300px',  margin: '2px', gap: '5px'}}>
            <div className='flexRow' style={{border: 'solid 1px grey', borderRadius: '5px'}}>
                <div style={{margin: '5px', width: '200px', textAlign: 'left', color: 'lawngreen'}}>
                    SMS from: { maxChars(10, props.message.fromAlias) }
                </div>
                <div>
                    <button className='clickButton' onClick={() => props.selectMessage(props.message.id)}>
                        { props.message.opened_at ? 'READ' : 'OPEN' }
                    </button>
                </div>
            </div>
        </div>
    )
}
