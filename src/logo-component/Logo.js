import React, { Component } from 'react';
import PixelSorter from '../pixel-sorter-component/PixelSorter'
import "./Logo.css"

class Logo extends Component {
    render() {
        return (
            <div className="logo">
                <PixelSorter
                    imageFileUrl = {this.props.imageFileUrl}
                    algo = "heapSort"
                    loop = {true}
                    scramble = {true}
                    pixelWidth = {1}
                    pixelHeight = {84}
                    afterSortDelay = {1000}
                    pixelsPerFrame = {15}
                    />          
            </div>
        );
    }
}

export default Logo;