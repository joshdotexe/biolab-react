import React, { Component } from 'react'
import ChemInput from './chem-input.js'
import '../../App.css'
import ChemDialog from './chem-dialog'
import ChemApi from './chem-api'
import ChemSearch from './chem-search'
import * as chem from './chem-balance'

const balanceInputStyle = {
    display: 'flex',
    alignItems: 'flex-start'
}

function CompoundChips(props) {
    var showPlus = props.compounds.length > 1;
    const compounds = props.compounds.map((c, index) =>
        <span key={index} >
            <span className="mdl-chip mdl-chip--contact">
                {c.coeff > 1
                    && <span className="mdl-chip__contact mdl-color--teal mdl-color-text--white">{c.coeff}</span>
                }
                <span className="mdl-chip__text">{c.name}</span>
            </span>
            {showPlus && index !== props.compounds.length - 1 && <sub>+</sub>}
        </span>

    );
    return (
        <div>{compounds}</div>
    );
}

class BalanceCard extends Component {
    addFormula(formula) {
        var eq = this.state.isReactant ? this.state.reactants : this.state.products;
        var prop = this.state.isReactant ? "reactants" : "products";
        this.setState({
            [prop]: (eq && eq.length !== 0) ? `${eq}+${formula}` : formula
        });
    }
    onError(error) {
        console.log("onResponse", error);
    }
    onChemDataResponse(response) {

        var formula = response.PC_Compounds[0].props.find(p => p.urn.label === "Molecular Formula").value.sval;
        console.log("onChemDataResponse - formula", formula);
        this.addFormula(formula);
    }
    onChemSelected(chem, isReactant) {
        this.chemApi.current.getChemData(chem);
        this.setState({
            isReactant: isReactant
        })
    }

    onChemInfo(chem) {
        this.setState({
            chemInfo: chem
        });
        this.chemDialog.current.show(chem);
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
            reactants: "",
            errorMsg: ''
        }, function () {
            console.log(this.state);
        });
    }
    onEquationChanged(value, propName) {
        this.setState({ [propName]: value });
    }
    onBalance(e) {
        this.setState({
            errorMsg: ''
        })
        if (!(this.state.reactants && this.state.products)) return;
        var balanced = chem.balanceEquation(this.state.reactants, this.state.products);
        if (balanced === null || balanced.error) {

            this.setState({
                errorMsg: balanced.error || "Error balancing equation occurred."
            })
            return;
        }
        this.setState(balanced, function () {
            console.log("balanced", this.state);
        });
    }


    render() {
        return (
            <div>
                <ChemApi ref={this.chemApi} onDataResponse={this.onChemDataResponse.bind(this)}
                    onError={this.onError.bind(this)} />

                <ChemDialog ref={this.chemDialog} />
                <div className="mdl-card mdl-shadow--2dp card-wide">
                    <div className="mdl-card__title">
                        <h2 className="mdl-card__title-text">Balance Equation</h2>
                    </div>
                    <div className="mdl-card__supporting-text">
                        <div className="field-group-col y-center">
                            <div style={balanceInputStyle}>
                                <ChemInput id="reactants"
                                    name="reactants"
                                    label="Reactants"
                                    ref={this.reactantEq}
                                    equation={this.state.reactants}
                                    onChange={this.onEquationChanged.bind(this)} />
                                <ChemSearch isReactant="true"
                                    name="reactantsSearch"
                                    onChemInfo={this.onChemInfo.bind(this)}
                                    onChemSelected={this.onChemSelected.bind(this)} />
                            </div>
                            <div className="balance-border">
                                <CompoundChips compounds={this.state.reactantCpds} />
                                <div className="glyph">
                                    <i className="glyph-icon flaticon-test-tubes-couple"></i>
                                </div>
                                <CompoundChips compounds={this.state.productCpds} />
                            </div>
                            <div style={balanceInputStyle}>
                                <ChemInput id="products"
                                    name="products"
                                    label="Products"
                                    ref={this.productEq}
                                    equation={this.state.products}
                                    onChange={this.onEquationChanged.bind(this)} />
                                <ChemSearch isReactant="false"
                                    name="productsSearch"
                                    onChemInfo={this.onChemInfo.bind(this)}
                                    onChemSelected={this.onChemSelected.bind(this)} />
                            </div>
                            <div className="error">{this.state.errorMsg}</div>

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
            products: "Ca3P2O8+NaCl",
            errorMsg: ''
        };
        this.productEq = React.createRef();
        this.reactantEq = React.createRef();
        this.chemApi = React.createRef();
        this.chemDialog = React.createRef();
    }
}

export default BalanceCard;