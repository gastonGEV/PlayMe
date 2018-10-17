import React, { Component } from 'react';
import { Navbar, NavbarBrand } from 'reactstrap';
import '../css/Nav.scss';
class Nav extends Component {
  render() {
    return (
      <Navbar color="dark">
        <NavbarBrand href="/">PlayMe</NavbarBrand>
      </Navbar>
    );
  }
} 

export default Nav;