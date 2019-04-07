import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import Canvas from './Canvas'

class App extends Component {
    render() {
        return (
            <div>
                <Canvas/>          
            </div>
        );
    }
}

ReactDOM.render(
    <App/>,
    document.getElementById('root')
);
