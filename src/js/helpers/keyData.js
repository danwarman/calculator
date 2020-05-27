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