const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

router.get('/inventory', async (req, res) => {
  try {
    const products = await Product.find();
    const report = products.map(product => ({
      name: product.name,
      material: product.material,
      thickness: product.thickness,
      currentQuantity: product.quantity,
      transactions: product.transactions.map(t => ({
        type: t.type,
        quantity: t.quantity,
        date: t.date
      }))
    }));
    res.json(report);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('서버 오류');
  }
});

module.exports = router;

