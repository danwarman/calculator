// 3. Update state of calculator to allow for subsequent events

// handleCalculatorState()
  // Will handle the state of the calculator

  // State will contain values necessary for calculation
  /**
   * { firstValue: '', modifiedSecondValue: '', previousKeyType: '', operatorAction: ''}
   *
   * 'firstValue': number to be used when a simple calculation is to be made
   *   eg. `5 + 6`. firstValue is '5'
   * 'modifiedSecondValue': number to be used for chained calculations
   *   eg. `20 + 5 =`. firstValue is '20', modifiedSecondValue is '5'.
   *      if user again taps `=`: `20 + 5 ==`, calculation will be `(20+5)+5`
   * 'previousKeyType': type of key pressed before this - 'operator', 'number', 'decimal', 'equals', ...
   * 'operatorAction': most recent operator type - 'divide', 'multiply', 'subtract', 'add'
   */

  //  State change only needs to occur when a calculation is to be made or reset
    // Key type: operator, equals, clear, save

  import {
    getKeyType
  } from '../helpers/keyData';

  export const handleCalculatorState = (
    key,
    uiResult,
    uiEquation,
    currentState
  ) => {
    const {
      previousKeyType,
      operatorAction,
      firstValue,
      modifiedSecondValue
    } = currentState;

    const newState = currentState;
    const keyType = getKeyType(key);
    const keyAction = getOperatorAction(key);

    // < TESTING
    console.log('st-c | key:', key);
    console.log('st-c | uiResult:', uiResult);
    console.log('st-c | uiEquation:', uiEquation);
    console.log('st-c | currentState:', currentState);
    console.log('st-c | keyType:', keyType);
    // TESTING >

    // Always set previousKeyType to that of current input
    newState.previousKeyType = keyType;

    // Type is operator
    if (keyType === 'operator') {
      // Set current operator action ('divide', 'multiply', 'subtract', 'add') to state
      newState.operatorAction = keyAction;

      // Update new firstValue
        // If current firstValue is not empty &&
        // If previous key is not operator &&
        // If previous key is not equals
          // new firstValue = calculated result
        // Else
          // new firstValue = current UI result
    };

    // Type is equals
    if (keyType === 'equals') {
      // Update new modifiedSecondValue
        // If current firstValue is not empty &&
        // If previous key is not equals
          // new modifiedSecondValue = current modifiedSecondValue
        // Else
          // new modifiedSecondValue = current UI result
    };

    // Type is clear or save
    if (keyType === 'clear' || keyType === 'save') {
      // Set all properties to empty
    };
};