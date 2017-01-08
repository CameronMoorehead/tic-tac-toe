import React from 'react'

import DifficultyMenu from './DifficultyMenu'
import TTTboard from './TTTboard'
import Scoreboard from './Scoreboard'
import Start from './Start'

class App extends React.Component {

    render() {
        return (
        <div className="tic-tac-toe">
            <h1 className="title">Tic-Tac-Toe</h1>
            <DifficultyMenu />
            <TTTboard />
            <Scoreboard />
            <Start />
        </div>
        )
    }
}

export default App
