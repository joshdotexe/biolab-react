import React, { Component } from 'react'


class ChemSearchList extends Component {
    setSelected(e, chem) {
        console.log(e);
        this.setState({
            selected: e.currentTarget.value
        }, function () {
            console.log(this.state);
            this.props.onChemSelected(this.state.selected);
        })
    }
    render() {
        return (
            <div>
                <ul className="mdl-list">
                    {this.props.compounds.map((c,index) =>
                    <li className="mdl-list__item" key={index}>
                        <span className="mdl-list__item-primary-content">
                            {c}
                        </span>
                        <span className="mdl-list__item-secondary-action">
                            <button onClick={this.setSelected.bind(this)} value={c} className="mdl-button mdl-js-button mdl-button--icon mdl-button--colored">
                                <i className="material-icons">add</i>
                            </button>
                        </span>
                    </li>
                    )}

                </ul>
            </div>
        );
    }
    constructor(props) {
        super(props);
        this.state = {
            compounds: props.compounds,
            selected: null
        };
    }
}
export default ChemSearchList;