import React from 'react';
import ToolTip from '../src/components/ToolTip';
import OverlayTrigger from '../src/components/OverlayTrigger';


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

MyComponent.propTypes = {};
