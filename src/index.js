import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import PixelSorter from './PixelSorter'

class App extends Component {

    constructor(props){
        super(props);
        this.state = { algo: 'heapSort' };
    }

    componentDidMount() {
        setTimeout(function () {
            this.setState({algo : ''});
          }.bind(this), 10000)
    }
    
   

    render() {
        return (
            <div>
                <PixelSorter
                    imageFileUrl = 'color_bars.png'
                    algo = {this.state.algo}
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
