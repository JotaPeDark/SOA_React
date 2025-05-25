import React, { useState } from 'react';
import { Container, Typography, CircularProgress, Tabs, Tab, Box } from '@mui/material';
import NameEvolution from './components/NameEvolution';
import TopNamesByLocation from './components/TopNamesByLocation';
import NameComparison from './components/NameComparison';

function App() {
  const [tab, setTab] = useState(0);

  const handleTabChange = (event, newValue) => setTab(newValue);

  return (
    <Container maxWidth="md">
      <Typography variant="h3" gutterBottom mt={4}>
        Sistema de Evolução de Nomes - IBGE
      </Typography>
      <Tabs value={tab} onChange={handleTabChange} sx={{ mb: 3 }}>
        <Tab label="Evolução de um Nome" />
        <Tab label="Top 3 por Localidade" />
        <Tab label="Comparação de Nomes" />
      </Tabs>
      <Box hidden={tab !== 0}>
        <NameEvolution />
      </Box>
      <Box hidden={tab !== 1}>
        <TopNamesByLocation />
      </Box>
      <Box hidden={tab !== 2}>
        <NameComparison />
      </Box>
    </Container>
  );
}

export default App;