import React, { useState } from 'react'
import Header from '../components/Header'
import { MAX_TOKENS, sendCompletionRequest } from '../resources/api-request'
import { quantities, subjects } from '../utility/options'

const HomePage: React.FC = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [userAPIKey, setUserAPIKey] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const [lengthIssueText, setLengthIssueText] = useState('')
    const [selectedSubject, setSelectedSubject] = useState('books')
    const [selectedQuantity, setSelectedQuantity] = useState('5')
    const [favourites, setFavourites] = useState('Animal Farm by George Orwell, Odissey by Homer and Hamlet by William Shakespare')
    const [finalResponse, setFinalResponse] = useState('')

    const composeRequestMessage = (subject: string, favs: string, quantity: string) => {
        return `Based on the fact that i like ${subject} and my favourites are: ${favs}; Make a list of ${quantity} ${subject} that i could like and for each one specify the authors and the year of pubblication. Sort the results from most to least compatible.`
    }

    const formatResponseMessage = (message: string) => {
        if (message.startsWith('\n\n')) return message.slice(2)
        return message
    }

    const sendRequest = async () => {
        try {
            setIsLoading(true)
            setErrorMessage('')
            setLengthIssueText('')
            const message = composeRequestMessage(selectedSubject, favourites, selectedQuantity)
            const completionResponse = await sendCompletionRequest(userAPIKey, message)
            if (completionResponse && completionResponse.error && completionResponse.error.response && completionResponse.error.response.status !== 200) {
                switch (completionResponse.error.response.status) {
                    case 401: // Unauthorized: API key is wrong
                        throw new Error('It seems that your API key might be wrong, please double-check it.')
                    case 429: // Too Many Requests: Need to pay
                        throw new Error('Daily quota exceeded, please check your plan and billing details.')
                    default: // Generic error
                        throw new Error('Something went wrong with the request, please retry.')
                }
            }
            if (completionResponse && completionResponse.response) {
                if (!completionResponse.response.responseMessage) throw new Error('System was unable to satisfy your request, please retry.')
                if (completionResponse.response.reason && completionResponse.response.reason === 'length')
                    setLengthIssueText(`This completion was interrupted because it was limited to ${MAX_TOKENS} characters.`)
                setFinalResponse(formatResponseMessage(completionResponse.response.responseMessage))
            }
        } catch (error: any) {
            console.error(error)
            setErrorMessage(error.message)
        }
        setIsLoading(false)
    }

    return (
        <div style={{ position: 'relative', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
            <Header />
            <div className="o-main-page-container">
                <div className="u-input-row">
                    Add your OpenAI API key{' '}
                    <input
                        className="o-api-key-input"
                        placeholder="Paste it here..."
                        type="password"
                        value={userAPIKey}
                        onChange={(e) => setUserAPIKey(e.target.value)}
                    />
                </div>
                <hr />
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
                    <div className="u-input-row">
                        <button disabled={isLoading} className="u-button o-action-button" onClick={() => void sendRequest()}>
                            Recommend me
                        </button>
                        {isLoading && <span className="o-loading-text">... loading</span>}
                    </div>
                    {finalResponse && (
                        <button className="u-button o-ghost-button" onClick={() => navigator.clipboard.writeText(finalResponse)}>
                            Copy
                        </button>
                    )}
                </div>
                {errorMessage && <p className="o-error-text-container">{errorMessage}</p>}
                {finalResponse && <div className="o-response-container">{finalResponse}</div>}
                {lengthIssueText && <p className="o-subtitle-info-text">{lengthIssueText}</p>}
            </div>
        </div>
    )
}

export default HomePage
