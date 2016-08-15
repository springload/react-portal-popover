import React from 'react';
import Portal from 'react-portal';

import PositionProvider from './PositionProvider';

import {
  SIZE,
  FOREGROUND,
  BORDER_COLOUR,
  POSITION,
  BORDER_WIDTH,
  USE_FOREGROUND,
  CLASS_BASE,
  DEFAULT_ARROW_MARGIN,
} from '../constants';

const ToolTip = (props) => {
  const defaults = {
    classBase: CLASS_BASE,
    className: '',
    size: SIZE,
    offset: DEFAULT_ARROW_MARGIN,
    foregroundColor: FOREGROUND,
    color: BORDER_COLOUR,
    position: props.position || POSITION,
    borderWidth: BORDER_WIDTH,
    useForeground: USE_FOREGROUND,
  };

  const options = Object.assign({}, defaults, props.options);
  const classes = `${options.classBase} ${options.classBase}--${options.position} ${options.className}`;

  const style = {};

  if (props.readonly) {
    style.cursor = 'default';
  }

  return (<div>
    <Portal
      closeOnEsc
      closeOnOutsideClick
      isOpened={props.isOpened}
      onClose={props.onClose}
    >
      <PositionProvider
        position={options.position}
        label={props.label}
        id={props.id}
        arrowSize={options.size}
        arrowOffset={options.offset}
        target={props.trigger}
        options={options}
      >
        <div className={classes} style={style}>
          {props.children}
        </div>
      </PositionProvider>
    </Portal>
  </div>);
};

ToolTip.propTypes = {
  isOpened: React.PropTypes.bool,
  readonly: React.PropTypes.bool,
  small: React.PropTypes.bool,
  onClose: React.PropTypes.func,
  trigger: React.PropTypes.object,
  id: React.PropTypes.string,
  children: React.PropTypes.node,
  label: React.PropTypes.string,
  position: React.PropTypes.string,
  size: React.PropTypes.number,
  options: React.PropTypes.object,
};

export default ToolTip;
