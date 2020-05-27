// 1. Determine 'display result' of key input
// 2. Determine 'display equation' of key input

// handleDisplay()
// handleKeypad()

import {
  getKeyType,
  getKeyContent,
  resultContainsDecimal,
  equationContainsDecimal
} from '../helpers/keyData';

// For each input, check the keyType to determine how to handle the display
// key content = value of current key

export const handleDisplay = (
  key,
  uiResult,
  uiEquation,
  state
) => {
  const keyType = getKeyType(key);
  const keyContent = getKeyContent(key);

  // Deconstruct state
  const {
    previousKeyType,
    operatorAction
  } = state;

  // < TESTING
  console.log('ui-c | key:', key);
  console.log('ui-c | uiResult:', uiResult);
  console.log('ui-c | uiEquation:', uiEquation);
  console.log('ui-c | state:', state);
  console.log('ui-c | keyType:', keyType);
  console.log('ui-c | keyContent:', keyContent);
  // TESTING >

  // Store result data: `.result`, `.equation`
  const data = {
    result: '',
    equation: ''
  };

  // Type is number
  if (keyType === 'number') {
    if (
      uiResult == '0' ||
      previousKeyType === 'operator' ||
      previousKeyType === 'equals'
    ) {
      // If the current UI result is 0 - it's the first input
      // UI result: key content eg. 5
      // UI equation: key content eg. 5
      if (uiResult == '0') {
        data.result = keyContent;
        data.equation = keyContent;
      };

      // If previous key was operator
        // UI result: key content eg. 2
        // UI equation: UI equation + key content eg. 5 + 2
      if (previousKeyType === 'operator') {
        data.result = keyContent;
        data.equation = uiEquation + keyContent;
      };

      // If previous key was equals - reset for new calculation
        // UI result: key content
        // UI equation: key content
      if (previousKeyType === 'equals') {
        data.result = '';
        data.equation = '';
      };
    } else {
      // If none of the above (previousKey was number or decimal):
      // UI result: UI result + key content eg. 28
      // UI equation: UI equation + key content eg. 5 + 28
      data.result = uiResult + keyContent;
      data.equation = uiEquation + keyContent;
    };
  };

  // Type is decimal
  if (keyType === 'decimal') {
    // If current UI result contains a decimal already
      // Do nothing
    if (resultContainsDecimal(uiResult)) return;

    // If current UI equation contains decimal is last part of equation eg (5 + 6.2)
    // Do nothing
    if (equationContainsDecimal(uiEquation, operatorAction)) return;

    // If previous key was number
      // UI result: UI result + key content ('x.')
      // UI equation: UI equation + key content ('x.')
    // If previous key was operator
      // UI result: '0' + key content ('0.')
      // UI equation: '0' + key content ('0.')
    // If previous key was equals - reset for new calculation
      // UI result: '0' + key content ('0.')
      // UI equation: '0' + key content ('0.')
  };

  // Type is operator
  if (keyType === 'operator') {
    // If previous key was number
      // UI result: UI result
      // UI equation: UI equation + key content (operator symbol)
    // If previous key was decimal
      // UI result: UI result - decimal
      // UI equation: UI equation - decimal + key content (operator symbol)
    // If previous key was operator
      // UI result: UI result
      // UI equation: UI equation - previous key content (operator symbol) + key content (operator symbol)
    // If previous key was equals
      // UI result: UI result
      // UI equation: UI result + key content (operator symbol)
  };

  // Type is equals
  if (keyType === 'equals') {
    // If previous key was number
    // UI result: Calculated Result
    // UI equation: UI equation + key content (= symbol)
    // If previous key was decimal
    // UI result: Calculated Result
    // UI equation: UI equation - previous key content (decimal symbol) + key content (= symbol)
    // If previous key was operator or equals
    // UI result: Calculated Result
    // UI equation: UI equation + key content (= symbol)
  };

  // Type is clear
  if (keyType === 'clear') {
    // UI result: 0
    // UI equation: ''
  };

  // Type is save
  if (keyType === 'save') {
    // Save result

    // UI result: 0
    // UI equation: ''
  };

  // TODO
  return data;
};
