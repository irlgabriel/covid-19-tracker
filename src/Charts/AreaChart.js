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

export const AreaGraph = ({data, type, color}) => {
  return (
    <Container className="w-50" fluid>
      <h2 className="w-100 text-center">{type}</h2>
      <ResponsiveContainer width="90%" className="mx-auto" height={300}>
        <AreaChart data={data}>
          <YAxis />
          <XAxis dataKey="Date" />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Area fill={color} dataKey={type}></Area>
        </AreaChart>
      </ResponsiveContainer>
    </Container>
  )
}