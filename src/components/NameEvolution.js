import React, { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';

function NameEvolution() {
  const [name, setName] = useState('');
  const [startDecade, setStartDecade] = useState(1930);
  const [endDecade, setEndDecade] = useState(2010);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setData([]);
    try {
      const nome = name.trim().toLowerCase();
      const res = await fetch(
        `https://servicodados.ibge.gov.br/api/v2/censos/nomes/${encodeURIComponent(nome)}`
      );
      const json = await res.json();
      if (json[0] && json[0].res) {
        // Extrai a década do período e filtra pelo intervalo
        const filtered = json[0].res
          .map(d => ({
            decada: parseInt(d.periodo.match(/\d{4}/)[0], 10),
            frequencia: d.frequencia
          }))
          .filter(
            d =>
              d.decada >= Number(startDecade) &&
              d.decada <= Number(endDecade)
          );
        setData(filtered);
      }
    } catch {
      setData([]);
    }
    setLoading(false);
  };

  return (
    <Box>
      <form onSubmit={handleSubmit} style={{ marginBottom: 16 }}>
        <TextField
          label="Nome"
          value={name}
          onChange={e => setName(e.target.value)}
          required
          sx={{ mr: 2 }}
        />
        <TextField
          label="Década Inicial"
          type="number"
          value={startDecade}
          onChange={e => setStartDecade(Number(e.target.value))}
          sx={{ mr: 2, width: 140 }}
        />
        <TextField
          label="Década Final"
          type="number"
          value={endDecade}
          onChange={e => setEndDecade(Number(e.target.value))}
          sx={{ mr: 2, width: 140 }}
        />
        <Button type="submit" variant="contained">Buscar</Button>
      </form>
      {loading && <Typography>Carregando...</Typography>}
      {!loading && data.length > 0 && (
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="decada" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="frequencia" stroke="#1976d2" />
          </LineChart>
        </ResponsiveContainer>
      )}
      {!loading && data.length === 0 && (
        <Typography variant="body2" color="text.secondary">
          Nenhum dado encontrado para o nome e intervalo informados.
        </Typography>
      )}
    </Box>
  );
}

export default NameEvolution;