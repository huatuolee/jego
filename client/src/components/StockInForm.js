import React, { useState } from 'react';

const StockInForm = ({ products, addInventory }) => {
  const [selectedProduct, setSelectedProduct] = useState('');
  const [quantity, setQuantity] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const product = products.find(p => p.id === parseInt(selectedProduct));
    if (product && quantity) {
      addInventory(product, Number(quantity));
      setSelectedProduct('');
      setQuantity('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="stock-in-form">
      <h2>입고</h2>
      <select 
        value={selectedProduct} 
        onChange={(e) => setSelectedProduct(e.target.value)} 
        required
      >
        <option value="">제품 선택</option>
        {products.map(product => (
          <option key={product.id} value={product.id}>
            {product.material} - {product.type} - {product.thickness}T - {product.sizeHeight}x{product.sizeWidth}
          </option>
        ))}
      </select>
      <input 
        type="number" 
        value={quantity} 
        onChange={(e) => setQuantity(e.target.value)} 
        placeholder="수량"
        required 
      />
      <button type="submit">입고</button>
    </form>
  );
};

export default StockInForm;
