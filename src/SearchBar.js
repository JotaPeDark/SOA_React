import React, { useState } from 'react';
import { Box, TextField, Button, Stack } from '@mui/material';

function SearchBar({ onSearch }) {
  const [query, setQuery] = useState('');
  const [startYear, setStartYear] = useState(1930);
  const [endYear, setEndYear] = useState(2020);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim(), startYear, endYear);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mb: 4 }}>
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
        <TextField
          label="Nome"
          variant="outlined"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <TextField
          label="Início (ano)"
          type="number"
          variant="outlined"
          value={startYear}
          onChange={(e) => setStartYear(Number(e.target.value))}
        />
        <TextField
          label="Fim (ano)"
          type="number"
          variant="outlined"
          value={endYear}
          onChange={(e) => setEndYear(Number(e.target.value))}
        />
        <Button type="submit" variant="contained">Buscar</Button>
      </Stack>
    </Box>
  );
}

export default SearchBar;
