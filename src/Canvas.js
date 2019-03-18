import React, { Component } from 'react';
import CanvasDrawer from './CanvasDrawer.js'

class Canvas extends Component {
    constructor(){
        super();
    }
    componentDidMount() {
        this.updateCanvas()
    }
    updateCanvas() {
        const canvas = this.refs.canvas;
        const ctx = canvas.getContext('2d');
        this.canvasDrawer = new CanvasDrawer(canvas);

        ctx.fillRect(0,0, canvas.width, canvas.height);

        setInterval(this.canvasDrawer.doWork, 1000);
    }

    render() {
        return (
            <canvas ref="canvas" width={300} height={300}/>
        );
    }
}



export default Canvas;