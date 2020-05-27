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

    // Type is operator
      // Set current operator action ('divide', 'multiply', 'subtract', 'add') to state

      // Update new firstValue
        // If current firstValue is not empty &&
        // If previous key is not operator &&
        // If previous key is not equals
          // new firstValue = calculated result
        // Else
          // new firstValue = current UI result

    // Type is equals
      // Update new modifiedSecondValue
        // If current firstValue is not empty &&
        // If previous key is not equals
          // new modifiedSecondValue = current modifiedSecondValue
        // Else
          // new modifiedSecondValue = current UI result

    // Type is clear
      // Set all properties to empty

