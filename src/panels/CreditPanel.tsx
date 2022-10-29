export default function CreditPanel() {
    return (
        <div style={{paddingTop: '0px', display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
            <div>
                powered by <a href="https://restack.ai" target="restack">Restack.AI</a>
            </div>
            <div style={{paddingTop: '5px'}}>
                <img alt="restack" src="box.png" style={{width: '25px', paddingLeft: '5px'}}/>
            </div>
        </div>
    )
}
