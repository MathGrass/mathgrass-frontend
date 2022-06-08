import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface GraphState {
    graphId: string;
    graphUneditedOriginal: any;
    graphInEditor: any | null;
}


function getInitialGraphState(): GraphState {
    return {
        graphId: '1',
        graphUneditedOriginal: 'todo',
        graphInEditor: null
    };
}

const initialGraphState: GraphState = getInitialGraphState();

export const graphSlice = createSlice({
    name: 'graph',
    initialState: initialGraphState,
    reducers: {
        propagateGraphState: (state, action: PayloadAction<any>) => {
            state.graphInEditor = action.payload;
        }
    }
});

export const {propagateGraphState} = graphSlice.actions;
export default graphSlice.reducer;