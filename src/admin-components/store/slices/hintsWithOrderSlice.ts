import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../config/store";

interface TextHintsOrder {
  hint: string;
  order: number;
}
interface ScriptHintOrder {
  hint: string;
  order: number;
}
interface GraphicalHintOrder {
  hint: string;
  order: number;
}

interface InitialState {
  textHints: TextHintsOrder[];
  scriptHints: ScriptHintOrder[];
  graphicalHints: GraphicalHintOrder[];
}

const initialState: InitialState = {
  textHints: [],
  scriptHints: [],
  graphicalHints: [],
};

export const hintsWithOrderSlice = createSlice({
  name: "hintsWithOrderSlice",
  initialState,
  reducers: {
    addTextHintsWithOrder: (state, action: PayloadAction<TextHintsOrder>) => {
      state.textHints.push(action.payload);
    },
    addScriptHintsWithOrder: (
      state,
      action: PayloadAction<ScriptHintOrder>
    ) => {
      state.scriptHints.push(action.payload);
    },
    addGraphicalHintsWithOrder: (
      state,
      action: PayloadAction<GraphicalHintOrder>
    ) => {
      state.graphicalHints.push(action.payload);
    },
    clearArray(state) {
      state.textHints = [];
      state.scriptHints = [];
      state.graphicalHints = [];
    },
  },
});

export const {
  addTextHintsWithOrder,
  addScriptHintsWithOrder,
  addGraphicalHintsWithOrder,
  clearArray
} = hintsWithOrderSlice.actions;
export const hintsWithOrder = (state: RootState) =>
  state.hintsWithOrderSlice;

export default hintsWithOrderSlice.reducer;
