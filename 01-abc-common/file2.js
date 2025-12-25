/**
 * File2 - Data Export Module
 * 
 * This module exports sample data (variables a and b).
 * It demonstrates the CommonJS module export pattern.
 * 
 * Variables:
 * - a: number = 20
 * - b: number = 20
 * 
 * This module is used by file1.js for testing imports and operations.
 */

// CommonJS method - exporting variables
const a = 20;
const b = 20;

// Note: Uncomment to see module object structure
// console.log(module);

/**
 * Export data variables for use in other modules
 * @exports file2
 * @property {number} a - First data variable (value: 20)
 * @property {number} b - Second data variable (value: 20)
 */
module.exports = {a, b};
