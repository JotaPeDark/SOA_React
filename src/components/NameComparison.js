import React, { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';

function NameComparison() {
  const [name1, setName1] = useState('');
  const [name2, setName2] = useState('');
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setData([]);
    try {
      const res = await fetch(
        `https://servicodados.ibge.gov.br/api/v2/censos/nomes/${name1}|${name2}`
      );
      const json = await res.json();
      // Monta dados para o gráfico
      const decades = {};
      json.forEach((item, idx) => {
        item.res.forEach(r => {
          if (!decades[r.periodo]) decades[r.periodo] = {};
          decades[r.periodo][`nome${idx+1}`] = r.frequencia;
        });
      });
      const chartData = Object.keys(decades).map(decada => ({
        decada,
        [name1]: decades[decada].nome1 || 0,
        [name2]: decades[decada].nome2 || 0
      }));
      setData(chartData);
    } catch {
      setData([]);
    }
    setLoading(false);
  };

  return (
    <Box>
      <form onSubmit={handleSubmit} style={{ marginBottom: 16 }}>
        <TextField
          label="Nome 1"
          value={name1}
          onChange={e => setName1(e.target.value)}
          required
          sx={{ mr: 2 }}
        />
        <TextField
          label="Nome 2"
          value={name2}
          onChange={e => setName2(e.target.value)}
          required
          sx={{ mr: 2 }}
        />
        <Button type="submit" variant="contained">Comparar</Button>
      </form>
      {loading && <Typography>Carregando...</Typography>}
      {!loading && data.length > 0 && (
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="decada" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey={name1} stroke="#1976d2" />
            <Line type="monotone" dataKey={name2} stroke="#d32f2f" />
          </LineChart>
        </ResponsiveContainer>
      )}
    </Box>
  );
}

export default NameComparison;