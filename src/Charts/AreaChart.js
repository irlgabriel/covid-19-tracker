import React from "react";
import {
  AreaChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Area,
  ResponsiveContainer
} from "recharts";
import { Container } from "reactstrap"

export const AreaGraph = ({data, type}) => {
  return (
    <Container className="flex-wrap d-flex justify-content-center">
      <h2 className="w-100 text-center">{type}</h2>
      <ResponsiveContainer width="45%" height={300}>
        <AreaChart data={data}>
          <YAxis />
          <XAxis dataKey="Date" />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Area dataKey={type}></Area>
        </AreaChart>
      </ResponsiveContainer>
    </Container>
  )
}