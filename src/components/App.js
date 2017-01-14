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
        this.nextTurn = this.nextTurn.bind(this)
        this.state = {
            difficulty: 'medium',
            board: ['_','_','_','_','_','_','_','_','_'],
            cpu: 'o',
            player: 'x',
            cpuScore: 0,
            playerScore: 0,
            gameOver: false,
            playerTurn: 1
        }
    }

    difficultyHandler(e) {
        this.setState({ difficulty: e.target.id })
    }

    restartBoard() {
        this.setState({ board: ['_','_','_','_','_','_','_','_','_'] })
    }

    nextTurn() {
        return this.state.playerTurn === 1 ? 2 : 1
    }

    computerMoveHandler() {
        setTimeout(() => {
            let cpuMove = ttt(this.state.difficulty, this.state.board, this.state.cpu)
            if (!this.state.gameOver) {
                const board = {...this.state.board}
                board[cpuMove -1] = this.state.cpu
                this.setState({ board: board, playerTurn: this.nextTurn()})
                this.checkWinner()
            }
        }, 200) 
    }

    playerMoveHandler(e) {
        let positionEmpty = this.state.board[e.target.id - 1] === '_'
        if (positionEmpty) {
            const board = {...this.state.board}
            board[e.target.id - 1] = this.state.player
            this.setState({ board: board, playerTurn: this.nextTurn() }, function() {
                this.checkWinner()
                this.computerMoveHandler()
            })
        }
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
            this.setState({ gameOver: true, playerScore: (this.state.playerScore + 1) })
            return true
        }
        if (checkForWinner(this.state.cpu)) {
            this.setState({ gameOver: true, cpuScore: (this.state.cpuScore + 1)})
            return true
        }
        return false
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
