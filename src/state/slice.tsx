import { createSlice } from '@reduxjs/toolkit'

export const counterSlice = createSlice({
    name: 'counter',
    initialState: {
        value: 0,
    },
    reducers: {
        doStuff: (state) => {
            console.log(state)
        }
    },
})

// Action creators are generated for each case reducer function
export const { doStuff } = counterSlice.actions

export default counterSlice.reducer