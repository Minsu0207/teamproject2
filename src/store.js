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

export default configureStore({
  reducer: {
    worker: worker.reducer,
  },
});

export const { setList: getWorkerList } = worker.actions;
