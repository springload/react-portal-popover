/* eslint-disable */
import React from 'react';
import sinon from 'sinon';
import { expect } from 'chai';
import { shallow, mount, render } from 'enzyme';
import PositionProvider from '../src/components/PositionProvider';


describe('PositionProvider', () => {
  it('Should exist', () => {
    expect(PositionProvider).to.exist;
  });

  it('Should render a div', () => {
    expect(shallow(<PositionProvider />).type()).to.equal('div');
  });

  it('Should set aria-describedby', () => {
    expect(shallow(<PositionProvider />).prop('aria-describedby')).to.equal('');
  });

  it('Should set aria-label', () => {
    expect(shallow(<PositionProvider />).prop('aria-label')).to.equal('');
  });

  it('Should set onClick function', () => {
    expect(shallow(<PositionProvider />).prop('onClick')).to.be.a('function');
  });
});
