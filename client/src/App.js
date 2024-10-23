import React, { useState, useEffect } from 'react';
import { Container, Typography, Grid } from '@mui/material';
import axios from 'axios';
import ProductList from './components/ProductList';
import ProductForm from './components/ProductForm';
import InventoryChart from './components/InventoryChart';

function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axios.get('http://localhost:5001/api/products');
      setProducts(res.data);
    } catch (error) {
      console.error("제품을 불러오는데 실패했습니다:", error);
    }
  };

  const addProduct = async (product) => {
    try {
      await axios.post('http://localhost:5001/api/products', product);
      fetchProducts(); // 제품 추가 후 목록 새로고침
    } catch (error) {
      console.error("제품 추가에 실패했습니다:", error);
    }
  };

  return (
    <Container>
      <Typography variant="h2" gutterBottom>
        재고 관리 시스템
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <ProductForm addProduct={addProduct} />
          <ProductList products={products} />
        </Grid>
        <Grid item xs={12} md={6}>
          <InventoryChart products={products} />
        </Grid>
      </Grid>
    </Container>
  );
}

export default App;
