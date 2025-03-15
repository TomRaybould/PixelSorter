import React, { Component } from 'react';
import PixelSortCanvasDrawer from './PixelSortCanvasDrawer';
import './PixelSorter.css';

class PixelSorter extends Component {
    constructor(props){
        super(props);
        this.state = {initLoad : true};
    }

    componentDidMount() {
        this.updateCanvas();
    }
        
    updateCanvas() {
        this.canvas = this.refs.canvas;
        if(this.canvasDrawer){
            this.canvasDrawer.stopDrawing = true;
        }
        this.canvasDrawer = new PixelSortCanvasDrawer(this.canvas);
        this.updatePixelSortCanvasDrawer();
        this.canvasDrawer.drawImage();
    }

    render() {
        if(this.canvasDrawer){
            if(this.props.imageFileUrl !== this.canvasDrawer.imageFileUrl){
                this.updateCanvas();
            }
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
        this.canvasDrawer.pixelWidth = this.props.pixelWidth ? this.props.pixelWidth : 1;
        this.canvasDrawer.pixelHeight = this.props.pixelHeight ? this.props.pixelHeight : this.canvasDrawer.pixelWidth;
        this.canvasDrawer.pixelsPerFrame = this.props.pixelsPerFrame;
        this.canvasDrawer.pixelSizeAuto = this.props.pixelSizeAuto;
    } 

}

module.exports = PixelSorter;