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

const middleware = (store) => (next) => (action) => {
  if (action.type === constants.SET_USER_NAME) {
    process.stdout.write('an action has passed through!\n');
  }
  return next(action);
}

const store = createStore(rootReducer, initialState, applyMiddleware(middleware));

const initialName = selectors.getUserName(store.getState());

process.stdout.write(`user name initiated as: ${initialName}\n`);

const updateNameAndOutput = (text) => {
  text = text.replace('\n', '');

  if (text) {
    store.dispatch(actions.setUserName(util.inspect(text)));

    const updatedName = selectors.getUserName(store.getState());

    process.stdout.write(`user name is now: ${updatedName}\n`);
  }
};

process.stdin.resume();
process.stdin.setEncoding('utf8');
process.stdin.on('data', updateNameAndOutput);
