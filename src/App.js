import React, { useState, useEffect } from 'react';
import './App.scss';
import "bootstrap/dist/css/bootstrap.min.css";
import { 
  Container, 
  Alert
} from "reactstrap";

// Functional comp
import SearchForm from "./Form/Form";
import Chart from "./Chart/Chart";
import Navbar from "./Navbar/Navbar";

function App() {
  const [countryData, setCountryData] = useState({})
  const [worldData, setWorldData] = useState({})
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
          if(!data[0]) throw({msg: "Can't process request. Please Try Again!"})
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
        data={countryData} 
        setData={setCountryData}
        setMessage={setMessage}
        />
      {worldData.length && <Chart data={worldData}/>}
      {countryData.length && <Chart data={countryData} />}
    </Container>
  );
}

export default App;
