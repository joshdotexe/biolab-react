import React, { Component } from 'react'


class ChemInputSearch extends Component {
    
    onChemSelected(chem, isReactant) {
        console.log(`https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/name/${chem}/cids/json`, { isReact: isReactant });

        this.chemIdAntena.current.state.url = `https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/name/${chem}/cids/json`;
        this.chemIdAntena.current.generateRequest();
    }
    onEquationChanged(value, propName){
        this.setState({[propName]:value});
    }
    render() {
        return (
            <div>
                <ChemInput id="reactants"
                    name="reactants"
                    label="Reactants"
                    ref={this.reactantEq}
                    equation={this.state.reactants}
                    onChange={this.onEquationChanged.bind(this)} />
                <ChemSearch isReactant="true" onChemSelected={this.onChemSelected.bind(this)} />
            </div>
        );
    }
    constructor(props) {
        super(props);
    }
}

export default ChemInputSearch;