import React, { useState } from "react"
import {
  Form,
  FormGroup,
  Input,
  Label,
} from "reactstrap"
export default ({countryData, setCountryData, activeCasesData, setActiveCases, setMessage}) => {
  const [country, setCountry] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault();
    const date = new Date().toISOString().split('T')[0]

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
          date,
          active: res[0].confirmed - res[0].recovered - res[0].deaths  
        }])
      })
      .catch(err => setMessage(err.msg))
    })
    .catch(err => setMessage(err.msg))

    // Get Info about cases evolution
    // Active Cases since day one
    fetch(`https://api.covid19api.com/total/country/${country}`)
     .then(res =>
      res.json()
        .then(data => {
          setActiveCases(data)
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