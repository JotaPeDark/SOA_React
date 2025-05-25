import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Table, TableBody, TableCell, TableHead, TableRow, Alert } from '@mui/material';

const UF_CODES = {
  'RO': 11, 'AC': 12, 'AM': 13, 'RR': 14, 'PA': 15, 'AP': 16, 'TO': 17,
  'MA': 21, 'PI': 22, 'CE': 23, 'RN': 24, 'PB': 25, 'PE': 26, 'AL': 27, 'SE': 28, 'BA': 29,
  'MG': 31, 'ES': 32, 'RJ': 33, 'SP': 35,
  'PR': 41, 'SC': 42, 'RS': 43,
  'MS': 50, 'MT': 51, 'GO': 52, 'DF': 53
};

function TopNamesByLocation() {
  const [uf, setUf] = useState('');
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setData([]);
    setError('');
    const ufCode = UF_CODES[uf.toUpperCase()];
    if (!ufCode) {
      setLoading(false);
      setError('UF inválida. Digite uma sigla válida, ex: SP, RJ, MG.');
      return;
    }
    try {
      const res = await fetch(
        `https://servicodados.ibge.gov.br/api/v2/censos/nomes/ranking?localidade=${ufCode}`
      );
      const json = await res.json();
      if (!Array.isArray(json) || !json[0] || !Array.isArray(json[0].res) || json[0].res.length === 0) {
        setError('Nenhum dado encontrado para a UF informada.');
        setData([]);
      } else {
        // Pega apenas os 3 primeiros do ranking total
        setData(json[0].res.slice(0, 3));
      }
    } catch (err) {
      setError('Erro ao buscar dados da API.');
      setData([]);
    }
    setLoading(false);
  };

  return (
    <Box>
      <form onSubmit={handleSubmit} style={{ marginBottom: 16 }}>
        <TextField
          label="UF (ex: SP)"
          value={uf}
          onChange={e => setUf(e.target.value.toUpperCase())}
          required
          sx={{ mr: 2 }}
        />
        <Button type="submit" variant="contained">Buscar</Button>
      </form>
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      {loading && <Typography>Carregando...</Typography>}
      {!loading && data.length > 0 && (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Ranking</TableCell>
              <TableCell>Nome</TableCell>
              <TableCell>Frequência</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, idx) => (
              <TableRow key={row.nome}>
                <TableCell>{row.ranking}</TableCell>
                <TableCell>{row.nome}</TableCell>
                <TableCell>{row.frequencia}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </Box>
  );
}

export default TopNamesByLocation;