import React from "react";
import { RiVirusLine } from "react-icons/ri";

import { Container, Nav, NavbarBrand } from "reactstrap";

export default () => {
  return (
    <Container
      className="py-2"
      fluid
      style={{ borderBottom: "1px solid #82ca9d" }}
    >
      <Nav>
        <NavbarBrand
          tag="a"
          href=""
          style={{ fontSize: "1.5rem" }}
          className="text-dark d-flex align-items-center"
        >
          {"<"}
          <RiVirusLine color="green" />
          Covid-19 Statistics
          {"/>"}
        </NavbarBrand>
      </Nav>
    </Container>
  );
};
