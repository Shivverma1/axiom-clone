import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface PresetState {
  selectedPreset: string;
  presetList: string[];
}

const initialState: PresetState = {
  selectedPreset: "PRESET 1",
  presetList: ["PRESET 1", "PRESET 2", "PRESET 3"],
};

const presetSlice = createSlice({
  name: 'preset',
  initialState,
  reducers: {
    setSelectedPreset(state, action: PayloadAction<string>) {
      state.selectedPreset = action.payload;
    },
  },
});

export const { setSelectedPreset } = presetSlice.actions;
export default presetSlice.reducer;
