
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
                        <li>
                            <a href='https://www.linkedin.com/in/arturo-p-914059157/'><i class="fab fa-linkedin"></i></a>
                        </li>
                        <li>
                            <a href='https://github.com/Arturoo0'><i class="fab fa-github-square"></i></a>
                        </li>
                    </ul>
                </div>
            </div>
        );
    }
}

export default Footer;