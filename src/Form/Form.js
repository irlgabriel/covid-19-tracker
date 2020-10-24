import React, { useState, useEffect } from "react";
import { Form, FormGroup, Input, Label, Spinner } from "reactstrap";
export default ({
  setCountryCases,
  setCountryData,
  setMessage,
  setTodayRecovered,
  setTodayDead,
  setTodayConfirmed,
  country,
  setCountry,
  loading,
  setLoading
}) => {
  const [countries, setCountries] = useState([])

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

    // check if country is in countries array (aka if it is valid)
    if(!countries.find(cName => cName.toLowerCase() === country.toLowerCase())) {
      setMessage("Invalid Country Name!")
      return;
    }

    const today = new Date().toISOString().split("T")[0];
    const yesterday = new Date(Date.now() - 2 * 86400000)
      .toISOString()
      .split("T")[0];
      
    setLoading(true);
    Promise.all([
      fetch(`https://rapidapi.p.rapidapi.com/country?name=${country}`, {
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
            setCountryData([
              {
                ...res[0],
                date: today,
                active: res[0].confirmed - res[0].recovered - res[0].deaths,
              },
            ]);
          })
          .catch((err) => setMessage(err.msg));
      })
      .catch((err) => setMessage(err.msg))
     ,
     fetch(`https://api.covid19api.com/total/country/${country}`).then((res) => {
      res
        .json()
        .then((data) => {
          // Preprocess date key-value pair to have a standard YYYY-MM-DD format
          const newCases = [];
          data.forEach((obj) => {
            newCases.push({ ...obj, Date: obj.Date.split("T")[0] });
          });
          setCountryCases(newCases);
        })
        .catch((err) => console.log(err))
    }),
    fetch(
      `https://api.covid19api.com/country/${country}/status/deaths?from=${yesterday}&to=${today}`
    ).then((res) =>
      res.json().then((data) => {
        if (data[1]) {
          setTodayDead([{ Cases: data[1].Cases - data[0].Cases }]);
        }
      })
    ),
    fetch(
      `https://api.covid19api.com/country/${country}/status/recovered?from=${yesterday}&to=${today}`
    ).then((res) =>
      res.json().then((data) => {
        if (data[1]) {
          setTodayRecovered([{ Cases: data[1].Cases - data[0].Cases }]);
        }
      })
    ),
    fetch(
      `https://api.covid19api.com/country/${country}/status/confirmed?from=${yesterday}&to=${today}`
    ).then((res) =>
      res.json().then((data) => {
        if (data[1]) {
          setTodayConfirmed([{ Cases: data[1].Cases - data[0].Cases }]);
        }
      })
    )
  ])
    .then(
      setLoading(false)
    )
  };

  return (
    <Form className="mt-3" onSubmit={handleSubmit}>
      <FormGroup>
        <Label className="d-block text-center">View Country Situation</Label>
        <Input
          required
          placeholder="Country..."
          className="w-50 mx-auto"
          type="text"
          onChange={(e) => setCountry(e.target.value)}
        />
      </FormGroup>
      <FormGroup className="text-center">
        {
          !loading &&
          <button className="green-button">Search</button>
        }
        {
          loading && 
          <Spinner color="success" />
        }
      </FormGroup>
    </Form>
  );
};
