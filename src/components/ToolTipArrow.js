import React from 'react';
import { capitalize } from '../utils';
import { POSITION } from '../constants';


const ToolTipArrow = (props) => {
  const {
    position,
    size,
    color,
    foregroundColor,
    borderWidth,
  } = props.options;

  const positions = {
    right: { minorAxis: 'right', majorAxis: 'bottom' },
    left: { minorAxis: 'left', majorAxis: 'bottom' },
    bottom: { minorAxis: 'bottom', majorAxis: 'left' },
    top: { minorAxis: 'top', majorAxis: 'left' },
  };

  const { minorAxis, majorAxis } = positions[position || POSITION];

  const positionProp = capitalize(position);
  const marginProp = capitalize(majorAxis);

  const style = {
    position: 'absolute',
    display: 'block',
    border: `solid ${size}px transparent`,
    [majorAxis]: '50%',
    [minorAxis]: '100%',
    [`margin${marginProp}`]: `-${size}px`,
    [`border${positionProp}Color`]: props.foreground ? foregroundColor : color,
  };

  if (props.foreground) {
    style[`margin${positionProp}`] = `-${borderWidth}px`;
  }

  return <span data-tooltip-arrow style={style} />;
};

ToolTipArrow.propTypes = {
  options: React.PropTypes.object,
  foreground: React.PropTypes.bool,
};

export default ToolTipArrow;
