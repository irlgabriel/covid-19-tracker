import React from "react";
import {
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar,
  ResponsiveContainer,
} from "recharts";
import { Container } from "reactstrap";

export const BarGraph = ({ data, title }) => {
  // Preprocess data
  return (
    <Container fluid className="main-chart-container">
      <h3>Totals</h3>
      {
        <ResponsiveContainer className="mx-auto" width="100%" height={300}>
          <BarChart
            data={data}
            margin={{ top: 20, right: 10, left: 30, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="confirmed" fill="#8884d8" />
            <Bar dataKey="recovered" fill="#82ca9d" />
            <Bar dataKey="active" fill="grey" />
            <Bar dataKey="deaths" fill="rgba(0,0,0,1)" />
            <Bar dataKey="critical" fill="red" />
          </BarChart>
        </ResponsiveContainer>
      }
    </Container>
  );
};
