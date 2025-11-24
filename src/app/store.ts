import { configureStore } from '@reduxjs/toolkit';
// Example slice import (add actual slices as you migrate state)
import tokenReducer from './slices/tokenSlice';
import tabsReducer from './slices/tabsSlice';
import presetReducer from './slices/presetSlice';

const store = configureStore({
  reducer: {
    token: tokenReducer,
    tabs: tabsReducer,
    preset: presetReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
