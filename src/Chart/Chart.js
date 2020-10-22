import React from "react"
import { BarChart, Area, AreaChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar, ResponsiveContainer } from "recharts"
import { Container } from "reactstrap"
export default ({data, title}) => {
  // Preprocess data
  
  return(
    <Container fluid className="flex-wrap d-flex justify-content-center">
      <h3 className="w-100 text-center">{title}</h3>
      <br />
    { 
    <ResponsiveContainer width="80%" height={300}>
      <BarChart data={data}
      margin={{ top: 20, right: 10, left: 30, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="confirmed" fill="#8884d8" />
        <Bar dataKey="recovered" fill="#82ca9d" />
        <Bar dataKey="deaths" fill="rgba(0,0,0,1)" />
        <Bar dataKey="critical" fill="red" />
      </BarChart>
    </ResponsiveContainer>
    }

    </Container>
  )
}
