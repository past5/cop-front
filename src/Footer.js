import React, {PureComponent} from 'react';
import logoIcon from './images/icon.png';
import './App.css';

class Footer extends PureComponent {
    render() {
        return (
            <footer className="section-34 page-footer bg-white context-light">
                <div className="footer-brand">
                    <hr className="divider bg-mantis" />
                    <img src={logoIcon} alt="Canada Outreach Pharmacy Logo" className="App-logo"/>
                    <p>Canada Outreach Pharmacy<br />                        
                        Toll Free: 1-877-221-2228</p>
                </div>
            </footer>
        );
    }
}

export default Footer;