import React from 'react';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { RiVirusLine } from "react-icons/ri"

import { Container } from "reactstrap";
import CountryForm from "./Form/Form"
function App() {
  return (
    <Container style={{minHeight: "100vh"}} className="bg-light" fluid>
      <h2 className="justify-content-center d-flex align-items-center">
      <RiVirusLine color="green" />
      <span>Covid-19 Tracker</span>
      </h2>
      <CountryForm />
    </Container>
  );
}

export default App;
