/**
 * File1 - Main Application File
 * 
 * This is the main entry point of the application.
 * It demonstrates:
 * 1. CommonJS destructuring with alias (renaming variables)
 * 2. Importing from multiple files
 * 3. Using utility functions for arithmetic operations
 * 
 * Destructuring pattern:
 * - { a: c } = renaming 'a' to 'c' from file2
 * - { b } = importing 'b' from file2
 * - { a } = importing 'a' from file3
 * - { add, sub } = importing utilities from utils/index.js
 */

// CommonJS method - destructuring with alias name change
const { a: c, b } = require('./file2');      // Import a (renamed to c) and b from file2
const { a } = require('./file3');             // Import a from file3

// Alternative (commented out): Import individual utility functions
// const { add } = require('./utils/add')
// const { sub } = require('./utils/sub');

// Recommended: Import all utilities from index
const {add , sub} = require('./utils');

// Test outputs
console.log("test: ", c, b);                  // Display imported variables

console.log("add: ", add(a, b));              // Demonstrate add function
console.log("sub: ", sub(a, b));              // Demonstrate subtract function

