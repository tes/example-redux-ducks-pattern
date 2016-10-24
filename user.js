// @flow

import { combineReducers } from 'redux';
import { createSelector }from 'reselect';

const defaultName = null;

export const constants = {
  SET_USER_NAME: 'user/SET_USER_NAME',
  RESET_USER_NAME: 'user/RESET_USER_NAME',
};

export const actions = {
  setUserName(name /* : ?string */) /* : setUserNameType */ {
    return {
      type: constants.SET_USER_NAME,
      payload: name,
    };
  },
  resetUserName() /* : resetUserNameType */ {
    return {
      type: constants.RESET_USER_NAME,
      payload: defaultName,
    }
  }
};

const getRootSelector = (state) => state.user;

const getUserName = createSelector(
  getRootSelector,
  ({ name }) /* : nameType */ => name
);

export const selectors = {
  getUserName,
};

export default combineReducers({
  name: (state /* : nameType */, action /* : userActionTypes */) => {
    switch (action.type) {
      case constants.SET_USER_NAME: return action.payload || state;
      default: return state || defaultName;
    }
  },
});

/* flow-include

export type nameType = string | null;

type setUserNameType = {
  type: string,
  payload: ?string,
};

type resetUserNameType = {
  type: string,
  payload: null,
};

export type userActionTypes = setUserNameType | resetUserNameType;

*/
