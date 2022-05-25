import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface GraphState {
    graphId: string;
    graphUneditedOriginal: any;
    graphEdited: any | null;
}


function getInitialGraphState(): GraphState{
    return {
        graphId: '1',
        graphUneditedOriginal: 'todo',
        graphEdited: null
    };
}

const initialGraphState: GraphState = getInitialGraphState();

export const graphSlice = createSlice({
    name: 'graph',
    initialState: initialGraphState,
    reducers: {
        exportGraph: (state, action: PayloadAction<any>) => {
            // alert('exported');
        }
    }
});

export const { exportGraph } = graphSlice.actions;
export default graphSlice.reducer;