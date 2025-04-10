import {configureStore, combineReducers} from '@reduxjs/toolkit';
import authReducer from './authSlice';
import cartReducer, {loadCart} from './cartSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {persistStore, persistReducer} from 'redux-persist';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['auth'], 
};

const rootReducer = combineReducers({
  auth: authReducer,
  cart: cartReducer,
});



const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
// Load cart on app start
(async () => {
  const stored = await AsyncStorage.getItem('@cart');
  if (stored) {
    store.dispatch(loadCart(JSON.parse(stored)));
  }
})();
