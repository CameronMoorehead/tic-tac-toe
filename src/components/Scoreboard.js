import React from 'react'

class Scoreboard extends React.Component {
    render() {
        return (
            <div>
                <p>Scoreboard</p>
                <p>{this.props.pScore}, {this.props.cScore}</p>
            </div>
        )
    }
}

export default Scoreboard
