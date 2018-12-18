import React, {Component} from 'react'

import { Link } from 'react-router-dom'

class Header extends Component {
    constructor(props){
        super(props);
        this.state = {
            props:props
        };
    }
    render(){
        return (
            <div>
                <div className="app-layout-waterfall mdl-layout mdl-js-layout">
                    <header className="mdl-layout__header mdl-layout__header--waterfall">
                    {/* <!-- Top row, always visible --> */}
                        <div className="mdl-layout__header-row">
                            {/* <!-- Title --> */}
                            <span className="mdl-layout-title">BioLab</span>
                            <div className="mdl-layout-spacer"></div>
                        </div>
                        {/* <!-- Bottom row, not visible on scroll --> */}
                        <div className="mdl-layout__header-row">
                            <div className="mdl-layout-spacer"></div>
                            
                            {/* <!-- Navigation --> */}
                                <nav className="mdl-navigation">
                                    <Link className="mdl-navigation__link"  to='/'>Home</Link>
                                    <Link className="mdl-navigation__link"  to='/chemistry'>Chemistry</Link>
                                </nav>
                        </div>
                        
                    </header>
                    <div className="mdl-layout__drawer">
                    <span className="mdl-layout-title">BioLab</span>
                    <nav className="mdl-navigation">
                        <Link className="mdl-navigation__link"  to='/'>Home</Link>
                        <Link className="mdl-navigation__link"  to='/chemistry'>Chemistry</Link>
                    </nav>
                    </div>
                    <main className="mdl-layout__content">
                        <div className="page-content">
                            {this.state.props.children}
                        </div>
                    </main>
                    <footer className="mdl-mini-footer">
                    <div className="mdl-mini-footer__left-section">
                        <div className="mdl-logo">BioLab</div>
                        <ul className="mdl-mini-footer__link-list">
                            <li>
                                Icons made by <a href="http://www.freepik.com/" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" 		   
                                 title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" 		  
                                   title="Creative Commons BY 3.0" target="_blank" rel="noopener noreferrer">CC 3.0 BY</a>
                            </li>
                        </ul>
                    </div>
                    </footer>
                </div>
            </div>
            
        );
    }
}
export default Header;