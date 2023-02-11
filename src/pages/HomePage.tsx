import React, { useState } from 'react'
import Header from '../components/Header'
import { quantities, subjects } from '../utility/options'

const HomePage: React.FC = () => {
    const [selectedSubject, setSelectedSubject] = useState('books')
    const [selectedQuantity, setSelectedQuantity] = useState('5')
    const [favourites, setFavourites] = useState('Animal Farm by George Orwell, Odissey by Homer and Hamlet by William Shakespare')
    const response = ''

    return (
        <div style={{ position: 'relative', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
            <Header />
            <div className="o-main-page-container">
                <div className="u-input-row">
                    <p>I like</p>{' '}
                    <select value={selectedSubject} onChange={(e) => setSelectedSubject(e.target.value)}>
                        {subjects.map((subject, index) => (
                            <option key={index} value={subject}>
                                {subject}
                            </option>
                        ))}
                    </select>{' '}
                    <p>and my favourites are </p>
                </div>
                <textarea value={favourites} onChange={(e) => setFavourites(e.target.value)} placeholder="Write here some of your favourites" />
                <div className="u-input-row">
                    <p> Recommend me</p>{' '}
                    <select value={selectedQuantity} onChange={(e) => setSelectedQuantity(e.target.value)}>
                        {quantities.map((quantity, index) => (
                            <option key={index} value={quantity}>
                                {quantity}
                            </option>
                        ))}
                    </select>{' '}
                    <p>more.</p>
                </div>
                <div className="o-main-actions-container">
                    <button className="u-button o-action-button">Recommend me</button>
                    {response && <button className="u-button o-ghost-button">Copy</button>}
                </div>
                {response && <div className="o-response-container">{response}</div>}
            </div>
        </div>
    )
}

export default HomePage
