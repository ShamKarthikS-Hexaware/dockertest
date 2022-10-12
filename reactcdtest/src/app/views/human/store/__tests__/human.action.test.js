import axios from '../../../../../axios'
import MockAdapter from 'axios-mock-adapter'
import store from 'app/redux/store'
import { fetchHuman, addHuman, editHuman, deleteHuman } from '../human.action'

const getHumanListResponse = [
    {
        id: 1,
        name: 'name',
        age: 'age',
        planet: 'planet',
    },
]

const addHumanListResponse = (data) => {
    return { id: 2, ...data }
}
const editHumanListResponse = (data) => {
    return data
}

describe('should test Human redux tooklit asyncThunk api action and redux store updation', () => {
    const mock = new MockAdapter(axios)
    const endPoint = 'human'
    test('Should be able to fetch the human list and update human redux store', async () => {
        mock.onGet(`/${endPoint}`).reply(200, getHumanListResponse)
        const result = await store.dispatch(fetchHuman())
        const humanList = result.payload
        expect(result.type).toBe('human/fetchHuman/fulfilled')
        expect(humanList).toEqual(getHumanListResponse)

        const state = store.getState().human
        expect(state.entities).toEqual(humanList)
    })

    test('Should be able to add new human to list and make post api and update human redux store', async () => {
        const body = {
            name: 'name',
            age: 'age',
            planet: 'planet',
        }
        mock.onPost(`/${endPoint}`, body).reply(201, addHumanListResponse(body))
        const result = await store.dispatch(addHuman(body))
        const humanItem = result.payload
        expect(result.type).toBe('human/addHuman/fulfilled')
        expect(humanItem).toEqual(addHumanListResponse(body))

        const state = store.getState().human
        expect(state.entities).toContainEqual(addHumanListResponse(body))
    })

    test('Should be able to edit human in list and make put api call and update human redux store', async () => {
        const body = {
            id: 1,
            name: 'name',
            age: 'age',
            planet: 'planet',
        }
        mock.onPut(`/${endPoint}/${body.id}`, body).reply(
            201,
            editHumanListResponse(body)
        )
        const result = await store.dispatch(editHuman(body))
        const humanItem = result.payload
        expect(result.type).toBe('human/editHuman/fulfilled')
        expect(humanItem).toEqual(editHumanListResponse(body))

        const state = store.getState().human
        let changedHuman = state.entities.find((p) => p.id === body.id)
        expect(changedHuman.name).toEqual(body.name)
    })

    test('Should be able to delete human in list and update human redux store', async () => {
        const input = {
            id: 2,
        }
        mock.onDelete(`/${endPoint}/${input.id}`, input).reply(200)
        let state = store.getState().human
        const initialLength = state.entities.length
        const result = await store.dispatch(deleteHuman(input))
        const deletId = result.payload
        expect(result.type).toBe('human/deleteHuman/fulfilled')
        expect(deletId).toEqual(input.id)

        state = store.getState().human
        const updateLength = initialLength - 1
        expect(state.entities.length).toEqual(updateLength)
    })
})
