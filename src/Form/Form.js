import React, { useState } from "react"
import {
  Form,
  FormGroup,
  Input,
  Label,
  Button
} from "reactstrap"
export default ({data, setData}) => {
  const [country, setCountry] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(`https://rapidapi.p.rapidapi.com/report/country/name?date=2020-04-01&name=${country}`, {
      "method": "GET",
      "headers": {
        "x-rapidapi-host": "covid-19-data.p.rapidapi.com",
        "x-rapidapi-key": "d89eb58edamsh10814d1e692895ep158751jsn8a8b4c01281a"
      }
    })
    .then(response => {
      response.json()
      .then(res => setData(res[0]))
    })
    .catch(err => {
      console.error(err);
    });

  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormGroup>
        <Label className="d-block text-center">Country Name</Label>
        <Input className="w-50 mx-auto"type="text" onChange={(e) => setCountry(e.target.value)} />
      </FormGroup>
      <FormGroup className="text-center">
        <Button className="btn btn-sm btn-outline-info btn-light">
          Search
        </Button>
      </FormGroup>
    </Form>
  )
}