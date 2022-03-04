import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../state/store'
import {generateEmptyGraph, GraphEditorState} from "./graphEditor";
import * as joint from "jointjs";


function getInitialGraphEditorState(): GraphEditorState {
    return {
        currentGraph: generateEmptyGraph()
    }
}

const initialState: GraphEditorState = getInitialGraphEditorState();

export const graphEditorSlice = createSlice({
    name: 'graphEditor',
    initialState,
    reducers: {
        setCurrentGraph: (state, action: PayloadAction<joint.dia.Graph>) => {
            state.currentGraph = action.payload
        }
    }
})

export const { setCurrentGraph } = graphEditorSlice.actions

// Other code such as selectors can use the imported `RootState` type
/*
export const selectCount = (state: RootState) => state.counter/
*/

export default graphEditorSlice.reducer