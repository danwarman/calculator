// 1. Determine 'display result' of key input
// 2. Determine 'display equation' of key input

// handleDisplay()
// handleKeypad()

import {
  getKeyType,
  getKeyContent
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

  // Type is number
    // If the current UI result is 0 - it's the first input
      // UI result: key content eg. 5
      // UI equation: key content eg. 5
    // If previous key was operator
      // UI result: key content eg. 2
      // UI equation: UI equation + key content eg. 5 + 2
    // If previous key was equals - reset for new calculation
      // UI result: key content
      // UI equation: key content
    // If none of the above (previousKey was number or decimal):
      // UI result: UI result + key content eg. 28
      // UI equation: UI equation + key content eg. 5 + 28

  // Type is decimal
    // If current UI result contains a decimal already
      // Do nothing
    // If current UI equation contains decimal is last part of equation eg (5 + 6.2)
      // Do nothing

    // If previous key was number
      // UI result: UI result + key content ('x.')
      // UI equation: UI equation + key content ('x.')
    // If previous key was operator
      // UI result: '0' + key content ('0.')
      // UI equation: '0' + key content ('0.')
    // If previous key was equals - reset for new calculation
      // UI result: '0' + key content ('0.')
      // UI equation: '0' + key content ('0.')

  // Type is operator
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

  // Type is clear
    // UI result: 0
    // UI equation: ''

  // Type is equals
    // If previous key was number
      // UI result: Calculated Result
      // UI equation: UI equation + key content (= symbol)
    // If previous key was decimal
      // UI result: Calculated Result
      // UI equation: UI equation - previous key content (decimal symbol) + key content (= symbol)
    // If previous key was operator or equals
      // UI result: Calculated Result
      // UI equation: UI equation + key content (= symbol)

  return {
    'result': '',
    'equation': ''
  };
};
