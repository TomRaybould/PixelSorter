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
                    pixelWidth = {2}
                    pixelHeight = {2}
                    afterSortDelay = {1000}/>          
            </div>
        );
    }
}

export default Logo;