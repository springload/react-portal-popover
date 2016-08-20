/* eslint-disable */
import React from 'react';
import sinon from 'sinon';
import { expect } from 'chai';
import { shallow, mount, render } from 'enzyme';
import PositionProvider from '../src/components/PositionProvider';


const rectstub = { bottom: 0, height: 0, left: 0, right: 0, top: 0, width: 0 };

const offset = {
  rect: rectstub,
  scrollTop: 0,
  scrollLeft: 0
};

const options = {

};

describe('PositionProvider', () => {
  it('Should exist', () => {
    expect(PositionProvider).to.exist;
  });

  it('Should render a div', () => {
    expect(shallow(<PositionProvider options={options} />).type()).to.equal('div');
  });

  it('Should set aria-labelledby', () => {
    expect(shallow(<PositionProvider options={options} id={'foo'} />).find('[role="tooltip"]').prop('aria-labelledby')).to.equal('label_for_foo');
  });

  it('Should set position absolute', () => {
    expect(shallow(<PositionProvider options={options} />).prop('style')).to.deep.equal({ position: 'absolute' });
  });

  it('Should set onClick function', () => {
    expect(shallow(<PositionProvider options={options} />).prop('onClick')).to.be.a('function');
  });

  describe('@getStyle', () => {
    it('Should call the getBottom method when position == bottom', () => {
      const trigger = document.createElement('div');
      const el = document.createElement('div');
      const wrapper = shallow(<PositionProvider options={options} position={'bottom'} target={trigger} />);
      const inst = wrapper.instance();
      inst.el = el;
      sinon.spy(inst, 'getBottom');
      inst.getStyle();
      expect(inst.getBottom.called).to.equal(true);
      inst.getBottom.restore();
    });

    it('Should return a coordinate object that is offset by default SIZE and DEFAULT_ARROW_MARGIN', () => {
      const trigger = document.createElement('div');
      const el = document.createElement('div');
      const wrapper = shallow(<PositionProvider options={options} position={'bottom'} target={trigger} />);
      const inst = wrapper.instance();
      inst.el = el;
      expect(inst.getStyle()).to.deep.equal({
        left: -10,
        top: -9,
        arrowLeft: 0,
        nextPosition: 'top'
      });
    });

    it('Should respect custom arrowSize + arrowOffset', () => {
      const trigger = document.createElement('div');
      const el = document.createElement('div');
      const wrapper = shallow(<PositionProvider options={options} arrowSize={12} arrowOffset={24} position={'bottom'} target={trigger} />);
      const inst = wrapper.instance();
      inst.el = el;
      expect(inst.getStyle()).to.deep.equal({
        left: -10,
        top: -36,
        arrowLeft: 0,
        nextPosition: 'top'
      });
    });

    it('Should work with horizontal/negative offsets', () => {
      const trigger = document.createElement('div');
      const el = document.createElement('div');
      const wrapper = shallow(<PositionProvider options={options} arrowSize={12} arrowOffset={24} position={'left'} target={trigger} />);
      const inst = wrapper.instance();
      inst.el = el;
      expect(inst.getStyle()).to.deep.equal({
        left: 36,
        top: 758,
        arrowBottom: 0,
        nextPosition: 'right'
      });
    });
  });

  it('should prevent event propagation when clicked', () => {
    const trigger = document.createElement('div');
    const el = document.createElement('div');
    const wrapper = shallow(<PositionProvider options={options} arrowSize={12} arrowOffset={24} position={'left'} target={trigger} />);
    const inst = wrapper.instance();
    inst.el = el;

    const mockEvent = {
      stopPropagation: sinon.spy(),
      nativeEvent: {
        stopImmediatePropagation: sinon.spy(),
      },
    };

    wrapper.props().onClick(mockEvent);
    expect(mockEvent.stopPropagation.called).to.equal(true);
    expect(mockEvent.nativeEvent.stopImmediatePropagation.called).to.equal(true);
  });



  describe('@positionElement', () => {
    it('should be called on componentDidUpdate and componentDidMount', () => {
      const trigger = document.createElement('div');
      const el = document.createElement('div');
      const wrapper = shallow(<PositionProvider options={options} arrowSize={12} arrowOffset={24} position={'left'} target={trigger} />);
      const inst = wrapper.instance();
      inst.el = el;

      sinon.spy(inst, 'positionElement');
      inst.componentDidUpdate();
      inst.componentDidMount();
      expect(inst.positionElement.called).to.equal(true);
    });
    it('Should set the style of the referenced element', () => {
      const trigger = document.createElement('div');
      const el = document.createElement('div');
      const wrapper = shallow(<PositionProvider options={options} arrowSize={12} arrowOffset={24} position={'left'} target={trigger} />);
      const inst = wrapper.instance();
      inst.el = el;
      inst.positionElement({ left: 0, top: 0 });
      expect(inst.el.style.left).to.equal('0px');
      expect(inst.el.style.top).to.equal('0px');
    });
  });


  describe('@getTop', () => {
    it('Should return a coordinate object', () => {
      const trigger = document.createElement('div');
      const wrapper = shallow(<PositionProvider options={options} position={'left'} target={trigger} />);
      const inst = wrapper.instance();

      expect(inst.getTop(offset.rect, rectstub)).to.deep.equal({
        left: -10,
        top: -9,
        arrowLeft: 0,
      });
    });
  });

  describe('@getBottom', () => {
    it('Should return a coordinate object', () => {
      const trigger = document.createElement('div');
      const wrapper = shallow(<PositionProvider options={options} position={'left'} target={trigger} />);
      const inst = wrapper.instance();
      expect(inst.getBottom(offset.rect, rectstub)).to.deep.equal({
        left: -10,
        top: 9,
        arrowLeft: 0,
      });
    });
  });

  describe('@getLeft', () => {
    it('Should return a coordinate object', () => {
      const trigger = document.createElement('div');
      const wrapper = shallow(<PositionProvider options={options} position={'left'} target={trigger} />);
      const inst = wrapper.instance();
      expect(inst.getLeft(offset.rect, rectstub)).to.deep.equal({
        left: -9,
        top: 758,
        arrowBottom: 0,
      });
    });
  });

  describe('@getRight', () => {
    it('Should return a coordinate object', () => {
      const trigger = document.createElement('div');
      const wrapper = shallow(<PositionProvider options={options} position={'left'} target={trigger} />);
      const inst = wrapper.instance();
      expect(inst.getRight(offset.rect, rectstub)).to.deep.equal({
        left: 9,
        top: 758,
        arrowBottom: 0,
      });
    });
  });

  describe('@getArrow', () => {
    it('Should get the size of the arrow + the offset', () => {
      const trigger = document.createElement('div');
      const wrapper = shallow(<PositionProvider options={options} position={'left'} target={trigger} />);
      const inst = wrapper.instance();
      expect(inst.getArrow()).to.equal(9);
    });

    it('Should get the size of the arrow + the offset', () => {
      const trigger = document.createElement('div');
      const wrapper = shallow(<PositionProvider options={options} arrowSize={0} arrowOffset={0} position={'left'} target={trigger} />);
      const inst = wrapper.instance();
      expect(inst.getArrow()).to.equal(0);
    });
  });
});
