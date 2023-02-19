import { render, screen } from '@testing-library/react'
import { BrowserRouter as Router } from 'react-router-dom'
import HomePage from '../../pages/HomePage'

test('HomePage - Renders app title', () => {
    render(
        <Router>
            <HomePage />
        </Router>
    )
    const title = screen.getByText(/GPT Recommender/i)
    expect(title).toBeInTheDocument()
})
