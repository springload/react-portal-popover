/* eslint-disable */
import React from 'react';
import sinon from 'sinon';
import { expect } from 'chai';
import { shallow, mount, render } from 'enzyme';
import ToolTipArrow from '../src/components/ToolTipArrow';


describe('ToolTipArrow', () => {
  it('Should exist', () => {
    expect(ToolTipArrow).to.exist;
  });

  it('Should render a span', () => {
    expect(shallow(<ToolTipArrow options={{}} />).type()).to.equal('span');
  });
});
