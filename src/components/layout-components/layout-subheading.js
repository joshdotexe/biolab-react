import React, { Component } from 'react'
import './layout.css'

class LayoutSubHeading extends Component {
    render() {
        return (
            <div className="subheader">
                <div className="headerText">
                    {
                        this.props.href 
                        ? <a href={this.props.href}>{this.props.heading}</a>
                        : <span>{this.props.heading}</span>
                    }
                </div>
                <div className="layout-flex"></div>
                <div className="actionarea">
                    <div className="actions">
                        {this.props.actions}
                    </div>
                </div>
            </div>
        );
    }
}

export default LayoutSubHeading;