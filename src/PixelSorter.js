import React, { Component } from 'react';
import PixelSortCanvasDrawer from './PixelSortCanvasDrawer.js'

class PixelSorter extends Component {
    constructor(props){
        super(props);
        this.imageFileUrl = props.imageFileUrl;
        this.algo = props.algo;
        this.loop = props.loop;
    }

    componentDidMount() {
        this.updateCanvas();
    }
        
    updateCanvas() {
        const canvas = this.refs.canvas;
        this.canvasDrawer = new PixelSortCanvasDrawer(canvas, this.imageFileUrl, this.algo, this.loop);
        this.canvasDrawer.drawImage();
    }

    render() {
        return (
            <canvas ref="canvas" width={100} height={100}/>
        );
    }

    scramble = () => {
        this.canvasDrawer.scramble();
    }

}



export default PixelSorter;