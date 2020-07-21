const express = require('express');
const cartsRepo = require('../repositories/carts');

const router = express.Router();

// Receive a post request to add an item to a cart

router.post('/cart/products', async (req, res) => {
  let cart;
  if (!req.session.cartId) {
    cart = await cartsRepo.create({ items: [] });
    req.session.cartId = cart.id;
  }
  else {
    cart = await cartsRepo.getOne(req.session.cartId);
  }

  const existingItem = cart.items.find((item) => item.id === req.body.productId);

  if (existingItem) {
    existingItem.quantity++;
  }
  else {
    cart.items.push({ id: req.body.productId, quantity: 1 });
  }

  await cartsRepo.update(cart.id, {
    items : cart.items
  });

  res.send('Product added to cart');
});

// Receive a GET request to show all items in cart

// Receive a post request to delete an item in the cart

module.exports = router;
