
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import rootReducer from '../reducer';
import { createStore , applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

const persistConfig = {
  key: 'root',
  storage,
  /* blacklist: ['purchasedEnvelopes'] */
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create the Redux store
export const store = createStore(persistedReducer,composeWithDevTools(applyMiddleware(thunk)));

// Create the persistor
export const persistor = persistStore(store);

