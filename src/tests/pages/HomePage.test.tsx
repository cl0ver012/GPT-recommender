import { render, screen } from '@testing-library/react'
import HomePage from '../../pages/HomePage'

test('renders app title', () => {
    render(<HomePage />)
    const greetings = screen.getByText(/GPT Recommender/i)
    expect(greetings).toBeInTheDocument()
})
