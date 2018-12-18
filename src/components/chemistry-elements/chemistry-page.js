import React, {Component} from 'react'

import BalanceCard from './balance-card.js'
const flexContainer = {
    display: 'flex',
    margin:'auto',
    width:'100%',
  };
function BalanceInfo(props){
    return   (
     <div>
     <div className="mdl-card mdl-shadow--2dp card-wide">
        <div className="mdl-card__title">
        <h2 className="mdl-card__title-text">What is a balanced equation?</h2>
        </div>
        <div className="mdl-card__supporting-text">
            <p>
                A balanced equation is an equation for a chemical reaction in which the number of atoms
                for each element in the reaction and the total charge are the same for both 
                the reactants and the products.
            </p>
        </div>
    </div>
    </div>);
    
}
class ChemistryPage extends Component {
    render(){

        return (
            <div>
                <div  style={flexContainer}>
                    <BalanceInfo/>
                    <BalanceCard/>
                </div>
                  
            </div>
        );
    }
}

export default ChemistryPage;