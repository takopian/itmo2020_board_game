import React from 'react'

export function DisplayBoard ({currentPlayer, rollTheDice, finishTurn, rollNumber, myTurn}) {
    const [rolled, setRolled] = React.useState(false)
    return(
        <div className="display-board">
            <h4>Turn</h4>
            <div className="">
            {currentPlayer ? (<div> {currentPlayer.login} </div>) : (<></>)}
            </div>
            <div className="number">
                {rollNumber}
            </div>
            {myTurn ? (
                <div className="btn">
                    { !rolled ? (
                        <button type="button" onClick={(e) => {rollTheDice(); setRolled(true)}} className="btn btn-warning">Roll the dice</button>
                    ): (<></>)}
                    <button type="button" onClick={(e) => finishTurn()} className="btn btn-warning">Finish Turn</button>
                </div>
            ) : (<></>)}
        </div>
    )
}