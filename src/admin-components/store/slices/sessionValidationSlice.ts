import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../config/store";

interface Validation {
  token:string;
  isExpired:Boolean;
}
const initialState:Validation={
    token:"",
    isExpired:true
};
export const sessionValidationFetch = createAsyncThunk('users/Validation', async ({token}:{token:string|null}) => {
    const response = await axios.post(`http://localhost:8080/api/admin/tokenValidity`,{token});
    return response.data;
  });
export const sessionValidationSlice = createSlice({
  name: "sessionValidationSlice",
  initialState,
  reducers: {},
    extraReducers: (builder) =>{
        builder.addCase(sessionValidationFetch.fulfilled,(state,action)=>{
            state.isExpired=action.payload;
        })
    }
});

export const sessionValidation = (state: RootState) =>
  state.sessionValidationSlice;

export default sessionValidationSlice.reducer;
