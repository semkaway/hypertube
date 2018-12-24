import axios from 'axios'
import { URL_PATH } from './utils/constants'

export const HTTP = axios.create({
  baseURL: `${URL_PATH}/api/`
})
