import { ACCESS_TOKEN_KEY } from '../consts/spotify'
import { getAccessToken } from '../api/spotify-auth'

export const useAccessToken = () => {
  try {
    return getAccessToken()
  } catch (e) {
    console.error('Не получилось вытянуть токен из LS', e)
    // fallback на прямой ключ на случай старых данных
    const raw = localStorage.getItem(ACCESS_TOKEN_KEY)
    return raw && raw !== 'undefined' ? raw : null
  }
}
