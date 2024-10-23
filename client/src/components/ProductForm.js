import React, { useState } from 'react';
import { TextField, Button, Grid } from '@mui/material';

const ProductForm = ({ addProduct }) => {
  const [product, setProduct] = useState({ name: '', material: '', thickness: '', quantity: '' });

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addProduct(product);
    setProduct({ name: '', material: '', thickness: '', quantity: '' }); // 폼 초기화
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField fullWidth name="name" label="제품명" value={product.name} onChange={handleChange} required />
        </Grid>
        <Grid item xs={12}>
          <TextField fullWidth name="material" label="소재" value={product.material} onChange={handleChange} required />
        </Grid>
        <Grid item xs={12}>
          <TextField fullWidth name="thickness" label="두께" type="number" value={product.thickness} onChange={handleChange} required />
        </Grid>
        <Grid item xs={12}>
          <TextField fullWidth name="quantity" label="수량" type="number" value={product.quantity} onChange={handleChange} required />
        </Grid>
        <Grid item xs={12}>
          <Button type="submit" variant="contained" color="primary">
            제품 추가
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default ProductForm;
