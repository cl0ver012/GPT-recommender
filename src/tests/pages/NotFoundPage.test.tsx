import { render, screen } from '@testing-library/react'
import { BrowserRouter as Router } from 'react-router-dom'
import NotFoundPage from '../../pages/NotFoundPage'

test('NotFoundPage - Renders error message', () => {
    render(
        <Router>
            <NotFoundPage />
        </Router>
    )
    const errorMessage = screen.getByText(/Oops 404!/i)
    const linkElement = screen.getByRole('link')

    expect(errorMessage).toBeInTheDocument()
    expect(linkElement).toBeInTheDocument()
    expect(linkElement).toContainElement(screen.getByText('Homepage'))
})
