import React from 'react';
import Button from '../Button/Button';

import './Header.css';

const Header = props => {

  const clearCacheData = () => {
    localStorage.clear();
    window.location.reload(true)
  };
  
  return (
    <header className="header">
      <h1>MERN Shop</h1>
      <div>
        <Button onClick={() => clearCacheData()}>Logout</Button>  
      </div>
    </header>
  );
};

export default Header;
