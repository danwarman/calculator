// Perform calculation and return result
export const simpleCalculation = (first, operatorAction, second) => {
  if (!first || !operatorAction || !second) return '';
  const lhs = parseFloat(first);
  const rhs = parseFloat(second);

  if (operatorAction === 'divide') return lhs / rhs;
  if (operatorAction === 'multiply') return lhs * rhs;
  if (operatorAction === 'subtract') return lhs - rhs;
  if (operatorAction === 'add') return lhs + rhs;
};