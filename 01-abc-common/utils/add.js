/**
 * Add Utility Module
 * 
 * This module provides an addition function that adds two numbers together.
 * It uses CommonJS module system (module.exports).
 */

/**
 * Adds two numbers and returns the result
 * @param {number} x - First number
 * @param {number} y - Second number
 * @returns {number} The sum of x and y
 * @example
 * const { add } = require('./add');
 * add(5, 10); // Returns 15
 */
const add = (x, y) => {
  return x + y;
}

module.exports = { add };