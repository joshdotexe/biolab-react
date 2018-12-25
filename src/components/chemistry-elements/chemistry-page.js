import React, { Component } from 'react'
import '../../App.css'

import BalanceCard from './balance-card.js'

import LayoutPhotoCard from '../layout-components/layout-photo-card'
function BalanceInfo(props) {
    return (
        <div>
            <div className="mdl-card mdl-shadow--2dp card-wide margin-right-8dp">
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
                <div className="mdl-card__title">
                    <h2 className="mdl-card__title-text">Chemical balance examples</h2>
                </div>
                <div className="mdl-card__supporting-text">
                    <ul>
                        <li>SnO₂+H₂ → Sn+H₂O balanced is SnO₂+2H₂ → Sn + 2H₂O</li>
                        <li>Na₃PO₄+HCl → NaCl+H₃PO₄ balanced is Na₃PO₄+3HCl → 3NaCl+H₃PO₄</li>
                        <li>
                            <div>CaCl₂+Na₃PO₄ → Ca₃(PO₄)₂+NaCl balanced is 3CaCl₂+2Na₃PO₄ → Ca₃(PO₄)₂+6NaCl</div>
                            <div className="info">
                                * Note to balance an equation with parenthesis you will have to distribute the atoms. ex.
                                (PO<sub>4</sub>)<sub>2</sub> becomes P<sub>2</sub>O<sub>8</sub>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );

}
class ChemistryPage extends Component {
    render() {

        return (
            <div>
                <div className="flex-container">
                    <BalanceInfo />
                    <BalanceCard />
                </div>

            </div>
        );
    }
}

export default ChemistryPage;