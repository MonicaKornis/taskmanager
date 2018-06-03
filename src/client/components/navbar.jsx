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
const Navbar = ({ filterBy, onClickFilter, active, complete, completeAll, toggleModal }) => {
  /**
   * Base CSS class
   */
  const baseCls = 'navbar';

  let activeLinkCls = `${baseCls}__item navbar-active`;
  activeLinkCls += filterBy === 'active' ? ` ${baseCls}__item--active` : '';

  let completedLinkCls = `${baseCls}__item navbar-completed`;
  completedLinkCls += filterBy === 'completed' ? ` ${baseCls}__item--active` : '';

  let activeItems = `  ${active} Active`;

  let completedItems = `   ${complete} Completed    `;


  return (
    <div>
      <nav className={baseCls}>
        <div className='navbar-all'>
          <Link
            to="/"
            activeClassName={`${baseCls}__item--active`}
            className={`${baseCls}__item`}
            onClick={() => onClickFilter('')}
          >
            All
          </Link>
        </div>
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
        <span
          className={completedLinkCls + ` navbar-archived`}
          onClick={() => onClickFilter('archived')}
        >
        Archived
        </span>
      </nav>
      <nav className={baseCls + '__two'}>
        <span onClick={() => completeAll()}
          className='navbar__item navbar-complete-all'>
          Complete All
        </span>
        <span onClick={() => toggleModal()}
          className='navbar__item navbar-complete-all'>
          Progress Tracker
        </span>
      </nav>
  </div>
  );
};

Navbar.propTypes = propTypes;
Navbar.defaultProps = defaultProps;

export default Navbar;
