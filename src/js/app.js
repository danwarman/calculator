import {
  keys
} from './helpers/domSelectors';

import {
  getDisplayResult,
  getDisplayEquation,
  updateDisplayResult,
  updateDisplayEquation
} from './helpers/ui';

keys.addEventListener('click', (e) => {
  const key = e.target;
  console.log('Key:', key);

  const uiResult = getDisplayResult();
  const uiEquation = getDisplayEquation();

  // 
  // 1. Determine 'display result' of key input
  // 2. Determine 'display equation' of key input

  // 3. Update state of calculator to allow for subsequent events

  // 4. Update UI for 'display result'
  updateDisplayResult('');

  // 5. Update UI for 'display equation'
  updateDisplayEquation('');

  // 6. Update UI for 'keypad state'

});