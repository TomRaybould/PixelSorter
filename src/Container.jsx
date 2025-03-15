import React, { Component } from 'react';
import Logo from './logo-component/Logo'
import './Container.css'
import TitleContainer from './title-container-component/TitleContainer';

class Container extends Component {

    constructor(props){
        super(props);
        this.state = { algo: 'heapSort' };
    }

    componentDidMount() {
    
    }
    
   

    render() {
        return (
            <div className="container">
                <TitleContainer/>
            </div>
        );
    }
}

export default Container;
