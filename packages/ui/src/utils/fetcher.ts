// https://swr.vercel.app/docs/data-fetching
import axios from 'axios'
import { request } from 'graphql-request'
export const fetcherREST = (url: string) => axios.get(url).then((res) => res.data)
// export const fetcherGQL = (query) => request('/api/graphql', query)
