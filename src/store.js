import { configureStore, createSlice } from '@reduxjs/toolkit';

const listReducer = (name) =>
  createSlice({
    name,
    initialState: [],
    reducers: {
      setList(state, action) {
        if (state.length === 0) {
          return action.payload;
        }
        return state;
      },
    },
  });

const user = listReducer('user');
const users = listReducer('users');

export default configureStore({
  reducer: {
    user: user.reducer,
    // users: users.reducer,
  },
});

export const { setList: getUserList } = user.actions;
// export const { setList: getUsersList } = users.actions;
