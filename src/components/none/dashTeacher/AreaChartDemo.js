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
    examenes: 400,
    tareas: 240,
    amt: 240
  },
  {
    name: "Paralelo B",
    examenes: 300,
    tareas: 139,
    amt: 221
  },
  {
    name: "Paralelo C",
    examenes: 200,
    tareas: 486,
    amt: 229
  },
  {
    name: "Paralelo D",
    examenes: 278,
    tareas: 390,
    amt: 200
  },
  {
    name: "Paralelo E",
    examenes: 189,
    tareas: 480,
    amt: 218
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

export default function AreaChartDemo() {
  return (
    <div>
    <h2>Progreso de actividades</h2>
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
