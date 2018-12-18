import React, { Component } from 'react'
import ChemInput from './chem-input.js'
import '../../App.css'
import Antena from '../antena-components/antena.js'
import ChemSearch from './chem-search'
import * as chem from './chem-balance.js'

const balanceInputStyle ={
    display:'flex',
    alignItems:'flex-start'
}

function CompoundChips(props) {
    const compounds = props.compounds.map((c, index) =>
        <span key={index} className="mdl-chip mdl-chip--contact">
            {c.coeff > 1
                ? <span className="mdl-chip__contact mdl-color--teal mdl-color-text--white">{c.coeff}</span>
                : <span></span>
            }
            <span className="mdl-chip__text">{c.name}</span>
        </span>
    );
    return (
        <div>{compounds}</div>
    );
}

class BalanceCard extends Component {
    addFormula(formula){
        var eq = this.state.reactants;

        this.setState({
            reactants: (eq && eq.length !== 0) ? `${eq}+${formula}` : formula
        });
    }
    onError(error) {
        console.log("onResponse", error);
    }
    onChemDataResponse(response) {
        console.log("onChemDataResponse", response);
        if (response.Fault && (response.Fault.Code === "PUGREST.NotFound" || response.Fault.Code === "PUGREST.ServerBusy")) return;
        var formula = response.PC_Compounds[0].props.find(p => p.urn.label === "Molecular Formula").value.sval;
        console.log("onChemDataResponse - formula", formula);
        this.addFormula(formula);
    }
    onChemResponse(response) {
        if (response.Fault && (response.Fault.Code === "PUGREST.NotFound" || response.Fault.Code === "PUGREST.ServerBusy")) return;
        if (!(response.IdentifierList && response.IdentifierList.CID)) return;
        var cid = response.IdentifierList.CID[0];
        this.chemDataAntena.current.state.url = `https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/cid/${cid}/record/json`;
        this.chemDataAntena.current.generateRequest();
    }
    onChemSelected(chem, isReactant) {
        console.log(`https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/name/${chem}/cids/json`, { isReact: isReactant});

        this.chemIdAntena.current.state.url = `https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/name/${chem}/cids/json`;
        this.chemIdAntena.current.generateRequest();
    }
   
   
    componentDidUpdate(prevProps, prevState) {
        //console.log(this.state);        
    }
    onClear(e) {
        this.reactantEq.current.reset();
        this.productEq.current.reset();
        this.setState({
            reactantCpds: [],
            productCpds: [],
            compounds: [],
            products: "",
            reactants: ""
        }, function () {
            console.log(this.state);
        });
    }
    onBalance(e) {
        if (!(this.state.reactants && this.state.products)) return;
        var balanced = chem.balanceEquation(this.state.reactants, this.state.products);
        if (balanced === null) {

            return;
        }
        this.setState(balanced);
    }


    render() {
        return (
            <div className="mdl-card mdl-shadow--2dp card-wide">
                <div className="mdl-card__title">
                    <h2 className="mdl-card__title-text">Balance Equation</h2>
                </div>
                <div className="mdl-card__supporting-text">
                   
                    <Antena ref={this.chemIdAntena} onResponse={this.onChemResponse.bind(this)} />
                    <Antena ref={this.chemDataAntena} onResponse={this.onChemDataResponse.bind(this)} />
                        <div className="field-group-col y-center">
                            <div style={balanceInputStyle}>
                                <ChemInput id="reactants"
                                    name="reactants"
                                    label="Reactants"
                                    ref={this.reactantEq}
                                    equation={this.state.reactants} />
                                    <ChemSearch isReactant="true" onChemSelected={this.onChemSelected.bind(this)}/>
                            </div>
                            <div className="balance-border">
                                <CompoundChips compounds={this.state.reactantCpds}
                                />
                                <div className="glyph"><i className="glyph-icon flaticon-test-tubes-couple"></i> </div>
                                <CompoundChips compounds={this.state.productCpds}
                                />
                            </div>
                            <div style={balanceInputStyle}>
                                <ChemInput id="products"
                                    name="products"
                                    label="Products"
                                    ref={this.productEq}
                                    equation={this.state.products} />
                                    <ChemSearch isReactant="false" onChemSelected={this.onChemSelected.bind(this)}/>
                            </div>
                        </div>

                </div>
                <div className="mdl-card__actions mdl-card--border">
                    <button onClick={this.onBalance.bind(this)}
                        className="full-width mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent">
                        Balance
                    </button>
                </div>
                <div className="mdl-card__menu">
                    
                    <button id="clr" onClick={this.onClear.bind(this)} className="mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect">
                        <i className="material-icons">clear_all</i>
                    </button>
                    <div className="mdl-tooltip" htmlFor="clr">
                        Clear
                    </div>
                </div>
            </div>
        )
    }
    
    constructor(props) {
        super(props);
        this.state = {
            searchResults: [],
            reactantCpds: [],
            productCpds: [],
            compounds: [],
            reactants: "CaCl2+Na3PO4",
            products: "Ca3P2O8+NaCl"
        };
        this.productEq = React.createRef();
        this.reactantEq = React.createRef();
        this.chemIdAntena = React.createRef();
        this.chemDataAntena = React.createRef();
        this.form = React.createRef();
    }
}

export default BalanceCard;