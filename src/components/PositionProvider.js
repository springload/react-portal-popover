import React from 'react';
import ToolTipArrow from './ToolTipArrow';

import { DEFAULT_ARROW_MARGIN, POSITION, SIZE, BOUNDARY } from '../constants';

// TODO: Make all these functional boundary tests pure (eg, no document/window);

const exceedsRightBound = (left, elementRect, scrollLeft, boundary = BOUNDARY) => {
  const bodyRect = document.body.getBoundingClientRect();
  return left + elementRect.width >= scrollLeft + bodyRect.width + (-boundary);
};

const exceedsLeftBound = (left, scrollLeft, boundary = BOUNDARY) => {
  return left <= scrollLeft - boundary;
};

const exceedsBottomBound = (top, elementRect, boundary = BOUNDARY) => {
  const bottomBound = window.innerHeight + document.body.scrollTop || 0;
  return top + elementRect.height >= bottomBound - boundary;
};

const exceedsTopBound = (top,  boundary = BOUNDARY) => {
  return top <= (document.body.scrollTop || 0) - boundary;
};


const clampHorizontal = (rect, elementRect, left, boundary = BOUNDARY) => {
  const bodyRect = document.body.getBoundingClientRect();
  const scrollLeft = document.body.scrollLeft || 0;
  let arrowLeft = 0;
  let nextLeft = left;

  if (exceedsLeftBound(left, scrollLeft, boundary)) {
    nextLeft = scrollLeft + boundary;
    arrowLeft = (rect.width / 2);
  } else if (exceedsRightBound(left, elementRect, scrollLeft, boundary)) {
    nextLeft = (scrollLeft + bodyRect.width) - elementRect.width - boundary;
    arrowLeft = elementRect.width - (rect.width / 2);
  }

  // console.log(left);

  return { nextLeft, arrowLeft };
};


const clampVertical = (rect, elementRect, top, boundary = BOUNDARY) => {
  const bodyRect = {
    top: document.body.scrollTop || 0,
    bottom: window.innerHeight || 0,
  };

  let arrowBottom = 0;
  let nextTop = top;

  if (exceedsTopBound(top, boundary)) {
    nextTop = boundary + bodyRect.top;
    arrowBottom = (rect.height / 2);
  } else if (exceedsBottomBound(top, elementRect, boundary)) {
    nextTop = bodyRect.bottom - elementRect.height - (rect.height / 2) - boundary;
    arrowBottom = (rect.height / 2);
  }
  // console.log(top);

  return { nextTop, arrowBottom };
};

const computeLeft = (rect, elementRect, scrollLeft) => {
  const left = (rect.left || 0) + scrollLeft + (-elementRect.width / 2) + (rect.width / 2);
  return left;
};


const computeTop = (rect, elementRect, scrollTop) => {
  return rect.top + scrollTop + (rect.height / 2) + (-elementRect.height / 2);
};


class PositionProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nextStyle: {},
    };
    this.getStyle = this.getStyle.bind(this);
    this.positionElement = this.positionElement.bind(this);
    this.getBottom = this.getBottom.bind(this);
    this.getTop = this.getTop.bind(this);
    this.getLeft = this.getLeft.bind(this);
    this.getRight = this.getRight.bind(this);
  }

  positionElement(nextStyle) {
    if (!this.el) {
      return;
    }

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

    // Bite me, eslint.
    /* eslint-disable react/no-did-mount-set-state */
    this.setState({
      nextStyle: this.getStyle(),
    });
  }

  componentDidUpdate() {
    this.positionElement(this.getStyle());
  }

  getArrow() {
    const { arrowSize = SIZE, arrowOffset } = this.props;
    return arrowSize + (typeof arrowOffset !== 'undefined' ? arrowOffset : DEFAULT_ARROW_MARGIN);
  }

  getTop(rect, elementRect, scrollTop = 0, scrollLeft = 0) {
    const left = computeLeft(rect, elementRect, scrollLeft);
    const { nextLeft, arrowLeft } = clampHorizontal(rect, elementRect, left, this.props.boundary);

    return {
      left: nextLeft,
      top: rect.top + scrollTop + (-this.getArrow()) + (-elementRect.height),
      arrowLeft,
    };
  }

  getBottom(rect, elementRect, scrollTop = 0, scrollLeft = 0) {
    const left = computeLeft(rect, elementRect, scrollLeft);
    const { nextLeft, arrowLeft } = clampHorizontal(rect, elementRect, left, this.props.boundary);

    return {
      left: nextLeft,
      top: rect.bottom + scrollTop + (this.getArrow()),
      arrowLeft,
    };
  }

  getLeft(rect, elementRect, scrollTop = 0, scrollLeft = 0) {
    const top = computeTop(rect, elementRect, scrollTop);
    const { nextTop, arrowBottom } = clampVertical(rect, elementRect, top, this.props.boundary);

    return {
      left: rect.left + scrollLeft + (-elementRect.width) + (-this.getArrow()),
      top: nextTop,
      arrowBottom,
    };
  }

  getRight(rect, elementRect, scrollTop = 0, scrollLeft = 0) {
    const top = computeTop(rect, elementRect, scrollTop);
    const { nextTop, arrowBottom } = clampVertical(rect, elementRect, top, this.props.boundary);

    return {
      left: rect.right + scrollLeft + (this.getArrow()),
      top: nextTop,
      arrowBottom,
    };
  }

  determineNextPosition(result, position, elementRect, scrollTop, scrollLeft, boundary) {
    if (position === 'top') {
      if (exceedsTopBound(result.top, scrollTop, boundary)) {
        return 'bottom';
      }
    } else if (position === 'bottom') {
      if (exceedsBottomBound(result.top, elementRect, boundary)) {
        return 'top';
      }
    } else if (position === 'left') {
      if (exceedsLeftBound(result.left, scrollLeft, boundary)) {
        return 'right';
      }
    } else if (position === 'right') {
      if (exceedsRightBound(result.left, elementRect, scrollLeft, boundary)) {
        return 'left';
      }
    }
    return null;
  }

  getStyle() {
    const { target, position } = this.props;

    const rect = target ? target.getBoundingClientRect() : { left: 0, top: 0 };
    const scrollTop = document.body.scrollTop || 0;
    const scrollLeft =  document.body.scrollLeft || 0;

    const positionWithDefault = position || POSITION;

    if (!rect) {
      return { left: 0, top: 0 };
    }

    const elementRect = this.el ? this.el.getBoundingClientRect() : { left: 0, top: 0 };
    const methods = {
      bottom: this.getBottom,
      top: this.getTop,
      left: this.getLeft,
      right: this.getRight,
    };

    // Try to give the user what they wanted.
    let result = methods[positionWithDefault](rect, elementRect, scrollTop, scrollLeft);
    const nextPosition = this.determineNextPosition(
      result,
      positionWithDefault,
      elementRect,
      scrollTop,
      scrollLeft,
      this.props.boundary
    );

    // Otherwise, give them what they need.
    if (nextPosition) {
      result = methods[nextPosition](rect, elementRect, scrollTop, scrollLeft);
      result.nextPosition = nextPosition;
    }

    return result;
  }

  render() {
    const { children, id, label, target, options } = this.props;
    const nextStyle = this.state.nextStyle;
    let nextOptions = options;

    const onClick = (e) => {
      e.stopPropagation();
      e.nativeEvent.stopImmediatePropagation();
    };

    const style = { position: 'absolute' };

    if (nextStyle.nextPosition) {
      nextOptions = Object.assign({}, options, { position: nextStyle.nextPosition });
    }

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
        <ToolTipArrow options={nextOptions} />
        { nextOptions.useForeground ?
          <ToolTipArrow options={nextOptions} foreground={true} /> : null}
        {children}
      </div>
    );
  }
}

PositionProvider.propTypes = {
  children: React.PropTypes.node,
  target: React.PropTypes.object,
  options: React.PropTypes.object,
  position: React.PropTypes.string,
  id: React.PropTypes.string,
  label: React.PropTypes.string,
  arrowSize: React.PropTypes.number,
  arrowOffset: React.PropTypes.number,
  boundary: React.PropTypes.number,
};

export default PositionProvider;
