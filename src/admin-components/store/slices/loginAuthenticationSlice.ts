import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../config/store";

interface Authentication {
  token: string;
  userType: string;
}

interface InitialState{
    authenticateUser:Authentication[];
}

const initialState:InitialState={
    authenticateUser:[]    
};
export const fetchUserDetails = createAsyncThunk('users/fetch', async ({email,password}:{email?:string,password?:string}) => {
    const response = await axios.post(`http://localhost:8080/api/admin/userAuthentication`,{email,password});
    return response.data;
  });
export const loginAuthenticationSlice = createSlice({
  name: "loginAuthenticationSlice",
  initialState,
  reducers: {},
    extraReducers: (builder) =>{
        builder.addCase(fetchUserDetails.fulfilled,(state,action)=>{
            state.authenticateUser=action.payload;
        })
    }
});

export const loginAuthentication = (state: RootState) =>
  state.loginAuthenticationSlice;

export default loginAuthenticationSlice.reducer;
