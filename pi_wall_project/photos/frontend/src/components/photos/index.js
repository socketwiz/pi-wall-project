/**
 * Photos application
 */

import React, {Component} from 'react';

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
  }

  getNextImage() {
    fetch('/photos/next_image').then((response) => {
      response.json().then((image) => {
        this.setState({'image': image.file});
      });
    });
  }

  componentDidMount() {
    const seconds = 10 * 1000;

    this.getNextImage();
    setInterval(() => this.getNextImage(), seconds);
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

