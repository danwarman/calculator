import {
  keys
} from './helpers/domSelectors';

import {
  getDisplayResult,
  getDisplayEquation,
  updateDisplayResult,
  updateDisplayEquation
} from './helpers/ui';

import {
  handleDisplay
} from './controllers/ui';

import {
  handleCalculatorState
} from './controllers/state';

const state = {
  firstValue: '',
  modifiedSecondValue: '',
  previousKeyType: '',
  operatorAction: ''
};

keys.addEventListener('click', (e) => {
  const key = e.target;
  const uiResult = getDisplayResult();
  const uiEquation = getDisplayEquation();

  // Determine 'display result' and 'display equation' of key input
  const newResultData = handleDisplay(
    key,
    uiResult,
    uiEquation,
    state
  );

  const newResult = newResultData.result;
  const newEquation = newResultData.equation;

  // Update state of calculator to allow for subsequent events
  handleCalculatorState(
    key,
    uiResult,
    newResult,
    state
  );

  // Update UI for 'display result' and 'display equation'
  updateDisplayResult(newResult);
  updateDisplayEquation(newEquation);
});