import React, { useState, useEffect } from "react"
import { PieChart, Pie, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar } from "recharts"
import { Container } from "reactstrap"
export default ({data}) => {
  const [dataSet, setData] = useState([])

  useEffect(() => {
    data.country && setData([{...data['provinces'][0], date: Date()}])
  }, [data])

  /*
  useEffect(() => {
    dataSet.active && (
      return dataSet.map(data => {"name": data})
    )
  }, [dataSet])
  */
  return(
    <Container fluid className="d-flex justify-content-center">
      <BarChart width={730} height={250} data={dataSet}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="active" fill="grey" />
        <Bar dataKey="confirmed" fill="#8884d8" />
        <Bar dataKey="recovered" fill="#82ca9d" />
        <Bar dataKey="deaths" fill="rgba(255,0,0,0.6)" />
      </BarChart>
    </Container>
  )
}
