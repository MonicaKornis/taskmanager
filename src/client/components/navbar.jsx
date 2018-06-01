import React from 'react';
import { Link } from 'react-router';

const noop = () => {};

/**
 * Prop Types
 * @private
 */
const propTypes = {
  filterBy: React.PropTypes.string,
  onClickFilter: React.PropTypes.func,
  active: React.PropTypes.number,
  complete: React.PropTypes.number,
  completeAll: React.PropTypes.func
};

/**
 * Default Props
 * @private
 */
const defaultProps = {
  filterBy: '',
  onClickFilter: noop,
};

/**
 * Navbar component
 * @returns {ReactElement}
 */
const Navbar = ({ filterBy, onClickFilter, active, complete, completeAll }) => {
  /**
   * Base CSS class
   */
  const baseCls = 'navbar';

  let activeLinkCls = `${baseCls}__item`;
  activeLinkCls += filterBy === 'active' ? ` ${baseCls}__item--active` : '';

  let completedLinkCls = `${baseCls}__item`;
  completedLinkCls += filterBy === 'completed' ? ` ${baseCls}__item--active` : '';

  let activeItems = `  ${active} Active`;

  let completedItems = `   ${complete} Completed    `;


  return (
    <div className={baseCls}>
      <Link
        to="/"
        activeClassName={`${baseCls}__item--active`}
        className={`${baseCls}__item`}
        onClick={() => onClickFilter('')}
      >
        All
      </Link>
      <span
        className={activeLinkCls}
        onClick={() => onClickFilter('active')}
      >
        {activeItems}
      </span>
      <span
        className={completedLinkCls}
        onClick={() => onClickFilter('completed')}
      >
      {completedItems}
      </span>
      <span onClick={() => completeAll()}>
        Complete All
      </span>
    </div>
  );
};

Navbar.propTypes = propTypes;
Navbar.defaultProps = defaultProps;

export default Navbar;
