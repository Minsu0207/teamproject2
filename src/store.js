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

const db = listReducer('db');
const user = listReducer('user');
const vitalsign = listReducer('vitalsign');
const gps = listReducer('gps');
const users = listReducer('users');

export default configureStore({
  reducer: {
    db: db.reducer,
    user: user.reducer,
    users: users.reducer,
    vitalsign: vitalsign.reducer,
    gps: gps.reducer,
  },
});

export const { setList: getDbList } = db.actions;
export const { setList: getUserList } = user.actions;
export const { setList: getUsersList } = users.actions;
export const { setList: getVitalsignList } = vitalsign.actions;
export const { setList: getGpsList } = gps.actions;
