import React from 'react';
import { Link } from 'react-router-dom';

// The Header creates links that can be used to navigate
// between routes.
const Header = () => (
  <header>
    &nbsp;
    <Link to='/'>Home</Link>&nbsp;|&nbsp;
    <Link to='/regionalrail'>Regional Rail</Link>&nbsp;|&nbsp;
    <Link to='/bus_trolley'>Bus/Trolley</Link>
  </header>
)

export default Header;
