import React, { useState, useEffect } from "react"
import { PieChart, Pie, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar } from "recharts"
import { Container } from "reactstrap"
export default ({data}) => {
  const [dataSet, setData] = useState([])
  /*
  useEffect(() => {
    data.country && setData([{...data['provinces'][0], date: new Date().toISOString().split('T')[0]}])
  }, [data])
  */
  /*
  useEffect(() => {
    dataSet.active && (
      return dataSet.map(data => {"name": data})
    )
  }, [dataSet])
  */
  return(
    <Container fluid className="d-flex justify-content-center">

      <BarChart width={800} height={250} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="active" fill="grey" />
        <Bar dataKey="confirmed" fill="#8884d8" />
        <Bar dataKey="recovered" fill="#82ca9d" />
        <Bar dataKey="deaths" fill="rgba(0,0,0,1)" />
        <Bar dataKey="critical" fill="red" />
      </BarChart>
    </Container>
  )
}
