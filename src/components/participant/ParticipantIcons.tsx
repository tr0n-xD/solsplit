import React from "react";

export default function ParticipantIcons(props: { teamSize: number }) {
    return (
        <div className='flexRow'>
            {Array.from(Array(props.teamSize).keys()).map(i => <img alt='' src={'plr'+(i+1)+'-50.png'}/>)}
        </div>
    )
}