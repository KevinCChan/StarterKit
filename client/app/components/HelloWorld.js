'use strict';

import React from 'react';
import './HelloWorld.css';

class HelloWorld extends React.Component {
  constructor() {
    super();
  }

  render() {
    return <div styleName="helloworld">Hello World!</div>;
  }
}

export default HelloWorld;
