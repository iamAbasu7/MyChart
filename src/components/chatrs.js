

import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const MyChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const xResponse = await fetch('https://retoolapi.dev/gDa8uC/data');
        const yResponse = await fetch('https://retoolapi.dev/o5zMs5/data');

        const xJson = await xResponse.json();
        const yJson = await yResponse.json();

        const slicedData = xJson.slice(0, 50).map((item, index) => ({
          x: item.Label,
          y: yJson[index].RandomNumber,
        }));

        setData(slicedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div style={{ fontFamily: 'Arial, sans-serif' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>My Chart</h2>
      <ResponsiveContainer width="90%" height={400}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="x" tick={{ fontSize: 12 }} />
          <YAxis tick={{ fontSize: 12 }} />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="y" stroke="#8884d8" strokeWidth={2} dot={{ fill: '#8884d8' }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MyChart;


