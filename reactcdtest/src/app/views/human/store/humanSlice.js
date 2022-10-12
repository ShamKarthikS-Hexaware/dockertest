import { createSlice } from '@reduxjs/toolkit'
import { fetchHuman } from './human.action'
import { addHuman } from './human.action'
import { editHuman } from './human.action'
import { deleteHuman } from './human.action'

const fetchHumanExtraReducer = {
    [fetchHuman.pending]: (state, action) => {
        state.loading = true
    },
    [fetchHuman.fulfilled]: (state, action) => {
        state.entities = [...action.payload]
        state.loading = false
    },
    [fetchHuman.rejected]: (state, action) => {
        state.loading = false
    },
}

const addHumanExtraReducer = {
    [addHuman.pending]: (state, action) => {
        state.loading = true
    },
    [addHuman.fulfilled]: (state, action) => {
        state.entities.push(action.payload)
        state.loading = false
    },
    [addHuman.rejected]: (state, action) => {
        state.loading = false
    },
}

const editHumanExtraReducer = {
    [editHuman.pending]: (state, action) => {
        state.loading = true
    },
    [editHuman.fulfilled]: (state, action) => {
        const { id, name, age, planet } = action.payload
        const existingHuman = state.entities.find(
            (human) => human.id.toString() === id.toString()
        )
        if (existingHuman) {
            existingHuman.name = name
            existingHuman.age = age
            existingHuman.planet = planet
        }
        state.loading = false
    },
    [editHuman.rejected]: (state, action) => {
        state.loading = false
    },
}

const deleteHumanExtraReducer = {
    [deleteHuman.pending]: (state, action) => {
        state.loading = true
    },
    [deleteHuman.fulfilled]: (state, action) => {
        const id = action.payload
        const existingHuman = state.entities.find(
            (human) => human.id.toString() === id.toString()
        )
        if (existingHuman) {
            state.entities = state.entities.filter((human) => human.id !== id)
        }
        state.loading = false
    },
    [deleteHuman.rejected]: (state, action) => {
        state.loading = false
    },
}
const humanSlice = createSlice({
    name: 'human',
    initialState: {
        entities: [],
        loading: false,
    },
    reducers: {
        humanAdded(state, action) {
            state.entities.push(action.payload)
        },
        humanUpdated(state, action) {
            const { id, name, age, planet } = action.payload
            const existingHuman = state.entities.find(
                (human) => human.id.toString() === id.toString()
            )
            if (existingHuman) {
                existingHuman.name = name
                existingHuman.age = age
                existingHuman.planet = planet
            }
        },
        humanDeleted(state, action) {
            const { id } = action.payload
            const existingHuman = state.entities.find(
                (human) => human.id.toString() === id.toString()
            )
            if (existingHuman) {
                state.entities = state.entities.filter(
                    (human) => human.id !== id
                )
            }
        },
    },
    extraReducers: {
        ...fetchHumanExtraReducer,
        ...addHumanExtraReducer,
        ...editHumanExtraReducer,
        ...deleteHumanExtraReducer,
    },
})

export const { humanAdded, humanUpdated, humanDeleted } = humanSlice.actions

export default humanSlice.reducer
