import {
  getKeyType,
  getOperatorAction
} from '../helpers/keyData';

/**
 * This function will update the state of
 * the calculator to allow for subsequent events
 *
 * @param {Object} key - 'key' DOM element
 * @param {string} uiResult - Current result displayed
 * @param {string} newResult - Updated result
 * @param {Object} currentState- Current state of calculator
 */
export const handleCalculatorState = (
  key,
  uiResult,
  newResult,
  currentState
) => {
  const {
    previousKeyType,
    firstValue,
    modifiedSecondValue
  } = currentState;

  const newState = currentState;
  const keyType = getKeyType(key);

  // Always set previousKeyType to that of current input
  newState.previousKeyType = keyType;

  // Type is number or decimal and previous type was equals - clear most of new state
  if (
      (
        keyType === 'number' ||
        keyType === 'decimal'
      ) &&
      previousKeyType === 'equals'
  ) {
    newState.firstValue = '';
    newState.modifiedSecondValue = '';
    newState.operatorAction = '';
  };

  // Type is operator
  if (keyType === 'operator') {
    // Set current operator action: 'divide', 'multiply', 'subtract', 'add'
    newState.operatorAction = getOperatorAction(key);

    if (
      firstValue &&
      previousKeyType !== 'operator' &&
      previousKeyType !== 'equals'
    ) {
      // for next calcuation should be new result eg. '3 x 5 x' => firstValue: '3' => '15'
      newState.firstValue = newResult;
    } else {
      // use currently displayed result eg. '3 x' => firstValue: '3'
      newState.firstValue = uiResult;
    };
  };

  // Type is equals
  if (keyType === 'equals') {
    if (
      firstValue &&
      previousKeyType === 'equals'
    ) {
      // for chained calcuation should repeat previous eg. '5 x 3 = =' => '5 x 3 x 3'
      newState.modifiedSecondValue = modifiedSecondValue;
    } else {
      // for next calcuation should be current result eg. '5x3' => modifiedSecondValue: '3'
      newState.modifiedSecondValue = uiResult;
    };
  };

  // Type is clear or save - clear new state
  if (keyType === 'clear' || keyType === 'save') {
    newState.firstValue = '';
    newState.modifiedSecondValue = '';
    newState.operatorAction = '';
    newState.previousKeyType = '';
  };
};