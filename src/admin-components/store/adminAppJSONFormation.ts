import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./config/store";

interface AdminAppJSONFormation {
  question: string;
  answerType: string;
  multipleChoice: (string | null)[];
  multipleChoiceAnswer: string;
  writtenAnswer: string;
  sageMathScript: string;
  graphElemetId: string[];
  graphLinkId: string[];
  graphMapId:string;
}

const initialState: AdminAppJSONFormation = {
  question: "",
  answerType: "",
  multipleChoice: [],
  multipleChoiceAnswer: "",
  writtenAnswer: "",
  sageMathScript: "",
  graphElemetId:[],
  graphLinkId:[],
  graphMapId:""
};

export const adminAppJSONFormation = createSlice({
  name: "adminAppJSONFormation",
  initialState,
  reducers: {
    setQuestion: (state, action: PayloadAction<string>) => {
      state.question = action.payload;
    },
    setAnswerType: (state, action: PayloadAction<string>) => {
      state.answerType = action.payload;
    },
    setMultipleChoice: (state, action: PayloadAction<(string | null)[]>) => {
      state.multipleChoice = action.payload;
    },
    saveGraphMapIdForQuesAns: (state, action) => {
      state.graphMapId = action.payload;
    },
    setMultipleChoiceAnswer: (state, action: PayloadAction<string>) => {
      state.multipleChoiceAnswer = action.payload;
    },
    setWrittenAnswer: (state, action: PayloadAction<string>) => {
      state.writtenAnswer = action.payload;
    },
    setSageMathScript: (state, action: PayloadAction<string>) => {
      state.sageMathScript = action.payload;
    },
    setGraphElementId: (state, action: PayloadAction<string[]>) => {
      state.graphElemetId = action.payload;
    },
    setGraphLinkId: (state, action: PayloadAction<string[]>) => {
      state.graphLinkId = action.payload;
    },
  },
});

export const {
  setQuestion,
  setAnswerType,
  setMultipleChoice,
  setMultipleChoiceAnswer,
  setWrittenAnswer,
  setSageMathScript,
  setGraphElementId,
  setGraphLinkId,
  saveGraphMapIdForQuesAns
} = adminAppJSONFormation.actions;
export const adminAppJSON = (state: RootState) => state.adminAppJSONFormation;

export default adminAppJSONFormation.reducer;
