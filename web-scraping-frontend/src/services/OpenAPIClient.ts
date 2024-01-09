import OpenAPIClientAxios from 'openapi-client-axios'
import type { Client } from '../types/openapi'
const baseURL = import.meta.env.VITE_API_BASE_URL

const api = new OpenAPIClientAxios({
  definition: `${baseURL}/openapi.json`
})
export const client = await api.init<Client>()