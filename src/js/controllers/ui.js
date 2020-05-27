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

import {
  simpleCalculation
} from '../models/ui';

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
    operatorAction,
    firstValue,
    modifiedSecondValue
  } = state;

  // Store result data: `.result`, `.equation`
  const data = {
    result: 0,
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
    if (resultContainsDecimal(uiResult)) return data;

    // If current UI equation contains decimal is last part of equation eg (5 + 6.2)
    // Do nothing
    if (equationContainsDecimal(uiEquation, operatorAction)) return data;

    // If previous key was number
    // UI result: UI result + key content ('x.')
    // UI equation: UI equation + key content ('x.')
    if (previousKeyType === 'number') {
      data.result = uiResult + keyContent;
      data.equation = uiEquation + keyContent;
    };

    // If previous key was operator
      // UI result: '0' + key content ('0.')
      // UI equation: '0' + key content ('0.')
    // If previous key was equals - reset for new calculation
      // UI result: '0' + key content ('0.')
      // UI equation: '0' + key content ('0.')
    if (
      previousKeyType === 'operator' ||
      previousKeyType === 'equals'
    ) {
      data.result = '0' + keyContent;
      data.equation = '0' + keyContent;
    };
  };

  // Type is operator
  if (keyType === 'operator') {
    // If previous key was number
      // firstValue && operatorAction set - indicate multiple operators
        // UI result: calculation(firstValue, operatorAction, UI result)
        // UI equation: UI equation + key content (operator symbol)
      // else
        // UI result: UI result
        // UI equation: UI equation + key content (operator symbol)
    if (previousKeyType === 'number') {
      if (
        firstValue &&
        operatorAction
      ) {
        data.result = simpleCalculation(firstValue, operatorAction, uiResult);
      } else {
        data.result = uiResult;
      }
      data.equation = uiEquation + keyContent;
    };
    // If previous key was decimal
      // firstValue && operatorAction set - indicate multiple operators
        // UI result: calculation(firstValue, operatorAction, UI result)
        // UI equation: UI equation - decimal + key content (operator symbol)
      // else
        // UI result: UI result - decimal
        // UI equation: UI equation - decimal + key content (operator symbol)
    if (previousKeyType === 'decimal') {
      if (
        firstValue &&
        operatorAction
      ) {
        data.result = simpleCalculation(firstValue, operatorAction, uiResult.slice(0, -1));
      } else {
        data.result = uiResult.slice(0, -1);
      }
      data.equation = uiEquation.slice(0, -1) + keyContent;
    };

    // If previous key was operator
      // UI result: UI result
      // UI equation: UI equation - previous key content (operator symbol) + key content (operator symbol)
    if (previousKeyType === 'operator') {
      data.result = uiResult;
      data.equation = uiEquation.slice(0, -1) + keyContent;
    };
    // If previous key was equals
      // UI result: UI result
      // UI equation: UI result + key content (operator symbol)
    if (previousKeyType === 'equals') {
      data.result = uiResult;
      data.equation = uiResult + keyContent;
    };
  };

  // Type is equals
  if (keyType === 'equals') {
    if (firstValue) {
      // If previous key was number
        // UI result: Calculated Result
        // UI equation: UI equation + key content (= symbol)
      if (previousKeyType === 'number') {
        data.result = simpleCalculation(firstValue, operatorAction, uiResult);
        data.equation = uiEquation + keyContent;
      };

      // If previous key was decimal
        // UI result: Calculated Result
        // UI equation: UI equation - previous key content (decimal symbol) + key content (= symbol)
      if (previousKeyType === 'decimal') {
        data.result = simpleCalculation(firstValue, operatorAction, uiResult);
        data.equation = uiEquation.slice(0, -1) + keyContent;
      };

      // If previous key was operator
        // UI result: Calculated Result
        // UI equation: UI equation + key content (= symbol)
      if (previousKeyType === 'operator') {
        data.result = simpleCalculation(firstValue, operatorAction, uiResult);
        data.equation = uiEquation.slice(0, -1) + keyContent;
      }

      // If previous key was equals
        // UI result: Calculated Result
        // UI equation: UI equation + key content (= symbol)
      if (previousKeyType === 'equals') {
        data.result = simpleCalculation(uiResult, operatorAction, modifiedSecondValue);
        data.equation = uiEquation + keyContent;
      };
    } else {
      // If firstValue is not set (req. for calc)
        data.result = uiResult;
        data.equation = uiEquation;
    };
  };

  // Type is clear
    // UI result: 0
    // UI equation: ''
  if (keyType === 'clear') return data;

  // Type is save
  if (keyType === 'save') {
    // Save result
    // TODO

    // UI result: 0
    // UI equation: ''
    return data;
  };

  return data;
};
