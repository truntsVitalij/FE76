import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router'
import { Button } from '../../shared/button'
import { Text } from '../../shared/text'
import styles from './sign-in.module.css'
import {
  exchangeCodeForToken,
  getAccessToken,
  redirectToSpotifyAuth,
} from '../../api/spotify-auth'

const SignIn = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const navigate = useNavigate()
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleSignIn = async () => {
    setError(null)
    setIsLoading(true)
    try {
      await redirectToSpotifyAuth()
    } catch (e) {
      console.error(e)
      setError('Не удалось начать авторизацию')
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (getAccessToken()) {
      navigate('/home')
    }
  }, [navigate])

  useEffect(() => {
    const code = searchParams.get('code')
    const authError = searchParams.get('error')

    if (authError) {
      setError(authError)
      setSearchParams({})
      return
    }

    if (!code) return

    let cancelled = false

    const run = async () => {
      setIsLoading(true)
      setError(null)
      try {
        await exchangeCodeForToken(code)
        if (!cancelled) {
          setSearchParams({})
          navigate('/home')
        }
      } catch (e) {
        console.error(e)
        if (!cancelled) {
          setError(e instanceof Error ? e.message : 'Ошибка обмена code на token')
          setSearchParams({})
        }
      } finally {
        if (!cancelled) setIsLoading(false)
      }
    }

    void run()

    return () => {
      cancelled = true
    }
  }, [searchParams, setSearchParams, navigate])

  return (
    <div className={styles.pageContainer}>
      <div className={styles.contentContainer}>
        <Text type="title1">Spotify Music</Text>
        {error && <p style={{ color: '#f87171' }}>{error}</p>}
        <Button variant="secondary" onClick={handleSignIn}>
          {isLoading ? 'Loading…' : 'Sign in'}
        </Button>
      </div>
    </div>
  )
}

export default SignIn
