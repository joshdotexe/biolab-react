import React, { Component } from 'react'
import './layout.css'

class LayoutField extends Component {
    render() {
        return (
            <div className="wrap">
                <label>{this.props.label}</label>
                <div className={`${(this.props.children ? "content" : "empty")} ${this.props.multiline?"xwrap":""}`}>
                    {this.props.children ? this.props.children : "none"}
                </div>
            </div>
        )
    }
}

export default LayoutField;