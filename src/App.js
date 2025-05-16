import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Typography, CircularProgress } from '@mui/material';
import SearchBar from './SearchBar';
import NameList from './NameList';
import NameDetails from './NameDatails';

function App() {
  const [names, setNames] = useState([]);
  const [selectedName, setSelectedName] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchTopNames = async () => {
    setLoading(true);
    try {
      const res = await axios.get('https://servicodados.ibge.gov.br/api/v2/censos/nomes/ranking');
      const ranked = res.data[0]?.res || [];
      setNames(ranked.map((item, index) => ({
        nome: item.nome,
        frequencia: item.frequencia,
        ranking: index + 1,
      })));
    } catch (err) {
      console.error('Erro ao buscar ranking:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchRankingsByDecade = async (name, startYear, endYear) => {
    const startDecade = Math.floor(startYear / 10) * 10;
    const endDecade = Math.floor(endYear / 10) * 10;
    const rankings = [];

    for (let decade = startDecade; decade <= endDecade; decade += 10) {
      try {
        const res = await axios.get('https://servicodados.ibge.gov.br/api/v2/censos/nomes/ranking', {
          params: { decada: decade }
        });
        const list = res.data[0]?.res || [];
        const found = list.find((item) => item.nome.toLowerCase() === name.toLowerCase());
        rankings.push({
          decada: decade,
          ranking: found ? list.indexOf(found) + 1 : null,
          frequencia: found?.frequencia || 0
        });
      } catch (error) {
        console.error(`Erro ao buscar ranking da década ${decade}:`, error);
      }
    }

    return rankings;
  };

  const fetchNameDetails = async (name, startYear, endYear) => {
    setLoading(true);
    try {
      const res = await axios.get(`https://servicodados.ibge.gov.br/api/v2/censos/nomes/${name}`, {
        params: { inicio: startYear, fim: endYear },
      });

      const rankings = await fetchRankingsByDecade(name, startYear, endYear);

      setSelectedName({
        nome: name,
        data: res.data,
        rankings
      });
    } catch (err) {
      console.error('Erro ao buscar nome:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTopNames();
  }, []);

  return (
    <Container maxWidth="md">
      <Typography variant="h3" gutterBottom mt={4}>
        Nomes Mais Comuns no Brasil
      </Typography>
      <SearchBar onSearch={fetchNameDetails} />
      {loading ? (
        <CircularProgress />
      ) : (
        <>
          <NameList names={names} onSelect={fetchNameDetails} />
          {selectedName && <NameDetails nameData={selectedName} />}
        </>
      )}
    </Container>
  );
}

export default App;
