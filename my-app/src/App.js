import React, {useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Header } from './components/Header'
import { Users } from './components/Users'
import { DisplayBoard } from './components/DisplayBoard'
import { Login }from './components/CreateUser'
import {
    getAllPlayers,
    login,
    finishTurn,
    rollDice,
    turnInfo,
    canFail,
    getCurrentPlayer,
    getIfMyTurn
} from './services/UserService'

function App() {
    const [isLogged, setIsLogged] = React.useState(false)
    const [user, setUser] = React.useState({})
    const [users, setUsers] = React.useState([])
    const [currentPlayer, setCurrentPlayer] = React.useState({})
    const [myTurn, setMyTurn] = React.useState(false)
    const [diceNumber, setDiceNumber] = React.useState(0)
    const [rolled, setRolled] = React.useState(false)

    async function log(){
        await login(user);
        const oldUsrs = users;
        oldUsrs.push(user);
        setUsers(oldUsrs);
        setIsLogged(true);
        //setMyTurn(true)
    }

    async function getTurnInfo(){
        turnInfo().then(info => {
            throw new Error(`Нет необходимого поля `);
            console.log(info.cur_player)
            if (users.length > 0){
            setCurrentPlayer(users[info.cur_player]);
            setMyTurn(info.my_turn)
            }
        });
        //
        // const mt = await getIfMyTurn();
        // setMyTurn(mt);
        // setCurrentPlayer(users[cur]);

    //    if( myTurn ) {setRolled(false)}
    }

    async function rollTheDice(){
        const result = await rollDice()
        setDiceNumber(result)
        setRolled(true)
    }

    async function finishTurn_(){
        const cur = await finishTurn()
        setMyTurn(false)
        setCurrentPlayer(users[cur])
    }

    function createUser(e){
        setUser({login: e})
    }


    useEffect(() => {
        async function refr() {
            await getTurnInfo();
        }
        // Execute the created function directly
        refr();
    },[isLogged, users])


    return(
        <div className="App">
            <Header></Header>
            <div className="container mrgnbtm">
                <div className="row">
                    <div className="col-md-8">
                        {!isLogged ? (
                            <Login
                                onChangeForm={createUser}
                                createUser={log}
                            >
                            </Login>
                        ): ( currentPlayer ? (<div> {currentPlayer.login} </div>): (<div> noone </div>)
                        )}
                        <button type="button" onClick= { async (e) => await getTurnInfo()} className="btn btn-danger">Refresh</button>
                    </div>
                    <div className="col-md-4">
                        <div className="display-board">
                            <h4>Turn</h4>
                            <div className="">
                                {currentPlayer ? (<div> {currentPlayer.login} </div>) : (<></>)}
                            </div>
                            <div className="number">
                                {myTurn === false ? (1) : (0)}
                            </div>
                            {myTurn === true ? (
                                <div className="btn">
                                    { !rolled ? (
                                        <button type="button" onClick={async (e) => { await rollTheDice(); setRolled(true)}} className="btn btn-warning">Roll the dice</button>
                                    ): (<></>)}
                                    <button type="button" onClick={(e) => finishTurn_()} className="btn btn-warning">Finish Turn</button>
                                </div>
                            ) : (<></>)}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default App;
