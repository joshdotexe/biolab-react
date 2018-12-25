import React, { Component } from 'react'
import './layout.css'


class LayoutButton extends Component {
    render() {
        return (
            <button onClick={this.onBalance.bind(this)}
            className="full-width mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent">
            Balance
    </button>
        )
    }
}

export default LayoutButton;