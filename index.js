const { combineReducers, createStore, applyMiddleware } = require('redux');
const util = require('util');

const user = require('./user');

const initialState = {
  user: {
    name: 'test name',
  },
};

const rootReducer = combineReducers({
  user,
});

const middleware = (store) => (next) => (action) => {
  if (action.type === user.constants.SET_USER_NAME) {
    process.stdout.write('an action has passed through!\n');
  }
  return next(action);
}

const store = createStore(rootReducer, initialState, applyMiddleware(middleware));

const initialName = user.selectors.getUserName(store.getState());

process.stdout.write(`user name initiated as: ${initialName}\n`);

const updateNameAndOutput = (text) => {
  text = text.replace('\n', '');

  if (text) {
    store.dispatch(user.actions.setUserName(util.inspect(text)));

    const updatedName = user.selectors.getUserName(store.getState());

    process.stdout.write(`user name is now: ${updatedName}\n`);
  }
};

process.stdin.resume();
process.stdin.setEncoding('utf8');
process.stdin.on('data', updateNameAndOutput);
