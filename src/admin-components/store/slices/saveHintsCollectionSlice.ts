import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../config/store";

interface HintsSave {
  response:string;
};
const initialState:HintsSave={
    response:""
};

export const saveHintsFromUser = createAsyncThunk('users/hints', async (getHints:string) => {
    const hints = JSON.parse(getHints);
    const response = await axios.post(`http://localhost:8080/api/admin/saveHints`,hints);
    return response.data;
  });
export const saveHintsCollectionSlice = createSlice({
  name: "saveHintsCollectionSlice",
  initialState,
  reducers: {},
    extraReducers: (builder) =>{
        builder.addCase(saveHintsFromUser.fulfilled,(state,action)=>{
            state.response=action.payload;
        })
    }
});

export const saveHintsCollection = (state: RootState) =>
  state.saveHintsCollectionSlice;

export default saveHintsCollectionSlice.reducer;
