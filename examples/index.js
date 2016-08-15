import React from 'react';
import ReactDOM from 'react-dom';
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

  const right = {
    position: 'absolute',
    right: '20px',
    top: '20px',
  };

  return (
    <div>
      <OverlayTrigger closeOnScroll={true} overlay={toolTip} label={'Excerpt'} showLabel={'Show'} hideLabel={'Hide'}>
        <button>Toggle</button>
      </OverlayTrigger>
      <div style={right}>
        <OverlayTrigger  closeOnScroll={true} overlay={toolTip} label={'Excerpt'} showLabel={'Show'} hideLabel={'Hide'}>
          <button>Toggle 2</button>
        </OverlayTrigger>
      </div>
    </div>
  );
};

MyComponent.propTypes = {};


const mount = document.getElementById('root');
ReactDOM.render(<MyComponent />, mount);
