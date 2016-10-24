// @flow

import { combineReducers, createStore, applyMiddleware } from 'redux';
import util from 'util';

import user, { actions, constants, selectors } from './user';

const initialState = {
  user: {
    name: 'test name',
  },
};

const rootReducer = combineReducers({
  user,
});

const middleware = (store) => (next) => (action /* : allActionsType */) => {
  if (action.type === constants.SET_USER_NAME) {
    process.stdout.write('an action has passed through!\n');
  }
  return next(action);
}

const store = createStore(rootReducer, initialState, applyMiddleware(middleware));

const initialName = selectors.getUserName(store.getState()) || 'NO NAME SET';

process.stdout.write(`user name initiated as: ${initialName}\n`);

const updateNameAndOutput = (text /* : ?string */) => {
  text = text ? text.replace('\n', '') : null;

  if (text) {
    store.dispatch(actions.setUserName(util.inspect(text)));

    const updatedName = selectors.getUserName(store.getState()) || 'STILL NO NAME';

    process.stdout.write(`user name is now: ${updatedName}\n`);
  } else {
    store.dispatch(actions.setUserName(123))
  }
};

process.stdin.resume();
process.stdin.setEncoding('utf8');
process.stdin.on('data', updateNameAndOutput);

/* flow-include

import type { nameType, userActionTypes } from './user';

type allActionsType = userActionTypes;

*/
