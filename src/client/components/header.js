import React from 'react';
import { Link } from 'react-router';

/**
 * Header component
 */
const Header = () => {
  /**
   * Base CSS class
   * @returns {ReactElement}
   */
  const baseCls = 'header';

  return (
    <div className={baseCls}>
      <header className='mainHeader'>
        <img src='https://loading.io/s/icon/lw55te.png'/><Link className='headerTitle' to="/">TaskManager</Link>
      </header>
    </div>
  );
};

export default Header;
