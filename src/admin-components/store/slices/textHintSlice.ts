import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../config/store';

interface TextHint {
  textHintValue: string[];
}

const initialState: TextHint = {
    textHintValue: [],
};

const textHintSlice = createSlice({
  name: 'textHint',
  initialState,
  reducers: {
    setTextHintArray: (state, action: PayloadAction<string[]>) => {
      state.textHintValue = action.payload;
    },
  },
});

export const { setTextHintArray } = textHintSlice.actions;
export const textHintSliceArray = (state: RootState) => state.textHintSlice;

export default textHintSlice.reducer;
