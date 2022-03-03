import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import {RootState} from "../../state/store";

// Define a type for the slice state
interface TaskState {
    taskType: string
}

// Define the initial state using that type
const initialState: TaskState = {
    taskType: "BIPARTITE",
} as TaskState

export const taskManagementSlice = createSlice({
    name: 'taskManagement',
    initialState,
    reducers: {
        requestStuff: (state) => {
        }
    },
})

export const { requestStuff } = taskManagementSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.taskManagement.taskType

export default taskManagementSlice.reducer