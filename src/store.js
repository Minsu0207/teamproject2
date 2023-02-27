import { configureStore, createSlice } from '@reduxjs/toolkit'

let db = createSlice({
    name: 'db',
    initialState: [],
    reducers: {
        getDbList(state, action) {
            if (state.length == 0) {
                state = action.payload;
                return state
            }
        }
    }
})

let results = createSlice({
    name: 'results',
    initialState: [],
    reducers: {
        getResultsList(state, action) {
            if (state.length == 0) {
                state = action.payload;
                return state
            }
        }
    }
})

export default configureStore({
    reducer: {
        db: db.reducer,
        results: results.reducer
    }
})

export let { getDbList } = db.actions
export let { getResultsList } = results.actions
