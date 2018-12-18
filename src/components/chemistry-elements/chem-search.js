import React, { Component } from 'react'
import ChemSearchList from './chem-search-list'
import Antena from '../antena-components/antena.js'


class ChemSearch extends Component {
    onClear(e) {
        this.setState({
            search: '',
            searchResults: [],
            clrIsActive: '',
            noWidth:'no-width'            
            
        },function(){
            console.log(this.state);
        });
    }
    getChemData(chem) {
        this.props.onChemSelected(chem, Boolean(this.props.isReactant));
    }
    onChemSearchResponse(response) {
        if (response.total === 0) return;
        var searchResults = response.dictionary_terms.compound;
        this.setState({
            searchResults: searchResults
        });
    }
    searchChemData(query) {
        //console.log(value);
        this.chemSearchAntena.current.state.url = `https://pubchem.ncbi.nlm.nih.gov/rest/autocomplete/compound/${query}/json?limit=5`;
        this.chemSearchAntena.current.generateRequest();
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
                noWidth:'no-width'                
            });
        }
        else {
            this.searchChemData(query);
            this.setState({
                clrIsActive:"is-active",
            })
        }
    }
    render() {
        return (
            <div>
                <Antena ref={this.chemSearchAntena} onResponse={this.onChemSearchResponse.bind(this)} />

                <div className="flex-container y-center">
                    <div className="app-input mdl-textfield mdl-js-textfield">
                        <label className="mdl-button mdl-js-button mdl-button--icon" htmlFor="sample6">
                            <i className="material-icons">search</i>
                        </label>
                        <div className="flex-container mdl-textfield__expandable-holder">
                            <input className={`mdl-textfield__input ${this.state.noWidth}`} type="text" id="sample6"
                                value={this.state.search}
                                onChange={this.onSearchChanged.bind(this)} />
                        </div>
                    </div>
                    <button onClick={this.onClear.bind(this)} 
                    className={`expand-button mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect ${this.state.clrIsActive}`}>
                        <i className="material-icons">clear</i>
                    </button>
                </div>


                <ChemSearchList compounds={this.state.searchResults}
                    onChemSelected={this.getChemData.bind(this)} />
            </div>
        );
    }
    constructor(props) {
        super(props);
        this.chemSearchAntena = React.createRef();
        this.state = {
            searchResults: [],
            search:'',
            clrIsActive:'',
            noWidth:''            
        };
    }

}


export default ChemSearch;