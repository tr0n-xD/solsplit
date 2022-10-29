import React, { useState } from "react";
import { WalletContext } from "./App";
import { Message } from "./Types";
import MessageLine from "./MessageLine";
import MessageDetails from "./MessageDetails";
import { Link } from "react-router-dom";
import MessageClaim from "./MessageClaim";
import MessageOpen from "./MessageOpen";

export default function PanelMessages() {
    const wallet = React.useContext(WalletContext);
    const messages = wallet.player.messages;

    const [selectedMessage, setSelectedMessage] = useState<Message | undefined>(undefined);

    const selectMessage = (id: number | undefined) => {
        setSelectedMessage(messages && messages.find(x => x.id === id));
    }

    const openMessage = () => {
        if (!selectedMessage) return;
        console.log('message was opened...');
        setSelectedMessage({...selectedMessage, opened_at: new Date()});
        let msg = wallet.player.messages?.find(x => x.id === selectedMessage.id);
        if (msg) { msg.opened_at = new Date(); }
    }

    const claimMessage = () => {
        if (!selectedMessage) return;
        console.log('reward was claimed...');
        setSelectedMessage({...selectedMessage, rewarded_at: new Date()});
        let msg = wallet.player.messages?.find(x => x.id === selectedMessage.id);
        if (msg) { msg.rewarded_at = new Date(); }
    }

    return (
        messages === undefined ? <div style={{height: '300px'}}><div style={{textAlign: 'center'}}>loading...</div></div> :
            selectedMessage === undefined ?
                (
                    <div style={{height: '300px'}}>
                        <div style={{height: '50px'}}>
                            <b>You have:</b> {messages.length} messages
                        </div>
                        <div style={{height: '200px'}}>
                            { messages.slice(0,4).map(message =>
                                <MessageLine key={message.id} message={message} selectMessage={selectMessage}/>
                            )}
                        </div>
                        <div style={{height: '50px', marginTop: '10px'}}>
                            <Link to='/'><button className='clickButton'>BACK</button></Link>
                        </div>
                    </div>
                )
            : (!selectedMessage.opened_at) ?
                    (
                        <div style={{height: '300px', width: '300px'}}>
                            <MessageOpen message={selectedMessage} selectMessage={selectMessage} successFn={openMessage}/>
                        </div>
                    )
            : (selectedMessage.reward && !selectedMessage.rewarded_at) ?
                    (
                        <div style={{height: '300px', width: '300px'}}>
                            <MessageClaim message={selectedMessage} selectMessage={selectMessage} successFn={claimMessage}/>
                        </div>
                    )
            :
                (
                    <div style={{height: '300px'}}>
                        <MessageDetails message={selectedMessage} selectMessage={selectMessage}/>
                    </div>
                )
    )
}
