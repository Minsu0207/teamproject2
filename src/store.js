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

const worker = listReducer('worker');

const user = createSlice({
  name: 'user',
  initialState: {},
  reducers: {
    setUser(state, action) {
      return action.payload;
    },
  },
});

export default configureStore({
  reducer: {
    worker: worker.reducer,
    user: user.reducer,
  },
});

export const { setList: getWorkerList } = worker.actions;
export const { setUser: setLoggedInUser } = user.actions;
