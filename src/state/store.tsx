import { configureStore } from '@reduxjs/toolkit'
import taskManagementReducer, {taskManagementSlice} from "../components/TaskManagement/taskManagementReducer";

export const store = configureStore({
    reducer: {
        taskManagement: taskManagementSlice.reducer
    },
})

export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch