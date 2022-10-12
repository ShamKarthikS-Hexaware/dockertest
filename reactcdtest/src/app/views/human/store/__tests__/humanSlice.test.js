import store from 'app/redux/store'
import { humanAdded, humanDeleted, humanUpdated } from '../humanSlice'

describe('testing human redux store reducers', () => {
    test('add human to store test', () => {
        let state = store.getState().human
        expect(state.entities).toHaveLength(0)
        const initialInput = {
            id: 1,
            name: 'name',
            age: 'age',
            planet: 'planet',
        }
        store.dispatch(humanAdded(initialInput))
        state = store.getState().human
        expect(state.entities).toHaveLength(1)
    })

    test('update human from store should change the length of the entities array in redux store', () => {
        const initialInput = {
            id: 2,
            name: 'name',
            age: 'age',
            planet: 'planet',
        }
        store.dispatch(humanAdded(initialInput))
        let state = store.getState().human
        expect(state.entities).toHaveLength(2)

        const updatedInput = {
            id: initialInput.id,
            name: 'name1',
            age: 'age1',
            planet: 'planet1',
        }
        store.dispatch(humanUpdated(updatedInput))
        state = store.getState().human
        let changedHuman = state.entities.find((p) => p.id === 2)
        expect(changedHuman).toStrictEqual(updatedInput)
    })

    test('delete human from store should reduce the length of the entities array in redux store', () => {
        const initialInput = {
            id: 3,
            name: 'name',
            age: 'age',
            planet: 'planet',
        }
        store.dispatch(humanAdded(initialInput))
        let state = store.getState().human
        expect(state.entities).toHaveLength(3)

        store.dispatch(
            humanDeleted({
                id: initialInput.id,
            })
        )
        state = store.getState().human
        expect(state.entities).toHaveLength(2)
    })
})
