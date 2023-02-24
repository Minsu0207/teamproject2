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

export default configureStore({
    reducer: {
        db: db.reducer
    }
})

export let { getDbList } = db.actions
