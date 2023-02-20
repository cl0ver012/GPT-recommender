import '@testing-library/react/dont-cleanup-after-each'
import { cleanup, render, screen } from '@testing-library/react'
import { BrowserRouter as Router } from 'react-router-dom'
import HomePage from '../../pages/HomePage'

describe('HomePage - Page components', () => {
    beforeAll(() => {
        jest.spyOn(console, 'log').mockImplementation(jest.fn())
        jest.spyOn(console, 'debug').mockImplementation(jest.fn())
        jest.spyOn(console, 'error').mockImplementation(jest.fn())
    })

    render(
        <Router>
            <HomePage />
        </Router>
    )

    afterAll(() => {
        cleanup()
    })

    it('Expect to have all starting components rendered', () => {
        const selectElements = screen.getAllByRole('combobox')
        const inputElements = screen.getAllByRole('textbox')

        expect(selectElements[0]).toBeInTheDocument()
        expect(selectElements[1]).toBeInTheDocument()
        expect(inputElements[0]).toBeInTheDocument()
        expect(inputElements[1]).toBeInTheDocument()
    })
})
