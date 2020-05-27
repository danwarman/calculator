/**
 * Perform calculation and return result
 *
 * @param {string|number} first - First part of calculation
 * @param {string} operatorAction - Operator action to perform
 * @param {string|number} second - Latter part of calculation
 * @return {number} - Result eg. '5', 'multiply', '3' => 5*3 = 15
 */
export const simpleCalculation = (first, operatorAction, second) => {
  if (!first || !operatorAction || !second) return '';
  const lhs = parseFloat(first);
  const rhs = parseFloat(second);

  if (operatorAction === 'divide') return lhs / rhs;
  if (operatorAction === 'multiply') return lhs * rhs;
  if (operatorAction === 'subtract') return lhs - rhs;
  if (operatorAction === 'add') return lhs + rhs;
};