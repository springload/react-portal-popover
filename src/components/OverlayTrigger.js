import React from 'react';
import shortid from 'shortid';


class OverlayTrigger extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      id: shortid.generate(),
    };
    this.toggleOverlay = this.toggleOverlay.bind(this);
    this.onClose = this.onClose.bind(this);
    this.addCloseHandler = this.addCloseHandler.bind(this);
    this.removeCloseHandler = this.removeCloseHandler.bind(this);
    this.onClickOutside = this.onClickOutside.bind(this);
    this.accessibleLabel = this.accessibleLabel.bind(this);
  }

  addCloseHandler() {
    document.addEventListener('click', this.onClickOutside);
  }

  removeCloseHandler() {
    document.removeEventListener('click', this.onClickOutside);
  }

  toggleOverlay() {
    this.setState({
      open: !this.state.open,
    }, () => {
      if (this.state.open) {
        this.addCloseHandler();
      } else {
        this.removeCloseHandler();
      }
    });
  }

  onClose() {
    // Prevent race with toggleOverlay
    setTimeout(() => {
      this.setState({
        open: false,
      }, () => {
        this.removeCloseHandler();
      });
    }, 0);
  }

  onClickOutside() {
    this.setState({
      open: false,
    });
  }

  accessibleLabel(children) {
    if (this.props.showLabel && this.props.hideLabel) {
      const label = (
        <span className="u-accessible">
          {this.state.open ? this.props.hideLabel : this.props.showLabel}
        </span>
      );
      return [label, children];
    }
    return children;
  }

  render() {
    const { children } = this.props;

    if (!children || !this.props.overlay) {
      return <span />;
    }

    const triggerId = children.id || `trigger_${this.state.id}`;

    const trigger = React.cloneElement(children, {
      onClick: this.toggleOverlay,
      'aria-controls': this.state.id,
      'aria-owns': this.state.id,
      'aria-expanded': this.state.open,
      'aria-haspopup': true,
      id: triggerId,
      children: this.accessibleLabel(children.props.children),
      ref: (ref) => { this.trigger = ref; },
    });

    const overlay = React.cloneElement(this.props.overlay, {
      trigger: this.trigger || null,
      isOpened: this.state.open,
      onClose: this.onClose,
      id: triggerId,
      label: this.props.label || '',
    });

    return (
      <span>
        {trigger}
        {overlay}
      </span>
    );
  }
}

OverlayTrigger.propTypes = {
  children: React.PropTypes.element.isRequired,
  overlay: React.PropTypes.object.isRequired,
  hideLabel: React.PropTypes.string,
  showLabel: React.PropTypes.string,
  label: React.PropTypes.string,
};

export default OverlayTrigger;
