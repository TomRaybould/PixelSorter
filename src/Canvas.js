import React, { Component } from 'react';
import CanvasDrawer from './CanvasDrawer.js'

class Canvas extends Component {
    componentDidMount() {
        this.updateCanvas()
    }
    updateCanvas() {
        const canvas = this.refs.canvas;
        const ctx = canvas.getContext('2d');
        this.canvasDrawer = new CanvasDrawer(canvas);

        ctx.fillRect(0,0, canvas.width, canvas.height);
        
        this.canvasDrawer.drawImage();

        //setInterval(this.canvasDrawer.doWork, 10);
    }

    render() {
        return (
            <canvas ref="canvas" width={100} height={100}/>
        );
    }
}



export default Canvas;