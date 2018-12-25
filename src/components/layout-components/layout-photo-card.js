import React, { Component } from 'react'
import "./layout.css"
import LayoutHeader from './layout-header'


class LayoutPhotoCard extends Component {
    render() {
        return (
            <div className="card-host host">
                <div className="frame">
                    {this.props.heading &&
                        <LayoutHeader
                            heading={this.props.heading}
                            subheading={this.props.subheading}
                            actions={this.props.actions}
                        />}
                        {this.props.loading &&
                            <div style={{width:'100%;'}}></div>
                        }
                    <div className="body">
                        {this.props.main}
                    </div>
                    <div className="buttonarea">
                            <div className="spacer"></div>
                            {this.props.buttons}
                    </div>
                </div>
                {this.src &&
                    <div className="photo" style={`background-image:url('${this.src}')`}>
                    </div>
                }

            </div>
        )
    }
}

export default LayoutPhotoCard;