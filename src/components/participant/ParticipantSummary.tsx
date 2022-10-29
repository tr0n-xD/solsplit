import { Participant } from "../../data/Types";
import React from "react";
import { chopIt } from "../../data/Utils";

export default function ParticipantSummary(props: { participant: Participant }) {
    let id = props.participant.id;
    return (
        <div className='flexColumn gap5'>
            <div style={{fontWeight: 'bold'}}>{chopIt(props.participant.name,8)}</div>
            <img alt='' height='75px' title={`${props.participant.name} will receive royalty share: ${props.participant.share}`} src={'plr' + id + '-150.png'}/>
            <div className='flexRow gap5'>
                <img alt='' title={'Royalty share: ' + props.participant.share} height='24px' src='heart-32.png'/>
                <div style={{fontWeight: 'bold'}}>{props.participant.share}</div>
            </div>

        </div>
    );
}