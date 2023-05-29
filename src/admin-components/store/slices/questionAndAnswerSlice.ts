import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../config/store";

interface QuestionAnswer {
  response: string;
}
const initialState: QuestionAnswer = {
  response: "",
};

export const saveQuestionAnswer = createAsyncThunk(
  "users/questionAnswer",
  async (getQuestionAnswer: string) => {
    const questionAnswer = JSON.parse(getQuestionAnswer);
    const response = await axios.post(
      `http://localhost:8080/api/admin/saveQuestionAnswer`,
      questionAnswer
    );
    console.log("Save Question And Answer from redux - ", response.data);
    return response.data;
  }
);

export const saveQuestionAnswerSlice = createSlice({
    name: "saveQuestionAnswerSlice",
    initialState,
    reducers: {},
      extraReducers: (builder) =>{
          builder.addCase(saveQuestionAnswer.fulfilled,(state,action)=>{
              state.response=action.payload;
          })
      }
  });
  
  export const saveQuestionAndAnswer = (state: RootState) =>
    state.saveQuestionAnswerSlice;
  
  export default saveQuestionAnswerSlice.reducer;
