import React, { Component } from 'react';
import PixelSortCanvasDrawer from './PixelSortCanvasDrawer.js';
import './PixelSorter.css';

class PixelSorter extends Component {
    constructor(props){
        super(props);
        this.state = {initLoad : true};
    }

    resize = () => {
        if(this.canvas){
            this.canvas.style.width = '80%';
        }
    }


    componentDidMount() {
        this.updateCanvas();
    }
        
    updateCanvas() {
        this.canvas = this.refs.canvas;
        this.canvasDrawer = new PixelSortCanvasDrawer(this.canvas);
        this.updatePixelSortCanvasDrawer();
        this.canvasDrawer.drawImage();
    }

    render() {
        if(this.canvasDrawer){
            this.updatePixelSortCanvasDrawer();
        }

        return (
            <div className="pixel-sorter">
                <canvas ref="canvas" className="canvas"/>
            </div>
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