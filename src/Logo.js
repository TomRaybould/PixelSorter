import React, { Component } from 'react';

import PixelSorter from './pixel-sorter-component/PixelSorter'

class Logo extends Component {
    render() {
        return (
            <div>
                <PixelSorter
                    imageFileUrl = 'pixel-sorter-logo.png'
                    algo = {"heapSort"}
                    loop = {true}
                    scramble = {true}
                    afterSortDelay = {1000}
                />          
            </div>
        );
    }
}

export default Logo;