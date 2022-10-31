import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Participant } from "../data/Types";
import ParticipantEntry from "../components/participant/ParticipantEntry";
import ParticipantSummary from "../components/participant/ParticipantSummary";
import ParticipantIcons from "../components/participant/ParticipantIcons";
import { ValidateParticipant } from "../data/Validator";

export default function SolsplitCreate() {
    const [page, setPage] = useState(0);
    const [teamSize, setTeamSize] = useState(2);
    const [errors, setErrors] = useState<string[]>([]);
    const [sending, setSending] = useState<boolean | undefined>(undefined);
    const [success, setSuccess] = useState<boolean | undefined>(undefined);
    const [solsplit, setSolsplit] = useState<string | undefined>(undefined);
    const [participants, setParticipants] = useState<Participant[]>([])

    function changeTeamSize(value: string) {
        let x = +value;
        if (x >= 2 && x <= 5) {
            setTeamSize(x);
        }
    }

    function createTeam() {
        if (participants.length !== teamSize) {
            setParticipants(Array.from(new Array(teamSize), (val, index) => ({id: index + 1, name: '', walletKey: '', share: 100,})));
        }
        setPage(page + 1);
    }

    function createSolsplit() {
        setSending(true);
        // call the backend
        setSuccess(undefined);
        setSolsplit(undefined);
        // setSuccess(true);
        // setSolsplit('SPLT6Trvf2Xe5LqkCnfCuHoUEECzF7yRRmZ6aLubm7D');
    }

    function validateParticipants() {
        let allErrors : string[] = [];
        participants.forEach(x => allErrors = allErrors.concat(ValidateParticipant(x)));
        setErrors(allErrors);
        if (!allErrors.length) {
            setPage(page + 1);
        }
    }

    return (
        <div style={{minHeight: '300px', width: '450px'}}>
            {page === 0 &&
                <div className='flexColumn justifyStart'>
                    <div style={{marginTop: '20px', fontWeight: 'bold'}}>Let's get started!</div>

                    <div>How many participants will share royalties?</div>

                    <div className='flexRow'>
                        <button className='blueButton' onClick={() => changeTeamSize(String(teamSize-1))}>-</button>
                        <input className='textInput' maxLength={2} value={teamSize} style={{width: '50px'}} onChange={(e) => changeTeamSize(e.target.value)}/>
                        <button className='blueButton' onClick={() => changeTeamSize(String(teamSize+1))}>+</button>
                    </div>

                    <ParticipantIcons teamSize={teamSize} />

                    <div>Wow, what an awesome team :)</div>

                    <div className='flexRow' style={{marginTop: '10px'}}>
                        <Link to='/'><button className='blueButton'>BACK</button></Link>
                        <button className='blueButton' onClick={() => createTeam()}>CREATE A TEAM</button>
                    </div>
                </div>
            }

            {page === 1 &&
                <div className='flexColumn justifyStart'>
                    <div style={{marginTop: '20px', fontWeight: 'bold'}}>Tell us about the team:</div>

                    <div className='flexColumn'>
                        {participants.map(x => <ParticipantEntry key={x.id} participant={x}/>)}
                    </div>

                    <div>
                        {errors?.map((x,i) => <div key={i} style={{color: 'red'}}>{x}</div>)}
                    </div>

                    <div className='flexRow' style={{marginTop: '10px'}}>
                        <button className='blueButton' onClick={() => setPage(page-1)}>BACK</button>
                        <button className='blueButton' onClick={() => validateParticipants()}>NEXT</button>
                    </div>
                </div>
            }

            {page === 2 &&
                <div className='flexColumn justifyStart'>
                    <div style={{marginTop: '20px', fontWeight: 'bold'}}>Please verify this is correct:</div>

                    <div>Your team has {teamSize} awesome people:</div>

                    <div className='flexRow' style={{gap: '20px'}}>
                        {participants.map(x => <ParticipantSummary key={x.id} participant={x}/>)}
                    </div>

                    <div>If the royalty shares are correct, let's go ahead and create the solsplit for your team.</div>

                    <div className='flexRow' style={{marginTop: '10px'}}>
                        <button className='blueButton' onClick={() => setPage(page-1)}>BACK</button>
                        <button className='blueButton' onClick={() => setPage(page+1)}>READY - LET'S DO THIS</button>
                    </div>
                </div>
            }

            {page === 3 &&
                <div className='flexColumn justifyStart'>
                    <div style={{marginTop: '20px', fontWeight: 'bold'}}>Create your solsplit:</div>

                    <div>Click the button below to create your solsplit.</div>

                    <img alt='' height='50px' src='solsplit.png'/>

                    <ParticipantIcons teamSize={teamSize}/>

                    <div className='flexColumn justifyStart' style={{height: '70px', marginTop: '5px'}}>
                        {
                            success && solsplit ?
                                <div className='flexColumn'>
                                    <div>Done! Your solsplit wallet is:</div>
                                    <div className='flexRow gap5'>
                                        <div style={{width: '18px'}}/>
                                        <input className='textInput' maxLength={25} value={solsplit} style={{width: '200px'}}/>
                                        <img alt='' title='Copy to clipboard' src='icon-copy.svg' onClick={() => navigator.clipboard.writeText(solsplit)}/>
                                    </div>
                                </div>
                                :
                            sending ? <div>sending...</div> :
                            <button className='blueButton' style={{marginTop: '10px'}} onClick={createSolsplit}>CREATE SOLSPLIT</button>
                        }
                    </div>

                    <div className='flexRow' style={{marginTop: '10px'}}>
                        <button className='blueButton' onClick={() => setPage(page-1)}>BACK</button>
                    </div>
                </div>
            }
        </div>
    )
}
