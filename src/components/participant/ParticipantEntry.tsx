import { Participant } from "../../data/Types";
import React, { useState } from "react";

export default function ParticipantEntry(props: { participant: Participant }) {
    let MIN_SHARE = 1, MAX_SHARE = 9999;
    let [name, setName] = useState(props.participant.name);
    let [walletKey, setWalletKey] = useState(props.participant.walletKey);
    let [share, setShare] = useState(''+props.participant.share);
    let id = props.participant.id;

    function changeShare(value: string) {
        const regex = /^[0-9\b]+$/;
        if (value === '' || regex.test(value)) {
            setShare(value);
        }
        let x = +value;
        if (x > MIN_SHARE && x <= MAX_SHARE) {
            props.participant.share = x;
        }
    }

    return (
        <div className='greenPanel'>
            <table>
                <tr>
                    <td colSpan={2}>
                        <div className='flexRow' style={{marginBottom: '10px'}}>
                            <img alt='' height='50px' width='50px' title={'Participant ' + id} src={'plr' + id + '-50.png'}
                                 style={{paddingTop: '5px'}}/>
                            <div style={{fontWeight: 'bold'}}>Participant {id}</div>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td>Name:</td>
                    <td><input className='textInput' maxLength={25} value={name}
                               onChange={(e) => {setName(e.target.value); props.participant.name = e.target.value}}/>
                    </td>
                </tr>
                <tr>
                    <td>Wallet:</td>
                    <td><input className='textInput' maxLength={25} value={walletKey}
                               onChange={(e) => {setWalletKey(e.target.value); props.participant.walletKey = e.target.value}}/>
                    </td>
                </tr>
                <tr>
                    <td>Share:</td>
                    <td><input className='textInput' maxLength={4} value={share} pattern="[0-9]*"
                               onChange={(e) => {changeShare(e.target.value)}}/>
                    </td>
                </tr>
            </table>
        </div>
    );
}