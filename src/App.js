import React, { useState, useEffect } from "react";
import "./App.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Alert } from "reactstrap";

// Functional comp
import LoadingOverlay from "./LoadingOverlay/LoadingOverlay"
import SearchForm from "./Form/Form";
import { BarGraph } from "./Charts/BarChart";
import Navbar from "./Navbar/Navbar";
import { AreaGraph } from "./Charts/AreaChart";

function App() {
  // Loading state?
  const [loading, setLoading] = useState(false)

  // From Day One -> World data - loaded on page load
  const [worldData, setWorldData] = useState({});

  // Today Only - World cases Today
  const [todayWorld, setTodayWorld] = useState({});

  // From Day One -> Country specific data loaded upon form submit
  const [countryData, setCountryData] = useState({});
  const [countryCasesData, setCountryCases] = useState({});

  // Today Only -> Country cases Today
  const [todayConfirmed, setTodayConfirmed] = useState({});
  const [todayRecovered, setTodayRecovered] = useState({});
  const [todayDead, setTodayDead] = useState({});

  // Form Input
  const [country, setCountry] = useState("");

  // Flash message states - display errors and notifications
  const [flash, setFlash] = useState(false);
  const [flashMessage, setMessage] = useState("");

  // Capitalizes every word of a string.
  function titleCase(str) {
    var splitStr = str.toLowerCase().split(' ');
    for (let i = 0; i < splitStr.length; i++) {
        splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);     
    }
    return splitStr.join(' '); 
  }

  // When FlashMessage state changes it means a new alert needs to be displayed
  useEffect(() => {
    if (flashMessage !== "") setFlash(true); // triggers the next useEffect
  }, [flashMessage]);

  // Hide FlashMessage after 3 seconds
  useEffect(() => {
    if (flash)
      setTimeout(() => {
        setFlash(false);
        setMessage("");
      }, 3000);
  }, [flash]);

  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    const yesterday = new Date(Date.now() - 2 * 86400000)
      .toISOString()
      .split("T")[0];

    setLoading(true)
    Promise.all([
      /*
      fetch("https://rapidapi.p.rapidapi.com/totals", {
        method: "GET",
        headers: {
          "x-rapidapi-host": "covid-19-data.p.rapidapi.com",
          "x-rapidapi-key": "d89eb58edamsh10814d1e692895ep158751jsn8a8b4c01281a",
        },
      })
        .then((response) => {
          response
            .json()
            .then((data) => {
              //if(!data[0]) throw Error({type: "err", msg: "Can't process request. Please Try Again!"})
              setWorldData([
                {
                  ...data[0],
                  date: new Date().toISOString().split("T")[0],
                  active: data[0].confirmed - data[0].recovered - data[0].deaths,
                  country: "Worldwide",
                },
              ]);
            })
            .catch((err) => console.log(err));
        })
        .catch((err) => console.error(err)),
        */
        /*
        // this one returns null lately
        fetch(
          `https://api.covid19api.com/world?from=${yesterday}&to=${today}`
        ).then((res) => {
          res.json().then((data) => {
            console.log(data);
            
            setTodayWorld({
              Confirmed: data[1].NewConfirmed,
              Deaths: data[1].NewDeaths,
              Recovered: data[1].NewRecovered,
            });
            
          });
        }), 
        */
       fetch("https://covid-19-statistics.p.rapidapi.com/reports/total?date=" + yesterday, {
        "method": "GET",
        "headers": {
          "x-rapidapi-key": "d89eb58edamsh10814d1e692895ep158751jsn8a8b4c01281a",
          "x-rapidapi-host": "covid-19-statistics.p.rapidapi.com"
        }
      })
      .then(response => {
        response.json()
        .then(data => {
          setTodayWorld({
          Confirmed: data.data.confirmed_diff,
          Deaths: data.data.deaths_diff,
          Recovered: data.data.recovered_diff
          })
          setWorldData([
            {
              confirmed: data.data.confirmed,
              recovered: data.data.recovered,
              /* This api doesn't have critical info
              critical: data.data.critical,
              */
              active: data.data.active,
              deaths: data.data.deaths,
              date: new Date().toISOString().split("T")[0],            
              country: "Worldwide",
            },
          ]);
        })
      })
      .catch(err => {
        console.error(err);
      })
    ])
    .then(() => {
      setLoading(false);
    })
   

    
  }, []);

  return (
    <Container style={{ minHeight: "100vh" }} className="px-0 bg-light" fluid>
      {loading && <LoadingOverlay />}
      <Navbar />
      {flash && (
        <Alert color="warning" className="text-center">
          {flashMessage}
        </Alert>
      )}
      <SearchForm
        countryData={countryData}
        setCountryData={setCountryData}
        country={country}
        setCountry={setCountry}
        setCountryCases={setCountryCases}
        setMessage={setMessage}
        setTodayDead={setTodayDead}
        setTodayConfirmed={setTodayConfirmed}
        setTodayRecovered={setTodayRecovered}
        />
      {
        // <!-- DO NOT SHOW UNTILL COUNTRY INPUT -->
        // MAIN CONTAINER COUNTRY
          countryData.length && (
            <Container fluid>
              <Container fluid className="section-info">
                <h2 className="text-center border-bottom">{titleCase(country)}</h2>
                <Container fluid className="text-data-container">
                  <h3>Today</h3>
                  <p>
                    Recovered:{" "}
                    <span style={{ color: "#82ca9d" }}>
                      +{todayRecovered}
                    </span>
                  </p>
                  <p>
                    Deaths:{" "}
                    <span style={{ color: "black" }}>+{todayDead}</span>
                  </p>
                  <p>
                    Confirmed:{" "}
                    <span style={{ color: "#8884d8" }}>
                      +{todayConfirmed}
                    </span>
                  </p>
                </Container>
                <BarGraph data={countryData} />
              </Container>
            </Container>
          )
      }

      {
        /* Specific Case Types Graphs By Country */
        countryCasesData.length && (
          <Container className="d-flex flex-wrap justify-content-between" fluid>
            <h3 className="w-100 ml-4 pl-2 my-3">Cases Evolution since Day 1</h3>
            <AreaGraph
              data={countryCasesData}
              type="Confirmed"
              color="#8884d8"
            />
            <AreaGraph data={countryCasesData} type="Active" color="grey" />
            <AreaGraph
              data={countryCasesData}
              type="Recovered"
              color="#82ca9d"
            />
            <AreaGraph data={countryCasesData} type="Deaths" color="black" />
          </Container>
        )
      }

      {
        // MAIN CONTAINER WORLD
        todayWorld.Recovered && worldData.length && (
          <Container fluid className="py-2">
            {/* Flex container */}
            <Container fluid className="section-info">
            <h2 className="border-bottom text-center">World Status</h2>

              {/* Flex column container */}
              <Container fluid className="text-data-container">
                <h3>Today</h3>
                <p>
                  Recovered:{" "}
                  <span style={{ color: "#82ca9d" }}>
                    +{todayWorld.Recovered}
                  </span>
                </p>
                <p>
                  Deaths:{" "}
                  <span style={{ color: "black" }}>+{todayWorld.Deaths}</span>
                </p>
                <p>
                  Confirmed:{" "}
                  <span style={{ color: "#8884d8" }}>
                    +{todayWorld.Confirmed}
                  </span>
                </p>
              </Container>
              <BarGraph data={worldData} />
            </Container>
          </Container>
        )
      }
    </Container>
  );
}

export default App;
