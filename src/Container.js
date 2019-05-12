import React, { Component } from 'react';
import Logo from './Logo'
import './Container.css'

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
