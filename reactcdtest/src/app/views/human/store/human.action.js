import { createAsyncThunk } from '@reduxjs/toolkit'
import { showSuccess } from 'app/services/notification/store/notification.actions'
import axios from '../../../../axios'

const endPoint = 'human'

export const fetchHuman = createAsyncThunk('human/fetchHuman', async () => {
    const response = await axios.get(`/${endPoint}`)
    const human = await response.data
    return human
})

export const addHuman = createAsyncThunk(
    'human/addHuman',
    async (data, thunkAPI) => {
        const response = await axios.post(`/${endPoint}`, data)
        const human = await response.data
        thunkAPI.dispatch(showSuccess('Human added successfully'))
        return human
    }
)

export const editHuman = createAsyncThunk(
    'human/editHuman',
    async (data, thunkAPI) => {
        const response = await axios.put(`/${endPoint}/${data.id}`, data)
        const human = await response.data
        thunkAPI.dispatch(showSuccess('Human updated successfully'))
        return human
    }
)

export const deleteHuman = createAsyncThunk(
    'human/deleteHuman',
    async (data, thunkAPI) => {
        const response = await axios.delete(`/${endPoint}/${data.id}`)
        const status = await response.status
        if (status === 200) {
            thunkAPI.dispatch(
                showSuccess('Selected human deleted successfully.')
            )
            return data.id
        }
    }
)
