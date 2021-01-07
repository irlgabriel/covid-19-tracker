import React from 'react'

import {
  PieChart,
  Pie,
  Cell,
} from "recharts";

export const PieGraph = ({key, data}) => {

  const colors = [
    "grey",
    "#8884d8",
    "#82ca9d",
    'black'
  ]
  return (
    <PieChart key={key} height={250} width={600}>
      <Pie
        key={key}
        data={data}
        cx="50%"
        cy="50%"
        outerRadius={90}
        label 
        dataKey='value' 
        nameKey='status'
      >
        {data.map((entry, index) => <Cell  key={`cell-${entry.value}`} fill={colors[index]} />)}
      </Pie>
    </PieChart>
  )
}