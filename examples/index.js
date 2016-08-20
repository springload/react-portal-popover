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
      <a href="//developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Techniques/Using_the_dialog_role">A focusable child element.</a>
    </ToolTip>
  );

  const toolTipTop = (
    <ToolTip position={'top'} options={options}>
      <p>My tooltip content</p>
    </ToolTip>
  );

  const toolTipRight = (
    <ToolTip position={'right'} options={options}>
      <p>My tooltip content</p>
      <p>My tooltip content</p>
      <p>My tooltip content</p>
    </ToolTip>
  );

  const leftOptions = Object.assign({}, options, { size: 5 });

  const toolTipLeft = (
    <ToolTip position={'left'} options={leftOptions}>
      <p>My tooltip content</p>
      <p>My tooltip content</p>
      <p>My tooltip content</p>
    </ToolTip>
  );

  const right = {
    position: 'absolute',
    right: '20px',
    top: '20px',
  };

  const left = {
    position: 'absolute',
    left: '20px',
    top: '20px',
  };

  const bottomRight = {
    position: 'absolute',
    bottom: '20px',
    right: '20px',
  };

  const bottomLeft = {
    position: 'absolute',
    bottom: '20px',
    left: '20px',
  };

  const topMiddle = {
    position: 'absolute',
    textAlign: 'center',
    top: '20px',
    left: '50%',
    marginLeft: '-75px',
    width: '200px',
  };

  const bottomMiddle = {
    position: 'absolute',
    textAlign: 'center',
    bottom: '20px',
    left: '50%',
    marginLeft: '-75px',
    width: '200px',
  };

  return (
    <div>
      <div style={left}>
        <OverlayTrigger closeOnScroll={true} overlay={toolTip} label={'Excerpt'} showLabel={'Show'} hideLabel={'Hide'}>
          <button>Toggle</button>
        </OverlayTrigger>
      </div>

      <div style={topMiddle} className='inline-blocks'>
        <OverlayTrigger closeOnScroll={true} overlay={toolTip} label={'Excerpt'} showLabel={'Show'} hideLabel={'Hide'}>
          <button>Toggle</button>
        </OverlayTrigger>
        <OverlayTrigger closeOnScroll={true} overlay={toolTipTop} label={'Excerpt'} showLabel={'Show'} hideLabel={'Hide'}>
          <button>Toggle</button>
        </OverlayTrigger>
      </div>

      <div style={right}>
        <OverlayTrigger  closeOnScroll={true} overlay={toolTip} label={'Excerpt'} showLabel={'Show'} hideLabel={'Hide'}>
          <button>Toggle</button>
        </OverlayTrigger>
      </div>
      <div style={bottomLeft}>
        <OverlayTrigger closeOnScroll={true} overlay={toolTipRight} label={'Excerpt'} showLabel={'Show'} hideLabel={'Hide'}>
          <button>Toggle</button>
        </OverlayTrigger>
        <br />
        <OverlayTrigger closeOnScroll={true} overlay={toolTipLeft} label={'Excerpt'} showLabel={'Show'} hideLabel={'Hide'}>
          <button>Toggle</button>
        </OverlayTrigger>
      </div>
      <div style={bottomMiddle} className='inline-blocks'>
        <OverlayTrigger closeOnScroll={true} overlay={toolTipTop} label={'Excerpt'} showLabel={'Show'} hideLabel={'Hide'}>
          <button>Toggle</button>
        </OverlayTrigger>
        <OverlayTrigger closeOnScroll={true} overlay={toolTip} label={'Excerpt'} showLabel={'Show'} hideLabel={'Hide'}>
        <button>Toggle</button>
        </OverlayTrigger>
      </div>
      <div style={bottomRight}>
        <OverlayTrigger closeOnScroll={true} overlay={toolTipLeft} label={'Excerpt'} showLabel={'Show'} hideLabel={'Hide'}>
          <button>Toggle</button>
        </OverlayTrigger>
        <br />
        <OverlayTrigger closeOnScroll={true} overlay={toolTipRight} label={'Excerpt'} showLabel={'Show'} hideLabel={'Hide'}>
          <button>Toggle</button>
        </OverlayTrigger>
      </div>
    </div>
  );
};

MyComponent.propTypes = {};


const mount = document.getElementById('root');
ReactDOM.render(<MyComponent />, mount);
