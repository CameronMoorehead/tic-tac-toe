import React from 'react'

class Scoreboard extends React.Component {
    render() {
        return (
            <div>
                <p>W: {this.props.pScore} L: {this.props.cScore} T: {this.props.tScore}</p>
            </div>
        )
    }
}

export default Scoreboard
