import React, { Component } from 'react';
import './TitleContainer.css'
import Logo from '../logo-component/Logo';
import Description from '../description-component/Description'
import './TitleContainer.css'
import SettingsGear from '../settings-gear-component/SettingsGear';
import ImageSelection from '../image-selection-component/ImageSelection';

class TitleContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {};
      }
    
    render() {
        return (
            <div className="title-container">
                <Logo imageFileUrl = {this.state.imageFileUrl ? this.state.imageFileUrl : 'pixel-sorter-logo.png'}
                    pixelSizeAuto = {this.state.pixelSizeAuto}
                />
                <Description/>
                <SettingsGear/>
                <ImageSelection onFileSelected={this.onFileSelected}/>
            </div>
        );
    }

    onFileSelected = (url)=>{
        this.setState({imageFileUrl : url, pixelSizeAuto : true});
    }
}



export default TitleContainer;