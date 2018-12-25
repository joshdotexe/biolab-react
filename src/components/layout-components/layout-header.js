import React, { Component } from 'react'
import './layout.css'

class LayoutHeader extends Component {
    render() {
        return (
            <div>
                <div className="heading">
                    <div className="headerText">{this.props.heading}</div>
                    <div className="layout-flex"></div>
                    <div className="actionarea">
                        <div className="actions">
                            {this.props.actions}
                        </div>
                    </div>
                </div>
                <div className="subheading">{this.props.subheading}</div>
            </div>
        );
    }
}

export default LayoutHeader;