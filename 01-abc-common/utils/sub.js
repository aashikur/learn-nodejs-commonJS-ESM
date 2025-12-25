/**
 * Subtract Utility Module
 * 
 * This module provides a subtraction function that subtracts one number from another.
 * It uses CommonJS module system (module.exports).
 */

/**
 * Subtracts one number from another and returns the result
 * @param {number} x - First number (minuend)
 * @param {number} y - Second number (subtrahend)
 * @returns {number} The difference of x minus y
 * @example
 * const { sub } = require('./sub');
 * sub(20, 5); // Returns 15
 */
const sub = (x, y) => {
  return x - y;
}

module.exports = { sub };