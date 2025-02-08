/**
 * Calculates the total price of a list of products
 * @param {Array} products - Array of product objects containing a 'price' property
 * @returns {number} - The total sum of all product prices
 */
export const totalPrice = (products) => {
  return products.reduce((sum, product) => sum + product.price, 0);
};


