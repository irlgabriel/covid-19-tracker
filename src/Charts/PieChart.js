import React from 'react'

import {
  PieChart,
  Pie,
  Cell,
} from "recharts";

export const PieGraph = ({data}) => {

  const colors = [
    "grey",
    "#8884d8",
    "#82ca9d",
    'black'
  ]
  return (
    <PieChart height={250} width={600}>
      <Pie
        data={data}
        cx="50%"
        cy="50%"
        outerRadius={90}
        label 
        dataKey='value' 
        nameKey='status'
      >
        {data.map((entry, index) => <Cell  key={`cell-${index}`} fill={colors[index]} />)}
      </Pie>
    </PieChart>
  )
}