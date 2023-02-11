import React from 'react'
import pkg from '../../package.json'
import '../styles/Components.sass'

const Header: React.FC = () => {
    return (
        <div className="o-main-header">
            <h1>GPT Recommender</h1>
            <p className="o-version-tag">v{pkg.version}</p>
        </div>
    )
}

export default Header
