const { render, screen, cleanup } = require('@testing-library/react')
import '@testing-library/jest-dom/extend-expect'
import { Provider } from 'react-redux'
import store from 'app/redux/store'
import { BrowserRouter as Router } from 'react-router-dom'
import { SettingsProvider } from 'app/contexts/SettingsContext'
import { MatxTheme } from 'app/components'
import HumanList from '../HumanList'
import axios from '../../../../axios'
import MockAdapter from 'axios-mock-adapter'

afterEach(cleanup)

test('should render Human rows when api response has data', async () => {
    const endPoint = 'human'
    const getHumanListResponse = [
        {
            id: 1,
            name: 'name1',
            age: 'age1',
            planet: 'planet1',
        },
    ]
    const mock = new MockAdapter(axios)
    mock.onGet(`/${endPoint}`).reply(200, getHumanListResponse)
    render(
        <Provider store={store}>
            <SettingsProvider>
                <MatxTheme>
                    <Router>
                        <HumanList />
                    </Router>
                </MatxTheme>
            </SettingsProvider>
        </Provider>
    )
    const humanNameCell = await screen.findByText(/name1/i)

    expect(humanNameCell).toHaveTextContent(/name1/i)
    mock.reset()
})
