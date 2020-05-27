import {
  displayEquation,
  displayResult
} from './domSelectors';

export const getDisplayResult = () => {
  return displayResult.textContent;
};

export const getDisplayEquation = () => {
  return displayEquation.textContent;
};

export const updateDisplayResult = (result) => {
  displayResult.textContent = result;
};

export const updateDisplayEquation = (result) => {
  displayEquation.textContent = result;
};