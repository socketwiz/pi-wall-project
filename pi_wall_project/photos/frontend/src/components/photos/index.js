/**
 * Photos application
 */

import React, {Component} from 'react';
import {MINUTE, SECOND} from '../../constants';
import {switchToBus} from '../../base';

class Photos extends Component {
  /**
   * Class constructor
   *
   * @param {Object} props - React element properties
   */
  constructor(props) {
    super(props);

    this.state = {
      'image': ''
    };
    this.nextImageInterval = null;
  }

  /**
   * Call the API and get a random image
   */
  getNextImage() {
    fetch('/photos/next_image').then((response) => {
      response.json().then((image) => {
        this.setState({'image': image.file});
      });
    });
  }

  /**
   * React lifecycle method, invoked immediately after a component is mounted
   */
  componentDidMount() {
    const seconds = 10 * 1000;

    this.getNextImage();
    this.nextImageInterval = setInterval(() => this.getNextImage(), seconds);
    this.busTimer = setInterval(switchToBus, 1 * MINUTE);
  }

  /**
   * React component lifecycle method, invoked immediately before a component is unmounted
   */
  componentWillUnmount() {
    clearInterval(this.nextImageInterval);
  }

  /**
   * When called, it should examine this.props and this.state and return a single React element.
   *
   * @returns {Object} - Single React element
   */
  render() {
    const {image} = this.state;
    const imagePath = `/static/images/carousel/${image}`;

    return (
      <div id="imageContainer">
        <img src={imagePath} alt="family photo" width="1920"/>
      </div>
    );
  }
}

export default Photos;

