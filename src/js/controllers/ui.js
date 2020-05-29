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
    // First input
    if (uiResult == '0') return {
      result: keyContent, // eg. 5
      equation: keyContent // eg. 5
    };

    if (previousKeyType === 'operator') return {
      result: keyContent, // eg. 2
      equation: uiEquation + keyContent //eg. 5 + 2
    };

    // Reset
    if (previousKeyType === 'equals') return {
      result: keyContent,
      equation: keyContent
    };

    // If none of the above (previousKey was number or decimal):
    return {
      result: uiResult + keyContent, //eg. 28
      equation: uiEquation + keyContent //eg. 5 + 28
    }
  };

  // Type is decimal
  if (keyType === 'decimal') {
    // First input or reset
    if (
      !previousKeyType ||
      previousKeyType === 'equals'
    ) return {
      result: '0' + keyContent, // '0.'
      equation: '0' + keyContent // '0.'
    };

    // Check if result already contains a decimal & do nothing
    if (resultContainsDecimal(uiResult)) return data;

    // Check if last part of equation already contains a decimal & do nothing
    if (equationContainsDecimal(uiEquation, operatorAction)) return data;

    if (previousKeyType === 'number') return {
      result: uiResult + keyContent, // eg. '5.'
      equation: uiEquation + keyContent // eg. '5.'
    };

    if (previousKeyType === 'operator') return {
      result: '0' + keyContent, // '0.'
      equation: uiEquation + '0' + keyContent // eg. '5 + 0.'
    };
  };

  // Type is operator
  if (keyType === 'operator') {
    if (
      previousKeyType === 'number' ||
      previousKeyType === 'decimal'
    ) {
      if (
        firstValue &&
        operatorAction
      ) {
        // Indicates multiple operators in equation - calculate result eg. '5 x 5 x'
        data.result = simpleCalculation(firstValue, operatorAction, uiResult);
      } else {
        // Indicates first operator and incomplete equation
        if (previousKeyType === 'number') {
          data.result = uiResult; // eg. '5'
        };

        if (previousKeyType === 'decimal') {
          data.result = uiResult.slice(0, -1); // eg. '5.' => '5'
        };
      };

      // Add to the equation
      if (previousKeyType === 'number') {
        data.equation = uiEquation + keyContent; // eg. '5x5x'
      };

      // Remove trailing . and add to the equation
      if (previousKeyType === 'decimal') {
        data.equation = uiEquation.slice(0, -1) + keyContent; // eg. '5. x' => '5 x'
      };

      return data;
    };

    if (
      previousKeyType === 'operator' ||
      previousKeyType === 'equals'
    ) {
      // Replace existing operator
      if (previousKeyType === 'operator') {
        data.equation = uiEquation.slice(0, -1) + keyContent; // eg. '5 +' => '5 x'
      };

      // Clearer equation - recent result + operator
      if (previousKeyType === 'equals') {
        data.equation = uiResult + keyContent; // eg. '25 x'
      };

      // No change to result - use current
      data.result = uiResult; // eg. '5'

      return data;
    };
  };

  // Type is equals
  if (keyType === 'equals') {
    // If user hits 'equals' too early, we can't calculate a result so check firstValue
    if (firstValue) {
      if (
        previousKeyType === 'number' ||
        previousKeyType === 'decimal' ||
        previousKeyType === 'operator' ||
        previousKeyType === 'equals'
      ) {
        if (
          previousKeyType === 'number' ||
          previousKeyType === 'equals'
        ) {
          data.equation = uiEquation + keyContent; // eg. '5 x 5 = ='
        };

        if (
          previousKeyType === 'decimal' ||
          previousKeyType === 'operator'
        ) {
          data.equation = uiEquation.slice(0, -1) + keyContent; // eg. '5 x 5.' => '5 x 5 ='
        };

        if (previousKeyType === 'equals') {
          // Current result, 'op', recent second value eg. '5 x 3 = =' => '15 x 3'
          data.result = simpleCalculation(uiResult, operatorAction, modifiedSecondValue);
        } else {
          // firstValue, 'op', Current result eg. '5 x 3'
          data.result = simpleCalculation(firstValue, operatorAction, uiResult);
        };
      };

      return data;
    };

    // No firstValue so cannot perform calculation - as is
    return {
      result: uiResult,
      equation: uiEquation
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
};
