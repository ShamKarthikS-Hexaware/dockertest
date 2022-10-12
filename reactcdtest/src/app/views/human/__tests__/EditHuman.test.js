const {
    render,
    screen,
    fireEvent,
    within,
    getByRole,
    act,
    cleanup,
} = require('@testing-library/react')
import '@testing-library/jest-dom/extend-expect'
import { Provider } from 'react-redux'
import store from 'app/redux/store'
import {
    BrowserRouter as Router,
    Navigate,
    Route,
    Routes,
} from 'react-router-dom'
import { SettingsProvider } from 'app/contexts/SettingsContext'
import { MatxTheme } from 'app/components'
import EditHuman from '../EditHuman'
import { humanAdded } from '../store/humanSlice'
beforeAll(() => {
    store.dispatch(
        humanAdded({
            id: 1,
            name: 'name',
            age: 'age',
            planet: 'planet',
        })
    )
})

beforeEach(() => {
    render(
        <Provider store={store}>
            <SettingsProvider>
                <MatxTheme>
                    <Router>
                        <Routes>
                            <Route
                                path="/"
                                element={<Navigate to="human/edit/1" replace />}
                            />
                            <Route
                                path="human/edit/:id"
                                element={<EditHuman />}
                            />
                        </Routes>
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

describe('testing view of HumanEdit Component', () => {
    test('should render EditHuman and display the heading Edit Form', async () => {
        const headingNote = screen.getByText(/Edit Form/i)
        expect(headingNote).toBeInTheDocument()
    })

    test('should have all input fields present in the edit form', async () => {
        const saveHumanButtonElement = screen.getByRole('button', {
            name: /save/i,
        })
        const nameElement = screen.getByLabelText(/Name/i)
        const ageElement = screen.getByLabelText(/Age/i)
        const planetElement = screen.getByLabelText(/Planet/i)

        expect(saveHumanButtonElement).toBeInTheDocument()

        expect(nameElement).toBeInTheDocument()
        expect(ageElement).toBeInTheDocument()
        expect(planetElement).toBeInTheDocument()
    })

    test('should be able to give inputs to all fields of Human edit form', async () => {
        const nameElement = screen.getByLabelText(/Name/i)
        const ageElement = screen.getByLabelText(/Age/i)
        const planetElement = screen.getByLabelText(/Planet/i)

        fireEvent.change(nameElement, { target: { value: 'name' } })
        fireEvent.change(ageElement, { target: { value: 'age' } })
        fireEvent.change(planetElement, { target: { value: 'planet' } })

        expect(nameElement.value).toBe('name')

        expect(ageElement.value).toBe('age')

        expect(planetElement.value).toBe('planet')
    })

    test('should return error message when save button is clicked on invalid form', async () => {
        jest.useFakeTimers()
        const nameElement = screen.getByLabelText(/Name/i)
        const ageElement = screen.getByLabelText(/Age/i)
        const planetElement = screen.getByLabelText(/Planet/i)

        fireEvent.change(nameElement, { target: { value: '' } })
        fireEvent.change(ageElement, { target: { value: '' } })
        fireEvent.change(planetElement, { target: { value: '' } })
        await act(async () => {
            jest.runOnlyPendingTimers()
        })
        const saveHumanButtonElement = screen.getByRole('button', {
            name: /save/i,
        })

        await clickAndWait(saveHumanButtonElement)

        const errorList = await screen.findAllByText('this field is required')
        expect(errorList).toHaveLength(3)
    })
})
