import React, { useState, useEffect } from 'react';
import './App.scss';
import "bootstrap/dist/css/bootstrap.min.css";
import { 
  Container, 
  Alert
} from "reactstrap";

// Functional comp
import SearchForm from "./Form/Form";
import { BarGraph } from "./Charts/BarChart";
import Navbar from "./Navbar/Navbar";
import { AreaGraph }  from './Charts/AreaChart';

function App() {
  // World data - loaded on page load
  const [worldData, setWorldData] = useState({})

  // Country specific data - loaded upon form submit
  const [countryData, setCountryData] = useState({})
  const [countryCasesData, setCountryCases] = useState({})

  // Flash message states - display errors and notifications 
  const [flash, setFlash] = useState(false)
  const [flashMessage, setMessage] = useState("")


  // PREPROCESS DATA FROM API


  // When FlashMessage state changes it means a new alert needs to be displayed
  useEffect(() => {
    if(flashMessage !== "") setFlash(true); // triggers the next useEffect
  }, [flashMessage])

  // Hide FlashMessage after 3 seconds
  useEffect(() => {
    if(flash) setTimeout(() => {
      setFlash(false)
      setMessage("")
    }, 3000)
  }, [flash])

  useEffect(() => {
    // GET World Data for today
    fetch("https://rapidapi.p.rapidapi.com/totals", {
      "method": "GET",
      "headers": {
        "x-rapidapi-host": "covid-19-data.p.rapidapi.com",
        "x-rapidapi-key": "d89eb58edamsh10814d1e692895ep158751jsn8a8b4c01281a"
      }
    })
    .then(response => {
      response.json()
        .then(data => {
          if(!data[0]) throw Error({type: "err", msg: "Can't process request. Please Try Again!"})
          setWorldData([{
            ...data[0],
            date: new Date().toISOString().split('T')[0],
            active: data[0].confirmed - data[0].recovered - data[0].deaths,
            country: "Worldwide"  
          }])
        })
        .catch(err => console.log(err))
    })
    .catch(err => console.error(err))
    
  }, [])

  return (
    <Container style={{minHeight: "100vh"}} className="px-0 bg-light" fluid>
      <Navbar />
      {flash && 
        <Alert color="warning" className="text-center">
          {flashMessage}
        </Alert>
      }
      <SearchForm
        countryData={countryData} 
        setCountryData={setCountryData}
        countryCasesData={countryCasesData}
        setCountryCases={setCountryCases}
        setMessage={setMessage}
        />
      { //General Country Stats Chart
        countryData.length && <BarGraph data={countryData} />
      }
      { /* Specific Case Types By Country */}
      <Container className="d-flex flex-wrap justify-content-between" fluid>
        { //Confirmed Cases Chart
          countryCasesData.length && <AreaGraph data={countryCasesData} type="Confirmed" color="#8884d8" />
        }
        { //Active Cases Chart 
          countryCasesData.length && <AreaGraph data={countryCasesData} type="Active" color="grey"/>
        }
        { //Recovered Cases Chart
          countryCasesData.length && <AreaGraph data={countryCasesData} type="Recovered" color="#82ca9d" />
        }
        { //Fatal Cases Chart
          countryCasesData.length && <AreaGraph data={countryCasesData} type="Deaths" color="black" />
        }
      </Container>
        { //General World Info Chart
          worldData.length && <BarGraph data={worldData}/>
        }
      <Container className="d-flex flex-wrap justify-content-between" fluid>
        {

        }
      </Container>
    </Container>
  );
}

export default App;
