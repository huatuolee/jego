import React, { useState } from 'react';

const ProductForm = ({ addProduct }) => {
  const [product, setProduct] = useState({
    material: '',
    type: '',
    thickness: '',
    sizeHeight: '',
    sizeWidth: '',
    additionalInfo: '',
  });

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addProduct(product);
    setProduct({ material: '', type: '', thickness: '', sizeHeight: '', sizeWidth: '', additionalInfo: '' });
  };

  return (
    <form onSubmit={handleSubmit} className="product-form">
      <h2>제품 추가</h2>
      <input name="material" value={product.material} onChange={handleChange} placeholder="소재" required />
      <input name="type" value={product.type} onChange={handleChange} placeholder="종류" required />
      <input name="thickness" value={product.thickness} onChange={handleChange} placeholder="두께 (T)" required />
      <input name="sizeHeight" value={product.sizeHeight} onChange={handleChange} placeholder="세로 크기" required />
      <input name="sizeWidth" value={product.sizeWidth} onChange={handleChange} placeholder="가로 크기" required />
      <textarea name="additionalInfo" value={product.additionalInfo} onChange={handleChange} placeholder="기타 정보" />
      <button type="submit">제품 추가</button>
    </form>
  );
};

export default ProductForm;
