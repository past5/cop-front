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
                    <p>Rx Save Pharmacy<br />
                        27265 Fraser Hwy, Aldergrove, BC V4W 3P9<br />
                        Toll Free: 1-877-221-2228</p>
                </div>
            </footer>
        );
    }
}

export default Footer;