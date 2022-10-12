const {
    render,
    screen,
    fireEvent,
    within,
    waitFor,
    getByRole,
    act,
    cleanup,
} = require('@testing-library/react')
import '@testing-library/jest-dom/extend-expect'
import { Provider } from 'react-redux'
import store from 'app/redux/store'
import { BrowserRouter as Router } from 'react-router-dom'
import { SettingsProvider } from 'app/contexts/SettingsContext'
import { MatxTheme } from 'app/components'
import axios from '../../../../axios'
import MockAdapter from 'axios-mock-adapter'
import AddHuman from '../AddHuman'

beforeEach(() => {
    const endPoint = 'human'
    const getStudentListResponse = [
        {
            id: 1,
            name: 'name',
            age: 'age',
            planet: 'planet',
        },
    ]
    const mock = new MockAdapter(axios)
    mock.onGet(`/${endPoint}`).reply(200, getStudentListResponse)
    render(
        <Provider store={store}>
            <SettingsProvider>
                <MatxTheme>
                    <Router>
                        <AddHuman />
                    </Router>
                </MatxTheme>
            </SettingsProvider>
        </Provider>
    )
})

const clickAndWait = async (element) => {
    await act(async () => {
        fireEvent.click(element)
    })

    await act(async () => {
        jest.runOnlyPendingTimers()
    })
}

afterEach(cleanup)

describe('testing view HumanAdd Component', () => {
    test('should render AddHuman and to display Add Form title', async () => {
        const headingNote = screen.getByText(/Add Form/i)
        expect(headingNote).toBeInTheDocument()
    })

    test('should have all input fields present in the add form', async () => {
        const addHumanButtonElement = screen.getByRole('button', {
            name: /Add/i,
        })

        const nameElement = screen.getByLabelText(/Name/i)
        const ageElement = screen.getByLabelText(/Age/i)
        const planetElement = screen.getByLabelText(/Planet/i)

        expect(addHumanButtonElement).toBeInTheDocument()

        expect(nameElement).toBeInTheDocument()
        expect(ageElement).toBeInTheDocument()
        expect(planetElement).toBeInTheDocument()
    })

    test('should be able to give inputs to all fields of Human add form', async () => {
        const nameElement = screen.getByLabelText(/Name/i)
        const ageElement = screen.getByLabelText(/Age/i)
        const planetElement = screen.getByLabelText(/Planet/i)

        fireEvent.change(nameElement, { target: { value: 'name' } })
        fireEvent.change(ageElement, { target: { value: 'age' } })
        fireEvent.change(planetElement, { target: { value: 'planet' } })
    })

    test('should return error message when add Human button is clicked on invalid form', async () => {
        jest.useFakeTimers()
        const addHumanButtonElement = screen.getByRole('button', {
            name: /Add/i,
        })

        await clickAndWait(addHumanButtonElement)

        let errorList = await screen.findAllByText('this field is required')
        expect(errorList).toHaveLength(3)
    })
})
