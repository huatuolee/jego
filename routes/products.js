const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// 모든 제품 가져오기
router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 새 제품 추가
router.post('/', async (req, res) => {
  const product = new Product({
    name: req.body.name,
    material: req.body.material,
    thickness: req.body.thickness,
    quantity: req.body.quantity
  });

  try {
    const newProduct = await product.save();
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// 제품 수량 업데이트
router.patch('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product == null) {
      return res.status(404).json({ message: '제품을 찾을 수 없습니다' });
    }
    if (req.body.quantity != null) {
      product.quantity = req.body.quantity;
    }
    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
