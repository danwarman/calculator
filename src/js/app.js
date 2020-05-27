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
} from './controllers/ui'

const state = {
  firstValue: '',
  modifiedSecondValue: '',
  previousKeyType: '',
  operatorAction: ''
};

keys.addEventListener('click', (e) => {
  const key = e.target;
  console.log('Key:', key);

  const uiResult = getDisplayResult();
  const uiEquation = getDisplayEquation();

  // 1. Determine 'display result' of key input
  // 2. Determine 'display equation' of key input
  const newResultData = handleDisplay(
    key,
    uiResult,
    uiEquation,
    state
  );
  const newResult = newResultData.result;
  const newEquation = newResultData.equation;

  // 3. Update state of calculator to allow for subsequent events

  // 4. Update UI for 'display result'
  updateDisplayResult(newResult);

  // 5. Update UI for 'display equation'
  updateDisplayEquation(newEquation);

  // 6. Update UI for 'keypad state'

});