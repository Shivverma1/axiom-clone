import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface TokenState {
  tokens: any[]; // Replace 'any' with your token type
}

const initialState: TokenState = {
  tokens: [],
};

const tokenSlice = createSlice({
  name: 'token',
  initialState,
  reducers: {
    setTokens(state, action: PayloadAction<any[]>) {
      state.tokens = action.payload;
    },
    // Add more reducers as needed
  },
});

export const { setTokens } = tokenSlice.actions;
export default tokenSlice.reducer;
