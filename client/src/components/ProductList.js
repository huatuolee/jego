import React from 'react';
import { List, ListItem, ListItemText, TextField } from '@mui/material';

const ProductList = ({ products }) => {
  return (
    <List>
      {products.map((product) => (
        <ListItem key={product._id}>
          <ListItemText
            primary={product.name}
            secondary={`소재: ${product.material}, 두께: ${product.thickness}`}
          />
          <TextField
            type="number"
            value={product.quantity}
            onChange={(e) => console.log('수량 변경:', e.target.value)}
          />
        </ListItem>
      ))}
    </List>
  );
};

export default ProductList;
