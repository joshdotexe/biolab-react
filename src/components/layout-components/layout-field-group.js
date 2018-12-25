import React, { Component } from 'react'
import './layout.css'

class LayoutFieldGroup extends Component {
    render() {
        return (
            <div className="group">
                {this.props.children}
            </div>
        );
    }
}

export default LayoutFieldGroup;