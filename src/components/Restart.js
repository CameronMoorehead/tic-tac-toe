import React from 'react'

class Restart extends React.Component {
    render() {
        return (
            <div>
                <button onClick={function() { window.location.reload() }}>Restart</button>
            </div>
        )
    }
}

export default Restart
