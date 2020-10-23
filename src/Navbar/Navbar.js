
import React from "react";
import { RiVirusLine } from "react-icons/ri";

import {
  Navbar,
  Container,
  Nav,
  NavbarBrand,
  NavLink,
  NavMenu,
  NavItem
} from "reactstrap";

export default () => {
  return (
    <Container fluid style={{borderBottom: "1px solid #82ca9d"}}>
      <Nav>
        <NavbarBrand style={{fontSize: "1.5rem"}}className="text-dark d-flex align-items-center">
          {'<'} 
          <RiVirusLine color="green" />Covid-19 Statistics
          {'/>'}
        </NavbarBrand>
      </Nav>
    </Container>
  )
}