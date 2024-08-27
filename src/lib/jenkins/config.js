import axios from 'axios'
import config from '../../config'
import { httpsAgent } from '../axios/instance'

export function createClient () {
  const url = config.get('url')
  const username = config.get('username')
  const password = config.get('password')

  return axios.create({
    baseURL: url,
    httpsAgent,
    timeout: 10000,
    auth: {
      username,
      password
    }
  })
}

export const COLORS = {
  blue: 'success',
  red: 'error',
  disabled: 'disabled'
}
