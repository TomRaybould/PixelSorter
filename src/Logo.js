import React, { Component } from 'react';
import PixelSorter from './pixel-sorter-component/PixelSorter'
import "./Logo.css"

class Logo extends Component {
    render() {
        return (
            <div className="logo">
                <PixelSorter
                    imageFileUrl = 'color_bars.png'
                    algo = "quicksort"
                    loop = {true}
                    scramble = {true}
                    afterSortDelay = {1000}/>          
            </div>
        );
    }
}

export default Logo;