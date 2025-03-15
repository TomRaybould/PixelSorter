import React, { Component } from 'react';

class ImageSelection extends Component {
    constructor(props){
        super(props)
        this.onFileSelected = props.onFileSelected;
    }

    render() {
        return (
            <div>
                <input type="file" onChange={ (e) => this.handleChange(e.target.files) } />
            </div>
        );
    }

    handleChange = (files) =>{
        var url = URL.createObjectURL(files[0]);
        this.onFileSelected(url);
    }

}

export default ImageSelection;