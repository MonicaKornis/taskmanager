import React from 'react';

const noop = () => {};

/**
 * Prop Types
 * @private
 */
const propTypes = {
  onClick: React.PropTypes.func,
  text: React.PropTypes.string,
  line: React.PropTypes.string,
};

/**
 * Default Props
 * @private
 */
const defaultProps = {
  onClick: noop,
  text: '',
  line: ''
};

/**
 * Link component
 * @returns {ReactElement}
 */
const TodoLink = ({ text, onClick, children, line  }) => {
  /**
   * Base CSS class
   */
  const baseCls = 'todo-link' + line;

  return (
    <div className={baseCls} onClick={onClick}>
      {text}
      {children}
    </div>
  );
};

TodoLink.propTypes = propTypes;
TodoLink.defaultProps = defaultProps;

export default TodoLink;
