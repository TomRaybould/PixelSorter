import React, { Component } from 'react';
import Logo from './logo-component/Logo'
import './Container.css'
import NavBar from './nav-bar-component/NavBar';

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
                <Logo/>          
            </div>
        );
    }
}

export default Container;
