import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar">
      <Link to="/">대시보드</Link>
      <Link to="/inventory">재고 현황</Link>
      <Link to="/add-product">제품 추가</Link>
      <Link to="/stock-in">입고</Link>
      <Link to="/report">보고서</Link>
    </nav>
  );
};

export default Navbar;
