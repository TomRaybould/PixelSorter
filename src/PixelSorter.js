import React, { Component } from 'react';
import PixelSortCanvasDrawer from './PixelSortCanvasDrawer.js'

class PixelSorter extends Component {
    componentDidMount() {
        this.updateCanvas()
    }
    updateCanvas() {
        const canvas = this.refs.canvas;
        this.canvasDrawer = new PixelSortCanvasDrawer(canvas);

        this.canvasDrawer.drawImage(this.onImageLoaded);
    }

    render() {
        return (
            <canvas ref="canvas" width={100} height={100}/>
        );
    }

    onImageLoaded = () => {
        this.scramble();
    }

    scramble = () => {
        this.canvasDrawer.scramble();
    }

}



export default PixelSorter;