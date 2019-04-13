import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import PixelSorter from './PixelSorter'

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
                <PixelSorter
                    //imageFileUrl = 'color_bars.png'
                    algo = {"heapSort"}
                    loop = {true}
                    scramble = {true}
                    delayAfterSorting = {1000}
                />          
            </div>
        );
    }
}

ReactDOM.render(
    <App/>,
    document.getElementById('root')
);