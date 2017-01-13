import React from 'react'

import DifficultyMenu from './DifficultyMenu'
import TTTboard from './TTTboard'
import Scoreboard from './Scoreboard'
import Restart from './Restart'

import { ttt, findTriples } from '../utils/ttt'

class App extends React.Component {
    constructor() {
        super()
        this.difficultyHandler = this.difficultyHandler.bind(this)
        this.computerMoveHandler = this.computerMoveHandler.bind(this)
        this.playerMoveHandler = this.playerMoveHandler.bind(this)
        this.restartBoard = this.restartBoard.bind(this)
        this.checkWinner = this.checkWinner.bind(this)
        this.state = {
            difficulty: 'medium',
            board: ['_','_','_','_','_','_','_','_','_'],
            cpu: 'o',
            player: 'x',
            cpuScore: 0,
            playerScore: 0,
            gameOver: false
        }
    }

    difficultyHandler(e) {
        this.setState({ difficulty: e.target.id })
    }

    // Player moves and AI responds with board state updated
    computerMoveHandler() {
        this.checkWinner()
        if (!this.state.gameOver)
            return ttt(this.state.difficulty, this.state.board, this.state.cpu)
    }
    playerMoveHandler(e) {
        const board = {...this.state.board}
        board[e.target.id - 1] = this.state.player
        this.setState({ board: board }, function() {
            board[this.computerMoveHandler() - 1] = this.state.cpu
            this.setState({ board: board })
            this.checkWinner()
        })
    }

    restartBoard() {
        this.setState({ board: ['_','_','_','_','_','_','_','_','_'] })
    }


    checkWinner() {
        let checkForWinner = (function(player) {
            return findTriples(this.state.board).some(function(x) {
                return x.every(function(y) {
                    return y === player
                })
            })
        }).bind(this)

        if (checkForWinner(this.state.player)) {
            this.setState({
                gameOver: true,
                playerScore: (this.state.playerScore + 1)
            })
        }
        if (checkForWinner(this.state.cpu)) {
            this.setState({
                gameOver: true,
                cpuScore: (this.state.cpuScore + 1)
            })
        }
    }

    render() {
        let declareWinner;
        if (this.state.gameOver) {
            declareWinner = (
                <div>
                    <p>Winner!</p>
                </div>
            )
        }

        return (
        <div className="tic-tac-toe">
            <h1 className="title">Tic-Tac-Toe</h1>
            <DifficultyMenu 
                onDifficultyChange={this.difficultyHandler}
            />
            <TTTboard
                onPlayerMove={this.playerMoveHandler}
                theBoard={this.state.board}
            />
            <Scoreboard
                pScore={this.state.playerScore}
                cScore={this.state.cpuScore}
            />
            <Restart 
                theBoard={this.state.board}
                restartBoard={this.restartBoard}
            />
            { declareWinner }
        </div>
        )
    }
}

export default App
