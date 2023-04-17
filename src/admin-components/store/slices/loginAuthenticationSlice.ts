import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../config/store";

interface Authentication {
  createdOn: Date|null;
  email: string;
  firstName: string;
  lastName:string;
  seq_id:Number;
  password:string;
  updatedOn: Date|null;
}

interface InitialState{
    authenticateUser:Authentication[];
}

const initialState:InitialState={
    authenticateUser:[]    
};
export const fetchUserDetails = createAsyncThunk('users/fetch', async ({email,password}:{email?:string,password?:string}) => {
    const response = await axios.get(`http://localhost:8080/authentication/get-auth?email=${email}&password=${password}`);
    console.log("From the redux fetch - ",response.data);
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
