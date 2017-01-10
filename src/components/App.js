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
        this.playerMoveHandler = this.playerMoveHandler.bind(this)
        this.state = {
            difficulty: 'medium',
            board: ['_','_','_','_','_','_','_','_','_'],
            cpu: 'o',
            player: 'x'
        }
    }


    // Player moves and AI respons with board state updated
    computerMoveHandler() {
        return ttt(this.state.difficulty, this.state.board, this.state.cpu)
    }
    playerMoveHandler(e) {
        const board = {...this.state.board}
        board[e.target.id - 1] = this.state.player
        this.setState({ board: board }, function() {
            board[this.computerMoveHandler() - 1] = this.state.cpu
            this.setState({ board: board })
        })
    }

    render() {
        return (
        <div className="tic-tac-toe">
            <h1 className="title">Tic-Tac-Toe</h1>
            <DifficultyMenu />
            <TTTboard
                onPlayerMove={this.playerMoveHandler}
                theBoard={this.state.board}
            />
            <Scoreboard />
            <Start />
        </div>
        )
    }
}

export default App
