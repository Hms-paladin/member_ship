import React, { Component } from 'react';
import DropNCrop from '@synapsestudios/react-drop-n-crop';
import '@synapsestudios/react-drop-n-crop/lib/react-drop-n-crop.min.css';
export default class DragandDropImage extends Component {
	state = {
    result: null,
    filename: null,
    filetype: null,
    src: null,
    error: null,
  };
 
  onChange = value => {
    this.setState(value);
  };
	render() {
		return (
			<div>
				<DropNCrop onChange={this.onChange} value={this.state} />
			</div>
		);
	}
}
