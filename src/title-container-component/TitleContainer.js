import React, { Component } from 'react';
import './TitleContainer.css'
import Logo from '../logo-component/Logo';
import Description from '../description-component/Description'
import './TitleContainer.css'

class TitleContainer extends Component {
    render() {
        return (
            <div className="title-container">
                <Logo/>
                <Description/>
            </div>
        );
    }
}

export default TitleContainer;