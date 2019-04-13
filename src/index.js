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
                    //imageFileUrl = 'giphy.gif'
                    algo = {"heapSort"}
                    loop = {true}
                />          
            </div>
        );
    }
}

ReactDOM.render(
    <App/>,
    document.getElementById('root')
);
