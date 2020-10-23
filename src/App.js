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
  // From Day One -> World data - loaded on page load
  const [worldData, setWorldData] = useState({})

  // Today Only - World cases Today
  const [todayWorld, setTodayWorld] = useState({})

  // From Day One -> Country specific data loaded upon form submit
  const [countryData, setCountryData] = useState({})
  const [countryCasesData, setCountryCases] = useState({})

  // Today Only -> Country cases Today
  const [todayConfirmed, setTodayConfirmed] = useState({})
  const [todayRecovered, setTodayRecovered] = useState({})
  const [todayDead, setTodayDead] = useState({})
  // PREPROCESS DATA FROM API

  // Flash message states - display errors and notifications 
  const [flash, setFlash] = useState(false)
  const [flashMessage, setMessage] = useState("")

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
    // GET World Data total
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
          //if(!data[0]) throw Error({type: "err", msg: "Can't process request. Please Try Again!"})
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

    
    const today = new Date().toISOString().split('T')[0];
    const yesterday = new Date(Date.now() - 2 * 86400000).toISOString().split('T')[0];
    // GET World data Today
    fetch(`https://api.covid19api.com/world?from=${yesterday}&to=${today}`)
      .then(res =>{
        res.json()
          .then(data => {
            setTodayWorld({
              Confirmed: data[1].NewConfirmed,
              Deaths: data[1].NewDeaths,
              Recovered: data[1].NewRecovered
            })
          })
      })
      
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
        setCountryCases={setCountryCases}
        setMessage={setMessage}
        setTodayDead={setTodayDead}
        setTodayConfirmed={setTodayConfirmed}
        setTodayRecovered={setTodayRecovered}
        />
      {  
      // <!-- DO NOT SHOW UNTILL COUNTRY INPUT -->
        // MAIN CONTAINER COUNTRY
        todayRecovered.length && todayDead.length && todayConfirmed.length && countryData.length && 
        <Container className="section-info">
          <Container fluid className="text-data-container">
            <h3>Today</h3>
            <p>Recovered: <span style={{color: "#82ca9d"}}>+{todayRecovered[0].Cases}</span></p>
            <p>Deaths: <span style={{color: "black"}}>+{todayDead[0].Cases}</span></p>
            <p>Confirmed: <span style={{color: "#8884d8"}}>+{todayConfirmed[0].Cases}</span></p>
          </Container>
          <BarGraph data={countryData} />
        </Container>
      }

      { /* Specific Case Types Graphs By Country */
        countryCasesData.length && 
        <Container className="d-flex flex-wrap justify-content-between" fluid>
          <AreaGraph data={countryCasesData} type="Confirmed" color="#8884d8" />
          <AreaGraph data={countryCasesData} type="Active" color="grey"/>
          <AreaGraph data={countryCasesData} type="Recovered" color="#82ca9d" />
          <AreaGraph data={countryCasesData} type="Deaths" color="black" />
        </Container>
      }
        
        { // MAIN CONTAINER WORLD
          todayWorld.Recovered && worldData.length && 
          <Container fluid className="section-info">
            <Container fluid className="text-data-container">
              <h3>Today</h3>
              <p>Recovered: <span style={{color: "#82ca9d"}}>+{todayWorld.Recovered}</span></p>
              <p>Deaths: <span style={{color: "black"}}>+{todayWorld.Deaths}</span></p>
              <p>Confirmed: <span style={{color: "#8884d8"}}>+{todayWorld.Confirmed}</span></p>
            </Container>
            <BarGraph data={worldData}/>
          </Container>
        }
        
    </Container>
  );
}

export default App;
