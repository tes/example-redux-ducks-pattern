import { combineReducers } from 'redux';
import { createSelector }from 'reselect';

export const constants = {
  SET_USER_NAME: 'user/SET_USER_NAME',
};

export const actions = {
  setUserName(name) {
    return {
      type: constants.SET_USER_NAME,
      payload: name,
    };
  },
};

const getRootSelector = (state) => state.user;

const getUserName = createSelector(
  getRootSelector,
  ({ name }) => name
);

export const selectors = {
  getUserName,
};

export default combineReducers({
  name: (state, action) => {
    switch (action.type) {
      case constants.SET_USER_NAME: return action.payload;
      default: return state || '';
    }
  },
});
