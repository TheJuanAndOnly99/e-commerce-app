const express = require('express');
const cartsRepo = require('../repositories/carts');

const router = express.Router();

// Receive a post request to add an item to a cart

router.post('/cart/products', async (req, res) => {
  let cart;
  if (!req.session.cartId) {
    cart = await cartsRepo.create({ item: [] });
    req.session.cartId = cart.id;
  }
  else {
    cart = await cartsRepo.getOne(req.session.cartId);
  }

  console.log(cart);

  res.send('Product added to cart');
});

// Receive a GET request to show all items in cart

// Receive a post request to delete an item in the cart

module.exports = router;
