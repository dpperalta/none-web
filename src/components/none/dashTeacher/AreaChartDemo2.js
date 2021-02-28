import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";

const data = [
  {
    name: "Paralelo A",
    examenes: 40,
    tareas: 24,
    amt: 24
  },
  {
    name: "Paralelo B",
    examenes: 30,
    tareas: 13,
    amt: 21
  },
  {
    name: "Paralelo C",
    examenes: 0,
    tareas: 46,
    amt: 29
  },
  {
    name: "Paralelo D",
    examenes: 27,
    tareas: 39,
    amt: 20
  },
  {
    name: "Paralelo E",
    examenes: 19,
    tareas: 15,
    amt: 28
  },
  {
    name: "Paralelo F",
    examenes: 239,
    tareas: 380,
    amt: 250
  },
  {
    name: "Paralelo G",
    examenes: 349,
    tareas: 430,
    amt: 210
  }
];

export default function AreaChartDemo2() {
  return (
    <div>
    <h2>Actividades faltantes por revisar</h2>
    <BarChart
      width={600}
      height={300}
      data={data}
      margin={{
        top: 20,
        right: 30,
        left: 20,
        bottom: 5
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="tareas" stackId="a" fill="#8884d8" />
      <Bar dataKey="examenes" stackId="a" fill="#82ca9d" />
    </BarChart>
    </div>
  );
}
