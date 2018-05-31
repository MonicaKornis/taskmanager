import React from 'react';

import Header from './header';

/**
 * Prop Types
 * @private
 */
const propTypes = {
  children: React.PropTypes.oneOfType([
    React.PropTypes.arrayOf(React.PropTypes.node),
    React.PropTypes.node
  ]),
};

/**
 * App component
 * @returns {ReactElement}
 */
const App = ({ children }) => {
  /**
   * Base CSS class
   */
  const baseCls = 'app';

  return (
    <div className={baseCls}>
      <Header />

      {children}
    </div>
  );
};

App.propTypes = propTypes;

export default App;
