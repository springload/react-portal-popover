# react-portal-popover [![Build Status](https://travis-ci.org/springload/react-portal-popover.svg?branch=master)](https://travis-ci.org/springload/react-portal-popover)

A popover library for React, using [Portals](https://github.com/tajo/react-portal) for better positioning.

## Installation

```
npm install react-portal-popover
```

## Usage

There's two steps: import the `OverlayTrigger` that decorates your toggle element,
then pass in an `overlay={}` prop with your `ToolTip` that you'd like to display.

```js
import React from 'react';
import { OverlayTrigger }, ToolTip from 'react-portal-popover';

const MyComponent = () => {
  const options = {
    size: 7,
    color: '#999',
    foregroundColor: '#fff',
    className: 'my-special-tooltip',
    useForeground: true,
  };

  const toolTip = (
    <ToolTip position={'bottom'} options={options}>
      <p>My tooltip content</p>
    </ToolTip>
  );

  return (
    <div>
      <OverlayTrigger overlay={toolTip} label={'Excerpt'} showLabel={'Show'} hideLabel={'Hide'}>
        <button>Toggle</button>
      </OverlayTrigger>
    </div>
  );
};
```

## Developing

```
npm install
```

## Running tests

```js
npm test
npm run test:watch
```
