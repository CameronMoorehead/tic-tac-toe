import React from 'react'

import DifficultyMenu from './DifficultyMenu'
import TTTboard from './TTTboard'
import Scoreboard from './Scoreboard'

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
            tieScore: 0,
            gameOver: false,
            playerTurn: 1,
            winner: ''
        }
    }

    difficultyHandler(e) {
        this.setState({ difficulty: e.target.id })
    }

    restartBoard() {
        this.setState({
            board: ['_','_','_','_','_','_','_','_','_'],
            gameOver: false
        })
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

        let checkForTie = (function() {
            return findTriples(this.state.board).every(function(x) {
                return x.every(function(y) {
                    return y === 'x' || y === 'o'
                })
            })
        }).bind(this)

        if (checkForWinner(this.state.player)) {
            this.setState({ gameOver: true, playerScore: (this.state.playerScore + 1), winner: 'Player Wins!' })
            return true
        }
        if (checkForWinner(this.state.cpu)) {
            this.setState({ gameOver: true, cpuScore: (this.state.cpuScore + 1), winner: 'CPU Wins!'})
            return true
        }
        if (checkForTie()) {
            this.setState({ gameOver: true, tieScore: (this.state.tieScore + 1), winner: 'It\'s a tie!'})
            return true
        }
        return false
    }

    render() {
        let declareResults;
        if (this.state.gameOver) {
            declareResults = (
                <div className="declare">
                    <p>{this.state.winner}</p>
                    <button onClick={this.restartBoard}>Restart</button>
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
                tScore={this.state.tieScore}
            />
            { declareResults }
        </div>
        )
    }
}

export default App
