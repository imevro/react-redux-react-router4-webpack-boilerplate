import { createStore, combineReducers, applyMiddleware, compose } from 'redux';

// middlewares
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';

// enhancers
import { autoRehydrate } from 'redux-persist';

// reducers
export const reducer = combineReducers({
  // reducers
});

const logger = createLogger({
  collapsed: true,
  duration: true,
  colors: {
    prevState: () => `#9E9E9E`,
    action: () => `#03A9F4`,
    nextState: () => `#4CAF50`,
    error: () => `#F20404`,
    title: ({ type }) => {
      if (type.indexOf(`started`) > -1) return `orange`;
      if (type.indexOf(`failed`) > -1) return `#F20404`;
      if (type.indexOf(`succeeded`) > -1) return `#4CAF50`;
      if (type.indexOf(`update`) > -1) return `#03A9F4`;

      return `inherit`;
    },
  },
});

const store = compose(
  autoRehydrate(),
  applyMiddleware(thunk, logger),
)(createStore)(reducer);

export default store;
