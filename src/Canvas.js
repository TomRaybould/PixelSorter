import React, { Component } from 'react';
import CanvasDrawer from './CanvasDrawer.js'

class Canvas extends Component {
    componentDidMount() {
        this.updateCanvas()
    }
    updateCanvas() {
        const canvas = this.refs.canvas;
        this.canvasDrawer = new CanvasDrawer(canvas);

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



export default Canvas;