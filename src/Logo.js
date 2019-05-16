import React, { Component } from 'react';
import PixelSorter from './pixel-sorter-component/PixelSorter'
import "./Logo.css"

class Logo extends Component {
    render() {
        return (
            <div className="logo">
                <PixelSorter
                    imageFileUrl = 'pixel-sorter-logo.png'
                    algo = "heapSort"
                    loop = {true}
                    scramble = {true}
                    pixelWidth = {1}
                    pixelHeight = {84}
                    afterSortDelay = {500}
                    pixelsPerFrame = {10}
                    />          
            </div>
        );
    }
}

export default Logo;