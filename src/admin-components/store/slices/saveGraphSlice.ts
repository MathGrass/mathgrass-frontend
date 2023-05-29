import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../config/store";

interface GraphJSON {
    response: string;
  }
  const initialState: GraphJSON = {
    response: "",
  };

  export const saveGraph = createAsyncThunk(
    "users/saveGraph",
    async (getGraphJSON: string) => {
      const graphJSON = JSON.parse(getGraphJSON);
      const response = await axios.post(
        `http://localhost:8080/api/admin/saveGraph`,
        graphJSON
      );
      console.log("Save Graph from redux - ", response.data);
      return response.data;
    }
  );
  export const saveGraphJSONSlice = createSlice({
    name: "saveGraphJSONSlice",
    initialState,
    reducers: {},
      extraReducers: (builder) =>{
          builder.addCase(saveGraph.fulfilled,(state,action)=>{
              state.response=action.payload;
          })
      }
  });
  
  export const saveGraphJSON = (state: RootState) =>
    state.saveGraphJSONSlice;
  
  export default saveGraphJSONSlice.reducer;
