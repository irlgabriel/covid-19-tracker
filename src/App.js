import React, { useState, useEffect } from 'react';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { RiVirusLine } from "react-icons/ri";

import { Container } from "reactstrap";
import CountryForm from "./Form/Form";
import Chart from "./Chart/Chart";
function App() {
  const [countryData, setCountryData] = useState({})
  const [worldData, setWorldData] = useState({})

  useEffect(() => {
    // Get WORLD Data
    fetch("https://rapidapi.p.rapidapi.com/report/totals?date=2020-07-21", {
      "method": "GET",
      "headers": {
        "x-rapidapi-host": "covid-19-data.p.rapidapi.com",
        "x-rapidapi-key": "d89eb58edamsh10814d1e692895ep158751jsn8a8b4c01281a"
      }
    })
    .then(response => {
      response.json()
        .then(res => setWorldData(res))
    })
    .catch(err => {
      console.error(err);
    });


  }, [])

  return (
    <Container style={{minHeight: "100vh"}} className="bg-light" fluid>
      <h2 className="justify-content-center d-flex align-items-center">
      <RiVirusLine color="green" />
      <span>Covid-19 Tracker</span>
      </h2>
      <CountryForm data={countryData} setData={setCountryData} />
      {worldData.length && <Chart data={worldData} />}
      {countryData.length && <Chart data={countryData} />}
    </Container>
  );
}

export default App;
