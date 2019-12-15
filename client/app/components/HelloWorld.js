'use strict';

import React from 'react';
import { hot } from 'react-hot-loader/root';
import './HelloWorld.css';

class HelloWorld extends React.Component {
  constructor() {
    super();
  }

  render() {
    return <div styleName="helloworld">Hello World!</div>;
  }
}

export default hot(HelloWorld);
