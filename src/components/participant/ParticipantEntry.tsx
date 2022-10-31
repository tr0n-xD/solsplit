import { Participant } from "../../data/Types";
import React from "react";

export default function ParticipantEntry(props: { participant: Participant }) {
    let id = props.participant.id;
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
                    <td><input className='textInput' maxLength={25} value={props.participant.name}/></td>
                </tr>
                <tr>
                    <td>Wallet:</td>
                    <td><input className='textInput' maxLength={25} value={props.participant.walletKey}
                        // onChange={(event) => props.participant.walletKey = (event.target.value)}
                    /></td>
                </tr>
                <tr>
                    <td>Share:</td>
                    <td><input className='textInput' maxLength={4} value={props.participant.share}/></td>
                </tr>
            </table>
        </div>
    );
}