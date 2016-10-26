import { handleActions } from 'redux-actions';

import * as types from './constants';

const initialState = {};

export default handleActions({
  [types.LOAD]: state => state,
  [types.LOAD_OK]: state => state,
  [types.LOAD_FAIL]: state => state,
}, initialState);
