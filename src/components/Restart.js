import React from 'react'

class Restart extends React.Component {
    render() {
        return (
            <div>
                <button onClick={this.props.restartBoard}>Restart</button>
            </div>
        )
    }
}

export default Restart
