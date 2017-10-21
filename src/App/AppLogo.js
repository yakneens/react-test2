/**
 * React Static Boilerplate
 * Copyright (c) 2015-present Kriasoft. All rights reserved.
 */

/* @flow */

import React from 'react';
import styled from 'styled-components';

const color = '#00d8ff';

const Circle = styled('circle')`fill: ${color};`;

const Path = styled('path')`
  fill: none;
  stroke: ${color};
  stroke-width: 144.7456;
  stroke-miterlimit: 10;
`;

class AppLogo extends React.Component {
  render() {
    return (
      <img
        src={this.props.img_src}
        className={this.props.className}
        alt="Logo"
      />
    );
  }
}

export default AppLogo;
