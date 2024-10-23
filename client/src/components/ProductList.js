import React from 'react';

const ProductList = ({ products, updateProduct, deleteProduct }) => {
  const handleQuantityChange = (id, newQuantity) => {
    const product = products.find(p => p.id === id);
    if (product) {
      updateProduct(id, { ...product, quantity: Math.max(0, newQuantity) });
    }
  };

  return (
    <ul className="product-list">
      {products.map((product) => (
        <li key={product.id} className="product-item">
          <div className="product-info">
            <span className="product-name">{product.name}</span>
            <span className="product-details">({product.material}, {product.size}, {product.thickness})</span>
          </div>
          <div className="product-actions">
            <button onClick={() => handleQuantityChange(product.id, product.quantity - 1)}>-</button>
            <span className="product-quantity">{product.quantity}</span>
            <button onClick={() => handleQuantityChange(product.id, product.quantity + 1)}>+</button>
            <button className="delete-btn" onClick={() => deleteProduct(product.id)}>삭제</button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default ProductList;
