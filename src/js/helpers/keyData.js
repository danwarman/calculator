export const getKeyType = (key) => {
  const { dataset } = key;

  if (dataset.decimal) return 'decimal';
  if (dataset.action && dataset.action === 'clear') return 'clear';
  if (dataset.action && dataset.action === 'save') return 'save';
  if (dataset.operator && dataset.operator !== 'equals') return 'operator';
  if (dataset.operator && dataset.operator === 'equals') return 'equals';
  return 'number';
};

export const getKeyContent = (key) => {
  return key.textContent;
};

export const getOperatorSymbol = (operatorAction) => {
  if (!operatorAction) return '';

  if (operatorAction === 'divide') return '÷';
  if (operatorAction === 'multiply') return '×';
  if (operatorAction === 'subtract') return '−';
  if (operatorAction === 'add') return '+';
  if (operatorAction === 'equals') return '=';
};

export const stringContains = (string) => {
  return !!string.includes('.');
};

export const resultContainsDecimal = (result) => {
  return stringContains(result);
};

export const equationContainsDecimal = (equation, operatorAction) => {
  if (!operatorAction) return;

  // Get symbol for last used operator
  const operatorSymbol = getOperatorSymbol(operatorAction);
  // Get index of last used operator symbol
  const startIndex = equation.lastIndexOf(operatorSymbol);
  // Slice string to leave latter part for checking eg. '+ 5'
  const stringChunk = equation.slice(startIndex);

  return stringContains(stringChunk);
};