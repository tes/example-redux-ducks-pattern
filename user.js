// @flow

import { combineReducers } from 'redux';
import { createSelector }  from 'reselect';

export const constants = {
  SET_USER_NAME: 'user/SET_USER_NAME',
};

export const actions = {
  setUserName(name /* : ?name */) /* : setUserNameAction */ {
    return {
      type: constants.SET_USER_NAME,
      payload: name,
    };
  },
};

const getRootSelector = (state) /* : { name: name } */ => state.user;

const getUserName = createSelector(
  getRootSelector,
  (user) /* : name */ => user.name
);

export const selectors = {
  getUserName,
};

export default combineReducers({
  name: (state /* : name */, action /* : userAction */) => {
    switch (action.type) {
      case constants.SET_USER_NAME: return action.payload || state;
      default: return state || '';
    }
  },
});

/* flow-include

export type name = string;

export type setUserNameAction = {
  type: string,
  payload: ?name
};

export type userAction = setUserNameAction;

*/
