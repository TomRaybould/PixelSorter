import React, { Component } from 'react';
import Logo from './logo-component/Logo'
import Container from './Container';

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
                <Container/>       
            </div>
        );
    }
}

export default App;
