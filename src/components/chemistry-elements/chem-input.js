import React, { Component } from 'react';

class ChemInput extends Component {
    reset(){
        this.setState({ equation: ""});  
    }
    onEquationChanged(e){
        this.setState({ equation: e.target.value });  
        this.props.onChange(e.target.value, this.props.name);
    }
    
    constructor(props){
        super(props);
        this.state = {
            equation:props.equation || '',
            onChange:props.onChange
        };
    }
    render() {
        return (

            <div className="app-input mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                <input className="mdl-textfield__input" type="text" id="input"
                pattern="[0-9A-z+\(\)]*"
                required
                value={this.props.equation}
                onChange={this.onEquationChanged.bind(this)}/>
                <label className="mdl-textfield__label" htmlFor="input">{this.props.label}</label>
                <span className="mdl-textfield__error">Enter a valid equation</span>
            </div>
        );
    }
}

export default ChemInput;
//chemical formula regex
//https://regex101.com/r/lx3dKC/1 