import React from 'react'

class TTTboard extends React.Component {
    render() {
        return (
            <div>
                <p>TTTboard</p>
                {Array.apply(null, Array(9)).map(function(element, i) 
                    {
                        if ((i+1) % 3 === 0)
                            return (
                                <span key={i+1}>
                                    <button id={i+1} onClick={(e) => this.props.onPlayerMove(e)}>{this.props.theBoard[i]}</button><br />
                                </span>
                            )
                        else
                            return (
                                <span key={i+1}>
                                    <button id={i+1} onClick={(e) => this.props.onPlayerMove(e)}>{this.props.theBoard[i]}</button>
                                </span>
                            )
                    }, this)}
            </div>
        )
    }
}

export default TTTboard
