import {
  displayEquation,
  displayResult
} from './domSelectors';

/**
 * Get content of currently displayed result
 *
 * @return {string|number} - Current result text
 */
export const getDisplayResult = () => {
  return displayResult.textContent;
};

/**
 * Get content of currently displayed equation
 *
 * @return {string|number} - Current equation text
 */
export const getDisplayEquation = () => {
  return displayEquation.textContent;
};

/**
 * Set content of result
 *
 * @param {string} result - Result to be displayed
 */
export const updateDisplayResult = (result) => {
  displayResult.textContent = result;
};

/**
 * Set content of equation
 *
 * @param {string} equation - Equation to be displayed
 */
export const updateDisplayEquation = (equation) => {
  displayEquation.textContent = equation;
};