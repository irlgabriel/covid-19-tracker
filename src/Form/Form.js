import React, { useState, useEffect } from "react";
import { Form, FormGroup, Input, Label } from "reactstrap";
import LoadingOverlay from "../LoadingOverlay/LoadingOverlay"
export default ({
  setCountryCases,
  setCountryData,
  setMessage,
  setTodayRecovered,
  setTodayDead,
  setTodayConfirmed,
  setTodayActive,
  country,
  countryData,
  setCountry,
}) => {
  const [countries, setCountries] = useState([])
  const [loading, setLoading] = useState(false)

  // Get all countries when component mounts
  useEffect(() => {
    fetch('https://api.covid19api.com/countries')
      .then(res =>
        res.json()
          .then(data => {
            setCountries(data.map(obj => obj.Country))
          })
      )
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault();

    const form = e.target;
    const country_name = form.querySelector('#country_name').value
    // check if country is in countries array (aka if it is valid)
    if(!countries.find(cName => cName.toLowerCase() === country_name.toLowerCase())) {
      setMessage("Invalid Country Name!")
      return;
    }
    
    const today = new Date().toISOString().split("T")[0];
        
      setLoading(true)
      Promise.all([
        fetch(`https://rapidapi.p.rapidapi.com/country?name=${country_name}`, {
          method: "GET",
          headers: {
            "x-rapidapi-host": "covid-19-data.p.rapidapi.com",
            "x-rapidapi-key": "d89eb58edamsh10814d1e692895ep158751jsn8a8b4c01281a",
          },
        })
        .then((response) => {
          response
            .json()
            .then((res) => {
              setCountryData(
                {
                  date: today,
                  confirmed: res[0].confirmed,
                  recovered: res[0].recovered,
                  critical: res[0].critical,
                  deaths: res[0].deaths,
                  active: res[0].confirmed - res[0].recovered - res[0].deaths,
                },
              );
            })
            .catch((err) => setMessage(err.msg));
        })
        .catch((err) => setMessage(err.msg))
      ,
      fetch(`https://api.covid19api.com/total/country/${country_name}`).then((res) => {
        res
          .json()
          .then((data) => {
            // Preprocess date key-value pair to have a standard YYYY-MM-DD format
            const newCases = [];
            data.forEach((obj) => {
              newCases.push({ ...obj, Date: obj.Date.split("T")[0] });
            });
            setCountryCases(newCases);
            // Preprocess this request's data to gather recovered/deaths/confirmed from last 24h
            
            const len = data.length;
            console.log(data[len-1]);
            setTodayDead(data[len - 1].Deaths - data[len -2].Deaths);
            setTodayRecovered(data[len - 1].Recovered - data[len -2].Recovered);
            setTodayConfirmed(data[len - 1].Confirmed - data[len -2].Confirmed);
            setTodayActive(Math.abs(data[len - 1].Active - data[len - 2].Active));
          })
          .catch((err) => console.log(err))
      }),
    ])
      .then(
        // adds .5s to the loading time. 
        setTimeout(() => {
          setLoading(false) 
          setCountry(country_name);
        }, 500)
      )
      .catch(err => setMessage(err.response.message))
    
  };

  return (
    <Form className="mt-3" onSubmit={handleSubmit}>
      {loading && <LoadingOverlay />}
      <FormGroup>
        <Label className="d-block text-center">View Country Situation</Label>
        <Input
          id='country_name'
          required
          placeholder="Country..."
          className="w-50 mx-auto"
          type="text"
        />
      </FormGroup>
      <FormGroup className="text-center">
        {
          !loading &&
          <button className="green-button">Search</button>
        }
      </FormGroup>
    </Form>
  );
};
