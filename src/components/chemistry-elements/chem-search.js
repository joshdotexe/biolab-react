import React, { Component } from 'react'
import ChemSearchList from './chem-search-list'
import ChemApi from './chem-api'



class ChemSearch extends Component {
    onClear(e) {
        this.setState({
            search: '',
            searchResults: [],
            clrIsActive: '',           
        },function(){
            console.log(this.state);
        });
    }
    getChemInfo(chem) {
        this.props.onChemInfo(chem);
    }
    getChemFormula(chem) {
        this.props.onChemSelected(chem, this.props.isReactant === "true");
    }
    onChemSearchResponse(response) {
        this.setState({
            searchResults: response
        });
    }
    searchChemData(query) {
        this.chemSearchAntena.current.searchChem(query);
    }
    onSearchChanged(e) {
        var query = e.target.value;
        this.setState({
            search: query
        });
        if (!query) {
            this.setState({
                searchResults: [],
                clrIsActive:'',              
            });
        }
        else {
            this.searchChemData(query);
            this.setState({
                clrIsActive:"is-active",
            });
        }
    }
    render() {
        return (
            <div>
                <ChemApi ref={this.chemSearchAntena} onSearchResponse={this.onChemSearchResponse.bind(this)} />

                <div className="flex-group y-center">
                    <div className="mdl-textfield mdl-js-textfield mdl-textfield--expandable">
                        <label className="mdl-button mdl-js-button mdl-button--icon" htmlFor={`${this.props.name}-input`}>
                            <i className="material-icons">search</i>
                        </label>
                        <div className="flex-group mdl-textfield__expandable-holder">
                            <input className="mdl-textfield__input" type="text" id={`${this.props.name}-input`}
                                value={this.state.search}
                                onChange={this.onSearchChanged.bind(this)} />
                        </div>
                    </div>
                    {/* <button onClick={this.onClear.bind(this)} 
                    className={`expand-button mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect ${this.state.clrIsActive}`}>
                        <i className="material-icons">clear</i>
                    </button> */}
                </div>
                <ChemSearchList compounds={this.state.searchResults}
                    onChemSelected={this.getChemFormula.bind(this)}
                    onChemInfo={this.getChemInfo.bind(this)} />
            </div>
        );
    }
    constructor(props) {
        super(props);
        this.chemSearchAntena = React.createRef();
        this.state = {
            searchResults: [],
            search:'',
            clrIsActive:''
        };
    }

}


export default ChemSearch;