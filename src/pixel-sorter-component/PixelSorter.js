import React, { Component } from 'react';
import PixelSortCanvasDrawer from './PixelSortCanvasDrawer.js'

class PixelSorter extends Component {
    constructor(props){
        super(props);
        this.state = {initLoad : true};
    }

    componentDidMount() {
        this.updateCanvas();
    }
        
    updateCanvas() {
        const canvas = this.refs.canvas;
        this.canvasDrawer = new PixelSortCanvasDrawer(canvas);
        this.updatePixelSortCanvasDrawer();
        this.canvasDrawer.drawImage();
    }

    render() {
        if(this.canvasDrawer){
            this.updatePixelSortCanvasDrawer();
        }

        return (
            <canvas ref="canvas"/>
        );

    }

    scramble = () => {
        this.canvasDrawer.scramble();
    }

    updatePixelSortCanvasDrawer = () => {
        this.canvasDrawer.imageFileUrl = this.props.imageFileUrl;
        this.canvasDrawer.algo = this.props.algo;
        this.canvasDrawer.loop = this.props.loop;
        this.canvasDrawer.shouldScramble = this.props.scramble;
        this.canvasDrawer.afterSortDelay = this.props.afterSortDelay;
    } 

}



export default PixelSorter;