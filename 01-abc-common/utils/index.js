/**
 * Utils Index Module
 * 
 * This is the main entry point for all utility functions.
 * It re-exports the add and subtract functions from their respective modules.
 * This allows users to import all utilities from one place: require('./utils')
 */

const {add} = require('./add');
const {sub} = require('./sub');

/**
 * Central export point for all utility functions
 * @exports utils
 * @property {function} add - Addition function
 * @property {function} sub - Subtraction function
 * @example
 * const { add, sub } = require('./utils');
 * add(10, 5);  // Returns 15
 * sub(10, 5);  // Returns 5
 */
module.exports = { add, sub };