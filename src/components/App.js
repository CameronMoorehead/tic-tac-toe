import React from 'react'

import DifficultyMenu from './DifficultyMenu'
import TTTboard from './TTTboard'
import Scoreboard from './Scoreboard'
import Start from './Start'

import { ttt } from '../utils/ttt'

class App extends React.Component {
    constructor() {
        super()
        this.computerMoveHandler = this.computerMoveHandler.bind(this)
        this.state = {
            difficulty: 'easy',
            board: ['_','_','_','_','_','_','_','_','_'],
            cpuPlayer: 'o'
        }
    }

    computerMoveHandler() {
        return ttt(this.state.board, this.state.cpuPlayer)
    }

    render() {
        return (
        <div className="tic-tac-toe">
            <h1 className="title">Tic-Tac-Toe</h1>
            <DifficultyMenu />
            <TTTboard
                onComputerMove={this.computerMoveHandler}
            />
            <Scoreboard />
            <Start />
        </div>
        )
    }
}

export default App
