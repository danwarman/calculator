import {
  getKeyType,
  getKeyContent,
  resultContainsDecimal,
  equationContainsDecimal
} from '../helpers/keyData';

import {
  simpleCalculation
} from '../models/ui';

/**
 * This function determines the result and equation
 * to be displayed should be.
 *
 * @param {Object} key - 'key' DOM element
 * @param {string} uiResult - Current result displayed
 * @param {string} uiEquation - Current equation displayed
 * @param {Object} state - Current state of calculator
 * @return {Object} - {result: '', equation: ''}
 */
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

  // Set default display data
  const data = {result: 0, equation: ''};

  // Type is number
  if (keyType === 'number') {
    if (
      uiResult == '0' ||
      previousKeyType === 'operator' ||
      previousKeyType === 'equals'
    ) {
      // First input
      if (uiResult == '0') {
        data.result = keyContent; // eg. 5
        data.equation = keyContent; // eg. 5
      };

      if (previousKeyType === 'operator') {
        data.result = keyContent; // eg. 2
        data.equation = uiEquation + keyContent; //eg. 5 + 2
      };

      // Reset
      if (previousKeyType === 'equals') {
        data.result = '';
        data.equation = '';
      };
    } else {
      // If none of the above (previousKey was number or decimal):
      data.result = uiResult + keyContent; //eg. 28
      data.equation = uiEquation + keyContent; //eg. 5 + 28
    };
  };

  // Type is decimal
  if (keyType === 'decimal') {
    if (!previousKeyType) {
      data.result = '0' + keyContent; // '0.'
      data.equation = '0' + keyContent; // '0.'
    };

    // Check if result already contains a decimal & do nothing
    if (resultContainsDecimal(uiResult)) return data;

    // Check if last part of equation already contains a decimal & do nothing
    if (equationContainsDecimal(uiEquation, operatorAction)) return data;

    if (previousKeyType === 'number') {
      data.result = uiResult + keyContent; // eg. '5.'
      data.equation = uiEquation + keyContent; // eg. '5.'
    };

    if (
      previousKeyType === 'operator' ||
      previousKeyType === 'equals'
    ) {
      data.result = '0' + keyContent; // '0.'
      data.equation = uiEquation + '0' + keyContent; // eg. '5 + 0.'
    };
  };

  // Type is operator
  if (keyType === 'operator') {
    if (previousKeyType === 'number') {
      if (
        firstValue &&
        operatorAction
      ) {
        // Indicates multiple operators in equation - calculate result eg. '5 x 5 x'
        data.result = simpleCalculation(firstValue, operatorAction, uiResult);
      } else {
        data.result = uiResult; // eg. '5'
      }
      data.equation = uiEquation + keyContent; // eg. '5x5x'
    };

    if (previousKeyType === 'decimal') {
      if (
        firstValue &&
        operatorAction
      ) {
        // Indicates multiple operators in equation - calculate result eg. '5 x 5. x'
        data.result = simpleCalculation(firstValue, operatorAction, uiResult.slice(0, -1));
      } else {
        data.result = uiResult.slice(0, -1); // eg. '5.' => '5'
      }
      data.equation = uiEquation.slice(0, -1) + keyContent; // eg. '5. x' => '5 x'
    };

    if (previousKeyType === 'operator') {
      data.result = uiResult; // eg. '5'
      data.equation = uiEquation.slice(0, -1) + keyContent; // eg. '5 +' => '5 x'
    };

    if (previousKeyType === 'equals') {
      data.result = uiResult; // eg. '5'
      data.equation = uiResult + keyContent; // eg. '25 x'
    };
  };

  // Type is equals
  if (keyType === 'equals') {
    // If user hits 'equals' too early, we can't calculate a result
    if (firstValue) {
      if (previousKeyType === 'number') {
        data.result = simpleCalculation(firstValue, operatorAction, uiResult);
        data.equation = uiEquation + keyContent; // eg. '5 x 5 ='
      };

      if (previousKeyType === 'decimal') {
        data.result = simpleCalculation(firstValue, operatorAction, uiResult);
        data.equation = uiEquation.slice(0, -1) + keyContent; // eg. '5 x 5.' => '5 x 5 ='
      };

      if (previousKeyType === 'operator') {
        data.result = simpleCalculation(firstValue, operatorAction, uiResult);
        data.equation = uiEquation.slice(0, -1) + keyContent; // eg. '5 x 5 x' => '5 x 5 ='
      }

      if (previousKeyType === 'equals') {
        data.result = simpleCalculation(uiResult, operatorAction, modifiedSecondValue);
        data.equation = uiEquation + keyContent; // eg. '5 x 5 = ='
      };
    } else {
      // If firstValue is not set (req. for calc)
        data.result = uiResult;
        data.equation = uiEquation;
    };
  };

  // Type is clear - reset
  if (keyType === 'clear') return data;

  // Type is save - hit up PHP? & reset
  if (keyType === 'save') {
    // Save result
    // TODO

    return data;
  };

  return data;
};
