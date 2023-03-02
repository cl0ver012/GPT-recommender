import { AxiosResponse } from 'axios'
import CustomAxios from '../utility/customAxios'

type APIResponse = AxiosResponse
interface ResponseObject {
    responseMessage: string
    reason?: string
}

export const MAX_TOKENS = 3000

const sendCompletionURL = 'https://api.openai.com/v1/completions'

const defaultCompletionParams = {
    temperature: 0.3,
    max_tokens: MAX_TOKENS,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0
}

export const sendCompletionRequest = async (userToken: string, request: string, selectedModel: string): Promise<{ error?: any; response?: ResponseObject }> => {
    try {
        const headers = {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${userToken}`
        }
        const params = { ...defaultCompletionParams, prompt: request, stop: '\n', model: selectedModel }

        const res = await CustomAxios.post(sendCompletionURL, JSON.stringify(params), { headers }).then((response: APIResponse) => {
            return response.data.response
        })
        const firstChoice = res.choices[0]
        return { response: { responseMessage: firstChoice.text, reason: firstChoice.finishReason } }
    } catch (error: any) {
        return { error }
    }
}
