/* eslint-disable */
import React from 'react';
import sinon from 'sinon';
import { expect } from 'chai';
import { shallow, mount, render } from 'enzyme';
import OverlayTrigger from '../src/components/OverlayTrigger';


describe('OverlayTrigger', () => {
  it('Should exist', () => {
    expect(OverlayTrigger).to.exist;
  });

  it('Should render empty span if no children are passed', () => {
    expect(shallow(<OverlayTrigger />).equals(<span />)).to.equal(true);
  });

  it('Should render empty span if no overlay is passed', () => {
    const node = <OverlayTrigger><button>Foo</button></OverlayTrigger>;
    expect(shallow(node).equals(<span />)).to.equal(true);
  });

  it('Should render two children when trigger and overlay are present', () => {
    const childNode = <div />;
    const node = <OverlayTrigger overlay={childNode}><button>Foo</button></OverlayTrigger>;
    expect(shallow(node).children()).to.have.length(2);
  });

  it('Should render the trigger element first', () => {
    const childNode = <div />;
    const trigger = <button>Foo</button>;
    const node = <OverlayTrigger overlay={childNode}>{trigger}</OverlayTrigger>;
    expect(shallow(node).childAt(0).type()).to.equal('button');
  });

  it('Should add aria attributes to the trigger element', () => {
    const childNode = <div />;
    const trigger = <button>Foo</button>;
    const node = <OverlayTrigger overlay={childNode}>{trigger}</OverlayTrigger>;
    expect(shallow(node).childAt(0).prop('aria-haspopup')).to.equal(true);
    expect(shallow(node).childAt(0).prop('aria-expanded')).to.equal(false);
    expect(shallow(node).childAt(0).prop('aria-controls')).to.exist;
    expect(shallow(node).childAt(0).prop('aria-owns')).to.exist;
  });

  it('Should generate an ID for aria-controls', () => {
    const childNode = <div />;
    const trigger = <button>Foo</button>;
    const node = <OverlayTrigger overlay={childNode}>{trigger}</OverlayTrigger>;

    const rendered = shallow(node);
    const id = rendered.state('id');
    expect(rendered.childAt(0).prop('aria-controls')).to.equal(id);
    expect(rendered.childAt(0).prop('aria-owns')).to.equal(id);
  });

  it('Should assign a trigger_ID to the trigger', () => {
    const childNode = <div />;
    const trigger = <button>Foo</button>;
    const node = <OverlayTrigger overlay={childNode}>{trigger}</OverlayTrigger>;
    const rendered = shallow(node);
    const id = rendered.state('id');
    expect(rendered.childAt(0).prop('id')).to.equal(`trigger_${id}`);
  });

  it('Should not modify the children of the trigger', () => {
    const childNode = <div />;
    const trigger = <button>Foo</button>;
    const node = <OverlayTrigger overlay={childNode}>{trigger}</OverlayTrigger>;
    const rendered = shallow(node);
    expect(rendered.childAt(0).children()).to.have.length(1);
  });

  it('Should prepend a span to the trigger if showLabel/hideLabel are set', () => {
    const childNode = <div />;
    const trigger = <button>Foo</button>;
    const node = <OverlayTrigger showLabel={'Show'} hideLabel={'Hide'} overlay={childNode}>{trigger}</OverlayTrigger>;
    const rendered = shallow(node);
    expect(rendered.childAt(0).children()).to.have.length(2);
  });

  it('Should render the showLabel text if the overlay is hidden', () => {
    const childNode = <div />;
    const trigger = <button>Foo</button>;
    const node = <OverlayTrigger showLabel={'Show'} hideLabel={'Hide'} overlay={childNode}>{trigger}</OverlayTrigger>;
    const rendered = shallow(node);
    expect(rendered.childAt(0).childAt(0).text()).to.equal('Show');
  });

  it('Should render the hideLabel text if the overlay is visible', () => {
    const childNode = <div />;
    const trigger = <button>Foo</button>;
    const node = <OverlayTrigger showLabel={'Show'} hideLabel={'Hide'} overlay={childNode}>{trigger}</OverlayTrigger>;
    const rendered = shallow(node);
    rendered.setState({open: true});
    expect(rendered.childAt(0).childAt(0).text()).to.equal('Hide');
  });

  it('Should add props to the overlay child node', () => {
    const childNode = <div />;
    const trigger = <button>Foo</button>;
    const node = <OverlayTrigger overlay={childNode}>{trigger}</OverlayTrigger>;
    const rendered = shallow(node);
    expect(rendered.childAt(1).prop('trigger')).to.equal(null);
    expect(rendered.childAt(1).prop('isOpened')).to.exist;
    expect(rendered.childAt(1).prop('onClose')).to.exist;
    expect(rendered.childAt(1).prop('id')).to.exist;
    expect(rendered.childAt(1).prop('label')).to.exist;
  });

  describe('@toggleOverlay', () => {
    it('Should toggle open property on this.state', () => {
      const childNode = <div />;
      const trigger = <button>Foo</button>;
      const node = <OverlayTrigger overlay={childNode}>{trigger}</OverlayTrigger>;
      const rendered = shallow(node);
      const inst = rendered.instance();
      expect(rendered.state('open')).to.equal(false);
      inst.toggleOverlay();
      expect(rendered.state('open')).to.equal(true);
    });

    it('Should call addCloseHandler on opening overlay', () => {
      const childNode = <div />;
      const trigger = <button>Foo</button>;
      const node = <OverlayTrigger overlay={childNode}>{trigger}</OverlayTrigger>;
      const rendered = shallow(node);
      const inst = rendered.instance();
      expect(rendered.state('open')).to.equal(false);

      const spy = sinon.spy(inst, 'addCloseHandler')
      inst.toggleOverlay();
      expect(inst.addCloseHandler.called).to.equal(true);
      inst.addCloseHandler.restore();
    });

    it('Should call removeCloseHandler on closing overlay', () => {
      const childNode = <div />;
      const trigger = <button>Foo</button>;
      const node = <OverlayTrigger overlay={childNode}>{trigger}</OverlayTrigger>;
      const rendered = shallow(node);
      const inst = rendered.instance();
      expect(rendered.state('open')).to.equal(false);
      inst.toggleOverlay();
      const spy = sinon.spy(inst, 'removeCloseHandler')
      inst.toggleOverlay();
      expect(inst.removeCloseHandler.called).to.equal(true);
      inst.removeCloseHandler.restore();
    });
  });

  describe('@onClickOutside', () => {
    it('Should setState open to false when clicking outside the overlay', () => {
      const childNode = <div />;
      const trigger = <button>Foo</button>;
      const node = <OverlayTrigger overlay={childNode}>{trigger}</OverlayTrigger>;
      const rendered = shallow(node);
      const inst = rendered.instance();
      inst.toggleOverlay();
      sinon.spy(inst, 'onClickOutside');
      expect(rendered.state('open')).to.equal(true);
      rendered.find('button').simulate('click');
      expect(rendered.state('open')).to.equal(false);
      inst.removeCloseHandler();
      inst.onClickOutside.restore();
    });

    it('Should not be called when clicking inside the overlay', () => {
      const childNode = <div />;
      const trigger = <button>Foo</button>;
      const node = <OverlayTrigger overlay={childNode}>{trigger}</OverlayTrigger>;
      const rendered = shallow(node);
      const inst = rendered.instance();
      inst.toggleOverlay();
      sinon.spy(inst, 'onClickOutside');
      expect(rendered.state('open')).to.equal(true);
      rendered.find('div').simulate('click');
      expect(rendered.state('open')).to.equal(true);
      inst.removeCloseHandler();
      inst.onClickOutside.restore();
    });
  });
});
