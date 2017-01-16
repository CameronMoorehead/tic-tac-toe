import React from 'react'

class DifficultyMenu extends React.Component {
    render() {
        return (
            <div className="difficulty-menu">
                <form onChange={(e) => this.props.onDifficultyChange(e)}>
                    <legend>easy<input name="difficulty" type="radio" id="easy" /></legend>
                    <legend>medium<input name="difficulty" defaultChecked type="radio" id="medium" /></legend>
                    <legend>hard<input name="difficulty" type="radio" id="hard" /></legend>
                </form>
            </div>
        )
    }
}

export default DifficultyMenu
