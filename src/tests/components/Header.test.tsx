import { render, screen } from '@testing-library/react'
import Header from '../../components/Header'
import pkg from '../../../package.json'

test('Header component - Renders correctly', () => {
    render(<Header />)
    const versionText = screen.getByText(`v${pkg.version}`)
    const title = screen.getByText(/GPT Recommender/i)

    expect(versionText).toBeInTheDocument()
    expect(title).toBeInTheDocument()
})
