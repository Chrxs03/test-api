const express = require('express');
const router = express.Router();

router.get('/:id/products/:productId', (req, res) => {
  const { id, productId } = req.params;
  res.json({
    name: `Producto ${productId} de la categoria ${id}`,
    price: 1000,
  });
});

module.exports = router;
