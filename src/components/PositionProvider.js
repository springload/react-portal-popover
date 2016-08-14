import React from 'react';
import { DEFAULT_ARROW_MARGIN, POSITION } from '../constants';


class PositionProvider extends React.Component {
  constructor(props) {
    super(props);
    this.getOffset = this.getOffset.bind(this);
    this.getStyle = this.getStyle.bind(this);
    this.positionElement = this.positionElement.bind(this);
    this.positionElement = this.positionElement.bind(this);
    this.getBottom = this.getBottom.bind(this);
    this.getTop = this.getTop.bind(this);
    this.getLeft = this.getLeft.bind(this);
    this.getRight = this.getRight.bind(this);
  }

  getOffset(node) {
    return {
      rect: node.getBoundingClientRect(),
      scrollTop: document.body.scrollTop,
      scrollLeft: document.body.scrollLeft,
    };
  }

  positionElement() {
    const nextStyle = this.getStyle();
    this.el.style.top = nextStyle.top;
    this.el.style.left = nextStyle.left;
  }

  componentDidMount() {
    this.positionElement();
  }

  componentDidUpdate() {
    this.positionElement();
  }

  getArrow() {
    const { arrowSize, arrowMargin } = this.props;
    return arrowSize + (arrowMargin || DEFAULT_ARROW_MARGIN);
  }

  getTop(offset, elementRect) {
    const { rect, scrollTop, scrollLeft } = offset;
    return {
      left: `${rect.left + scrollLeft + (-elementRect.width / 2) + (rect.width / 2)}px`,
      top: `${rect.top + scrollTop + (-this.getArrow()) + (-elementRect.height)}px`,
    };
  }

  getBottom(offset, elementRect) {
    const { rect, scrollTop, scrollLeft } = offset;
    return {
      left: `${rect.left + scrollLeft + (-elementRect.width / 2) + (rect.width / 2)}px`,
      top: `${rect.bottom + scrollTop + (this.getArrow())}px`,
    };
  }

  getLeft(offset, elementRect) {
    const { rect, scrollTop, scrollLeft } = offset;
    return {
      left: `${rect.left + scrollLeft + (-elementRect.width) + (-this.getArrow())}px`,
      top: `${rect.top + scrollTop + (-elementRect.height / 2) + (rect.height / 2)}px`,
    };
  }

  getRight(offset, elementRect) {
    const { rect, scrollTop, scrollLeft } = offset;
    return {
      left: `${rect.right + scrollLeft + (this.getArrow())}px`,
      top: `${rect.top + scrollTop + (-elementRect.height / 2) + (rect.height / 2)}px`,
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
  arrowMargin: React.PropTypes.number,
};

export default PositionProvider;
