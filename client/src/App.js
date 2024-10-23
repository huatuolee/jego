import React, { useState, useEffect } from 'react';
import ProductForm from './components/ProductForm';
import InventoryList from './components/InventoryList';
import StockInForm from './components/StockInForm';
import UsageReport from './components/UsageReport';
import './App.css';

/* eslint-disable no-unused-vars */

function App() {
  const [products, setProducts] = useState([]);
  const [inventory, setInventory] = useState([]);
  const [showProductForm, setShowProductForm] = useState(false);
  const [showStockInForm, setShowStockInForm] = useState(false);
  const [usageHistory, setUsageHistory] = useState([]);
  const [stockInHistory, setStockInHistory] = useState([]);

  useEffect(() => {
    const savedProducts = JSON.parse(localStorage.getItem('products')) || [];
    const savedInventory = JSON.parse(localStorage.getItem('inventory')) || [];
    const savedUsageHistory = JSON.parse(localStorage.getItem('usageHistory')) || [];
    const savedStockInHistory = JSON.parse(localStorage.getItem('stockInHistory')) || [];
    setProducts(savedProducts);
    setInventory(savedInventory);
    setUsageHistory(savedUsageHistory);
    setStockInHistory(savedStockInHistory);
  }, []);

  useEffect(() => {
    localStorage.setItem('products', JSON.stringify(products));
    localStorage.setItem('inventory', JSON.stringify(inventory));
    localStorage.setItem('usageHistory', JSON.stringify(usageHistory));
    localStorage.setItem('stockInHistory', JSON.stringify(stockInHistory));
  }, [products, inventory, usageHistory, stockInHistory]);

  const addProduct = (newProduct) => {
    setProducts([...products, { ...newProduct, id: Date.now() }]);
  };

  const addInventory = (product, quantity) => {
    const existingItem = inventory.find(item => item.id === product.id);
    if (existingItem) {
      setInventory(inventory.map(item => 
        item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
      ));
    } else {
      setInventory([...inventory, { ...product, quantity }]);
    }
    setStockInHistory([...stockInHistory, { ...product, quantity, date: new Date() }]);
  };

  const updateInventory = (id, usedQuantity) => {
    setInventory(prevInventory => 
      prevInventory.map(item => 
        item.id === id ? { ...item, quantity: Math.max(0, item.quantity - usedQuantity) } : item
      )
    );
    const usedProduct = inventory.find(item => item.id === id);
    setUsageHistory([...usageHistory, { ...usedProduct, quantity: -usedQuantity, date: new Date() }]);
  };

  const _moveInventoryItem = (fromIndex, toIndex) => {
    // 함수 내용
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>모모아이 재고 관리 시스템</h1>
      </header>
      <button onClick={() => setShowProductForm(!showProductForm)}>
        {showProductForm ? '제품 추가 닫기' : '제품 추가'}
      </button>
      {showProductForm && <ProductForm addProduct={addProduct} />}
      <button onClick={() => setShowStockInForm(!showStockInForm)}>
        {showStockInForm ? '입고 닫기' : '입고'}
      </button>
      {showStockInForm && <StockInForm products={products} addInventory={addInventory} />}
      <InventoryList 
        inventory={inventory} 
        updateInventory={updateInventory}
      />
      <UsageReport inventory={inventory} usageHistory={usageHistory} stockInHistory={stockInHistory} />
    </div>
  );
}

export default App;
