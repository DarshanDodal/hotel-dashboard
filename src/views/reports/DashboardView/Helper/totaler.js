module.exports.sum = cart => {
  let total = 0;
  cart.forEach(item => {
    const price = parseInt(item.amount);
    const quantity = item.quantity;
    const subTotal = price * quantity;
    total = total + subTotal;
  });
  return total;
};

module.exports.quantity = cart => {
  let tQty = 0;
  cart.forEach(item => {
    const quantity = item.quantity;
    tQty = tQty + quantity;
  });
  return tQty;
};
