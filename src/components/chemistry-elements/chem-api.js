import React, { Component } from 'react'
import Antena from '../antena-components/antena.js'

class ChemApi extends Component {
    _onError(error) {
        console.log("onResponse", error);
        if (this.props.onError) {
            this.props.onError();
        }
    }
    _onChemSearchResponse(response) {
        if (response.total === 0) return;
        var searchResults = response.dictionary_terms.compound;
        this.props.onSearchResponse(searchResults);
    }
    _onChemDataResponse(response) {
        console.log("onChemDataResponse", response);
        if (response.Fault && (response.Fault.Code === "PUGREST.NotFound" || response.Fault.Code === "PUGREST.ServerBusy")) return null;
        this.props.onDataResponse(response);
    }
    _onChemResponse(response) {
        if (response.Fault && (response.Fault.Code === "PUGREST.NotFound" || response.Fault.Code === "PUGREST.ServerBusy")) return;
        if (!(response.IdentifierList && response.IdentifierList.CID)) return;
        var cid = response.IdentifierList.CID[0];
        if (this.state.forInfo === true) {
            this.chemDescAntena.current.state.url = `https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/cid/${cid}/description/json`;
            this.chemDescAntena.current.generateRequest();
        }
        else {
            this.chemDataAntena.current.state.url = `https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/cid/${cid}/record/json`;
            this.chemDataAntena.current.generateRequest();
        }

    }
    _onChemDescResponse(response) {
        this.setState({
            forInfo: false
        });
        this.props.onInfoResponse(response);
    }
    getChemData(chem) {
        console.log(`https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/name/${chem}/cids/json`);
        this.chemIdAntena.current.state.url = `https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/name/${chem}/cids/json`;
        this.chemIdAntena.current.generateRequest();
    }
    searchChem(query) {
        this.chemSearchAntena.current.state.url = `https://pubchem.ncbi.nlm.nih.gov/rest/autocomplete/compound/${query}/json?limit=5`;
        this.chemSearchAntena.current.generateRequest();
    }
    getChemDescription(chem) {
        this.getChemData(chem);
        this.setState({
            forInfo: true
        });
    }
    render() {
        return (
            <div>
                <Antena ref={this.chemDescAntena} onResponse={this._onChemDescResponse.bind(this)} />
                <Antena ref={this.chemSearchAntena} onResponse={this._onChemSearchResponse.bind(this)} />
                <Antena ref={this.chemIdAntena} onResponse={this._onChemResponse.bind(this)} onError={this._onError.bind(this)} />
                <Antena ref={this.chemDataAntena} onResponse={this._onChemDataResponse.bind(this)} onError={this._onError.bind(this)} />
            </div>
        )
    }
    constructor(props) {
        super(props);
        this.state={
            forInfo:false
        };
        this.chemIdAntena = React.createRef();
        this.chemDataAntena = React.createRef();
        this.chemSearchAntena = React.createRef();
        this.chemDescAntena = React.createRef();
    }
}

export default ChemApi;