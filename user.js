const { combineReducers } = require('redux');
const { createSelector } = require('reselect');

const constants = {
  SET_USER_NAME: 'user/SET_USER_NAME',
};

const actions = {
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

const selectors = {
  getUserName,
};

const user = combineReducers({
  name: (state = '', action) => {
    switch (action.type) {
      case constants.SET_USER_NAME: return action.payload;
      default: return state;
    }
  },
});

user.constants = constants;
user.actions = actions;
user.selectors = selectors;

module.exports = user;
