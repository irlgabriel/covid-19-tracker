import React, { useState } from "react"
import {
  Form,
  FormGroup,
  Input,
  Label,
} from "reactstrap"
export default ({setCountryCases, setCountryData, setMessage, setTodayRecovered, setTodayDead, setTodayConfirmed}) => {
  const [country, setCountry] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault();
    const today = new Date().toISOString().split('T')[0];
    const yesterday = new Date(Date.now() - 2 * 86400000).toISOString().split('T')[0];

    console.log(today)
    console.log(yesterday)
    // Get General Country stats
    fetch(`https://rapidapi.p.rapidapi.com/country?name=${country}`, {
      "method": "GET",
      "headers": {
        "x-rapidapi-host": "covid-19-data.p.rapidapi.com",
        "x-rapidapi-key": "d89eb58edamsh10814d1e692895ep158751jsn8a8b4c01281a"
      }
    })
    .then(response => {
      response.json()
      .then(res => {
        // In case of invalid country name throw error
        if(!res[0] || !res[0].country) throw { type: "err", msg:"Invalid Country Name!"}
        setCountryData([{
          ...res[0], 
          date: today,
          active: res[0].confirmed - res[0].recovered - res[0].deaths  
        }])
      })
      .catch(err => setMessage(err.msg))
    })
    .catch(err => setMessage(err.msg))

    // Get Info about cases evolution
    // Active Cases since day one
    fetch(`https://api.covid19api.com/total/country/${country}`)
     .then(res => {
      res.json()
        .then(data => {
          // Preprocess date key-value pair to have a standard YYYY-MM-DD format
          const newCases = [];
          data.forEach((obj) => {
            newCases.push({...obj, Date: obj.Date.split('T')[0]})
          })
          setCountryCases(newCases)
        })
    .catch(err => console.log(err))
    })

    // Get Today Death Cases for this country
    fetch(`https://api.covid19api.com/country/${country}/status/deaths?from=${yesterday}&to=${today}`)
      .then(res =>
        res.json()
          .then(data => {
            setTodayDead(
              [{Cases: data[1].Cases - data[0].Cases}]
            )
          })  
      )
    
      // Get Today Recovered Cases for this country
    fetch(`https://api.covid19api.com/country/${country}/status/recovered?from=${yesterday}&to=${today}`)
    .then(res =>
      res.json()
        .then(data => {
          setTodayRecovered(
            [{Cases: data[1].Cases - data[0].Cases}]
          )
        })  
    )

    // Get Today confirmed Cases for this country
    fetch(`https://api.covid19api.com/country/${country}/status/confirmed?from=${yesterday}&to=${today}`)
    .then(res =>
      res.json()
        .then(data => {
          setTodayConfirmed(
            [{Cases: data[1].Cases - data[0].Cases}]
          )
        })  
    ) 
  }

  return (
    <Form className="mt-3" onSubmit={handleSubmit}>
      <FormGroup>
        <Label className="d-block text-center">View Country Situation</Label>
        <Input required placeholder="Country..." className="w-50 mx-auto"type="text" onChange={(e) => setCountry(e.target.value)} />
      </FormGroup>
      <FormGroup className="text-center">
        <button className="green-button">
          Search
        </button>
      </FormGroup>
    </Form>
  )
}