import React from 'react';
import { Typography, Box, List, ListItem, ListItemText, Divider } from '@mui/material';

function NameDetails({ nameData }) {
  const { nome, data, rankings } = nameData;
  const timeline = data[0]?.res || [];

  return (
    <Box mt={4}>
      <Typography variant="h5" gutterBottom>
        Detalhes de "{nome}"
      </Typography>

      <Typography variant="h6" mt={2}>Frequência por Década</Typography>
      <List>
        {timeline.map((item) => (
          <ListItem key={item.periodo}>
            <ListItemText primary={item.periodo} secondary={`Frequência: ${item.frequencia}`} />
          </ListItem>
        ))}
      </List>

      <Divider sx={{ my: 2 }} />

      <Typography variant="h6" mt={2}>Ranking por Década</Typography>
      <List>
        {rankings.map((item) => (
          <ListItem key={item.decada}>
            <ListItemText
              primary={`${item.decada}`}
              secondary={
                item.ranking
                  ? `Ranking: #${item.ranking} — Frequência: ${item.frequencia}`
                  : 'Fora do Top 100'
              }
            />
          </ListItem>
        ))}
      </List>

      <Typography variant="body2" color="text.secondary" mt={2}>
        * Origem e significado não são fornecidos pela API do IBGE.
      </Typography>
    </Box>
  );
}

export default NameDetails;
