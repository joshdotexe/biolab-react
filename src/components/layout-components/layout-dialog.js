import React, { Component } from 'react'
import './layout.css'
import LayoutHeader from './layout-header'

class LayoutDialog extends Component {
    /* Call hide to close the popover. */
    hide(){
        this.host.current.hidden = true;
    }
    close(){
        this.host.current.hidden = true;
    }
    /* Call show to open the popover and show it. */
    show (){
        this.host.current.hidden = false;
    }
    open() {
        this.host.current.hidden = false;
    }
    tapTohide() {
        if (this.props.tapTohide) {
            this.host.current.hidden = true;
        }
    }
    render() {
        return (
            <div className="host" ref={this.host} hidden onClick={this.tapTohide.bind(this)}>
                <div className="scrim">
                    <div className={`layout-card ${this.props.style || ''}`}>
                        <LayoutHeader heading={this.props.heading}
                            subheading={this.props.subheading} actions={this.props.actions} />
                        <div className="layout-main-dialog">
                            <main>
                                {this.props.main}
                            </main>
                        </div>
                        <div className="buttonarea">
                            <div className="buttons">
                                <div className="spacer"></div>
                                {this.props.buttons}
                            </div>

                        </div>
                    </div>
                </div>
            </div>

        );
    }
    constructor(props) {
        super(props);
        this.host = React.createRef();
    }
}

export default LayoutDialog;