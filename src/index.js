import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import PixelSorter from './PixelSorter'

class App extends Component {
    render() {
        return (
            <div>
                <PixelSorter/>          
            </div>
        );
    }
}

ReactDOM.render(
    <App/>,
    document.getElementById('root')
);
