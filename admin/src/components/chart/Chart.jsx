import React from 'react';
import { LineChart, Line, XAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import "./chart.css";

export default function Chart({title, data, dataKey, grid}) {

  return (
    <div className="chart">
      <h3 className="chartTitle">{title}</h3>
      <ResponsiveContainer width="100%" aspect={4 / 1}>
        <LineChart data={data}>
          <XAxis dataKey="name" stroke="#5550bd" />

         {grid && <CartesianGrid stroke="#e0dfdf" strokeDasharray="5 5" />}
          <Tooltip />
          <Line type="monotone" dataKey={dataKey} stroke="#5550bd" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
