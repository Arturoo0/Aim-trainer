
import React from 'react';
import './CSS/Footer.css';

class Footer extends React.Component {
    render(){
        return(
            <div id='footer-root'>
                <div id='footer-name-date'>
                    ARTURO PORTELLES
                </div>
                <div id='footer-links-container'>
                    <ul id='footer-social-links'>
                        <li><i class="fab fa-github-square"></i></li>
                        <li><i class="fab fa-linkedin"></i></li>
                    </ul>
                </div>
            </div>
        );
    }
}

export default Footer;