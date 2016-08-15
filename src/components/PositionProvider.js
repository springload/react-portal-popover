import React from 'react';
import { DEFAULT_ARROW_MARGIN, POSITION, SIZE } from '../constants';

const BOUNDARY = 10;

const clampHorizontal = (rect, elementRect, left) => {
  const bodyRect = document.body.getBoundingClientRect();
  let arrowLeft;
  let nextLeft = left;

  if (left < 0) {
    nextLeft = BOUNDARY;
    arrowLeft = (rect.width / 2);
  } else if (left + elementRect.width >= bodyRect.right - BOUNDARY) {
    nextLeft = bodyRect.right - elementRect.width - BOUNDARY;
    arrowLeft = elementRect.width - (rect.width / 2);
  }

  return { nextLeft, arrowLeft };
};


const clampVertical = (rect, elementRect, top) => {
  const bodyRect = { top: document.body.scrollTop, bottom: window.innerHeight };
  let arrowBottom;
  let nextTop = top;

  console.log(rect, elementRect, top);

  if (top < 0) {
    nextTop = BOUNDARY;
    arrowBottom = (rect.height / 2);
  } else if (top + elementRect.height >= bodyRect.bottom - BOUNDARY) {
    nextTop = bodyRect.bottom - elementRect.height - (rect.height / 2) - BOUNDARY;
    arrowBottom = (rect.height / 2);
  }

  return { nextTop, arrowBottom };
};

const computeLeft = (rect, elementRect, scrollLeft) => {
  return rect.left + scrollLeft + (-elementRect.width / 2) + (rect.width / 2);
};


const computeTop = (rect, elementRect, scrollTop) => {
  return rect.top + scrollTop + (rect.height / 2) + (-elementRect.height / 2);
};


class PositionProvider extends React.Component {
  constructor(props) {
    super(props);
    this.getOffset = this.getOffset.bind(this);
    this.getStyle = this.getStyle.bind(this);
    this.positionElement = this.positionElement.bind(this);
    this.getBottom = this.getBottom.bind(this);
    this.getTop = this.getTop.bind(this);
    this.getLeft = this.getLeft.bind(this);
    this.getRight = this.getRight.bind(this);
  }

  getOffset(node) {
    return {
      rect: node.getBoundingClientRect(),
      scrollTop: document.body.scrollTop || 0,
      scrollLeft: document.body.scrollLeft || 0,
    };
  }

  positionElement(nextStyle) {
    this.el.style.top = `${nextStyle.top}px`;
    this.el.style.left = `${nextStyle.left}px`;
    const arrows = Array.prototype.slice.call(this.el.querySelectorAll('[data-tooltip-arrow]'));

    arrows.forEach(node => {
      const arrow = node;
      if (nextStyle.arrowLeft) {
        arrow.style.left = `${nextStyle.arrowLeft}px`;
      }
      if (nextStyle.arrowBottom) {
        arrow.style.bottom = `${nextStyle.arrowBottom}px`;
      }
    });
  }

  componentDidMount() {
    this.positionElement(this.getStyle());
  }

  componentDidUpdate() {
    this.positionElement(this.getStyle());
  }

  getArrow() {
    const { arrowSize = SIZE, arrowOffset } = this.props;
    return arrowSize + (typeof arrowOffset !== 'undefined' ? arrowOffset : DEFAULT_ARROW_MARGIN);
  }

  getTop(offset, elementRect) {
    const { rect, scrollTop, scrollLeft } = offset;

    const left = computeLeft(rect, elementRect, scrollLeft);
    const { nextLeft, arrowLeft } = clampHorizontal(rect, elementRect, left);

    return {
      left: nextLeft,
      top: rect.top + scrollTop + (-this.getArrow()) + (-elementRect.height),
      arrowLeft,
    };
  }

  getBottom(offset, elementRect) {
    const { rect, scrollTop, scrollLeft } = offset;

    const left = computeLeft(rect, elementRect, scrollLeft);
    const { nextLeft, arrowLeft } = clampHorizontal(rect, elementRect, left);

    return {
      left: nextLeft,
      top: rect.bottom + scrollTop + (this.getArrow()),
      arrowLeft,
    };
  }

  getLeft(offset, elementRect) {
    const { rect, scrollTop, scrollLeft } = offset;
    const top = computeTop(rect, elementRect, scrollTop);
    const { nextTop, arrowBottom } = clampVertical(rect, elementRect, top);

    return {
      left: rect.left + scrollLeft + (-elementRect.width) + (-this.getArrow()),
      top: nextTop,
      arrowBottom,
    };
  }

  getRight(offset, elementRect) {
    const { rect, scrollTop, scrollLeft } = offset;
    const top = computeTop(rect, elementRect, scrollTop);
    const { nextTop, arrowBottom } = clampVertical(rect, elementRect, top);

    return {
      left: rect.right + scrollLeft + (this.getArrow()),
      top: nextTop,
      arrowBottom,
    };
  }

  getStyle() {
    const { target, position } = this.props;
    const offset = this.getOffset(target);
    const positionWithDefault = position || POSITION;

    if (!offset || !offset.rect) {
      return { left: 0, top: 0 };
    }

    const elementRect = this.el.getBoundingClientRect();
    const methods = {
      bottom: this.getBottom,
      top: this.getTop,
      left: this.getLeft,
      right: this.getRight,
    };

    // The desired method might not actually be the appropriate method.
    // Therefore, we should check if there is sufficient space to execute the
    // desired layout before selecting which method to use.
    // We can then check the bounds and do clamping.

    return methods[positionWithDefault](offset, elementRect);
  }

  render() {
    const { children, id, label, target } = this.props;

    const onClick = (e) => {
      e.stopPropagation();
      e.nativeEvent.stopImmediatePropagation();
    };

    const style = { position: 'absolute' };

    return (
      <div
        id={id}
        aria-hidden={false}
        ref={(node) => { this.el = node; }}
        role="tooltip"
        aria-describedby={target ? target.id : ''}
        onClick={onClick}
        style={style}
        tabIndex="0"
        aria-label={label || ''}
      >
        {children}
      </div>
    );
  }
}

PositionProvider.propTypes = {
  children: React.PropTypes.node,
  target: React.PropTypes.object,
  position: React.PropTypes.string,
  id: React.PropTypes.string,
  label: React.PropTypes.string,
  arrowSize: React.PropTypes.number,
  arrowOffset: React.PropTypes.number,
};

export default PositionProvider;
