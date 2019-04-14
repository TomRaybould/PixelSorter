import React, { Component } from 'react';
import Logo from './Logo'

class App extends Component {

    constructor(props){
        super(props);
        this.state = { algo: 'heapSort' };
    }

    componentDidMount() {
    
    }
    
   

    render() {
        return (
            <div>
                <Logo/>          
            </div>
        );
    }
}

export default App;
