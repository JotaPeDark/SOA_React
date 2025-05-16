import React from 'react';
import { List, ListItem, ListItemButton, ListItemText, Typography } from '@mui/material';

function NameList({ names, onSelect }) {
  return (
    <div>
      <Typography variant="h5" gutterBottom>Ranking Geral</Typography>
      <List>
        {names.map((item) => (
          <ListItem key={item.nome} disablePadding>
            <ListItemButton onClick={() => onSelect(item.nome, 1930, 2020)}>
              <ListItemText
                primary={`#${item.ranking} - ${item.nome}`}
                secondary={`Frequência: ${item.frequencia}`}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );
}

export default NameList;
