/* eslint-disable */
import React from 'react';
import sinon from 'sinon';
import { expect } from 'chai';
import { shallow, mount, render } from 'enzyme';
import ToolTip from '../src/components/ToolTip';


describe('ToolTip', () => {
  it('Should exist', () => {
    expect(ToolTip).to.exist;
  });

  it('Should render a div', () => {
    expect(shallow(<ToolTip />).type()).to.equal('div');
  });
});
