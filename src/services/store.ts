import { configureStore } from '@reduxjs/toolkit'
import userReducer from './modules/users/users.slice'
import programsReducer from "./modules/programs/programs.slice";

export const store = configureStore({
  reducer: {
    userReducer,
    programsReducer,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch