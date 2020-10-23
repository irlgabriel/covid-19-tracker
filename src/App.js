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
  const [activeCasesData, setActiveCases] = useState({})

  // Flash message states - display errors and notifications 
  const [flash, setFlash] = useState(false)
  const [flashMessage, setMessage] = useState("")


  // PREPROCESS DATA FROM API
  useEffect(() => {
    if(activeCasesData.length) {
      activeCasesData.map(day => {
        return {
          ...day,
        }
      })
    }
  }, [activeCasesData])


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
          console.log(data[0])
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
        activeCasesData={activeCasesData}
        setActiveCases={setActiveCases}
        setMessage={setMessage}
        />
      {/* GENERAL COUNTRY INFO */}

      { //General Country Stats Chart
        countryData.length && <BarGraph data={countryData} />
      }
      <Container className="d-flex flex-wrap justify-content-between" fluid>
        { //Active Cases Chart 
          activeCasesData.length && <AreaGraph data={activeCasesData} type="Active" />
        }
        { //Recovered Cases Chart
          activeCasesData.length && <AreaGraph data={activeCasesData} type="Recovered" />
        }
        { //Fatal Cases Chart
          activeCasesData.length && <AreaGraph data={activeCasesData} type="Deaths" />
        }
      </Container>

        { //General World Info Chart
          worldData.length && <BarGraph data={worldData}/>
        }
      
    </Container>
  );
}

export default App;
