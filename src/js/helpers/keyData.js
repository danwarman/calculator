/**
 * Get the type of key
 *
 * @param {Object} key - 'key' DOM element
 * @return {string} - Result - 'decimal', 'clear', 'save', 'operator', 'equals', 'number'
 */
export const getKeyType = (key) => {
  const { dataset } = key;

  if (dataset.decimal) return 'decimal';
  if (dataset.operator && dataset.operator !== 'equals') return 'operator';
  if (dataset.operator && dataset.operator === 'equals') return 'equals';
  if (dataset.action && dataset.action === 'clear') return 'clear';
  if (dataset.action && dataset.action === 'save') return 'save';

  return 'number';
};

/**
 * Get the content from the key
 *
 * @param {Object} key - 'key' DOM element
 * @return {string|number} - Result
 */
export const getKeyContent = (key) => {
  return key.textContent;
};

/**
 * Get the operator action from the key
 *
 * @param {Object} key - 'key' DOM element
 * @return {string} - Result - one of: 'divide', 'multiply', 'subtract', 'add', 'equals'
 */
export const getOperatorAction = (key) => {
  if (!key) return '';
  const { dataset } = key;

  return dataset.operator;
};

/**
 * Get the operator symbol from the operator action
 *
 * @param {Object} operatorAction - One of: 'divide', 'multiply', 'subtract', 'add', 'equals'
 * @return {string} - The mathematical symbol per UI
 */
export const getOperatorSymbol = (operatorAction) => {
  if (!operatorAction) return '';

  if (operatorAction === 'divide') return '÷';
  if (operatorAction === 'multiply') return '×';
  if (operatorAction === 'subtract') return '−';
  if (operatorAction === 'add') return '+';
  if (operatorAction === 'equals') return '=';
};

/**
 * Simple 'string contains' method
 *
 * @param {string} string - Any string - 'haystack'
 * @param {string|number} el - Any element - 'needle'
 * @return {boolean} - If 'needle' found in 'haystack' return true
 */
export const stringContains = (string, el) => {
  return !!string.includes(el);
};

/**
 * Method specifically for checking decimal in result
 *
 * @param {string} result - Displayed result - 'haystack'
 * @return {boolean} - If 'needle' found in 'haystack' return true
 */
export const resultContainsDecimal = (result) => {
  return !!stringContains(result, '.');
};

/**
 * Method specifically for checking decimal in equation
 * We specifically want to ensure that we're only checking the
 * final part of the equation after an operator so not to incorrectly
 * prevent a decimal being added in cases such as this '5.5 x 2.5'.
 * In this case it would have otherwise found the '.' and shown '5.5 x 25'.
 *
 * @param {string} result - Displayed result - 'haystack'
 * @return {boolean} - If 'needle' found in 'haystack' return true
 */
export const equationContainsDecimal = (equation, operatorAction) => {
  if (!operatorAction) return;

  // Get symbol for last used operator
  const operatorSymbol = getOperatorSymbol(operatorAction);
  // Get index of last used operator symbol
  const startIndex = equation.lastIndexOf(operatorSymbol);
  // Slice string to leave latter part for checking eg. '+ 5'
  const stringChunk = equation.slice(startIndex);

  return !!stringContains(stringChunk, '.');
};