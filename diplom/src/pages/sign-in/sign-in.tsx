import { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router'
import { Button } from '../../shared/button'
import { Text } from '../../shared/text'
import styles from './sign-in.module.css'
import { SCOPES_FOR_API } from '../../consts/scope'

const signInLink = `https://accounts.spotify.com/en/authorize?response_type=code&scope=${encodeURIComponent(SCOPES_FOR_API.join(' '))}&client_id=6ab8ab4163a64874aaa6e1eb8a95f6b9&redirect_uri=http://127.0.0.1:8888/sign-in`

const SignIn = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const handleSignIn = () => {
        window.location.href = signInLink;
    }

    useEffect(() => {
        const accessToken = localStorage.getItem('access_token');
        if (accessToken && accessToken !== 'undefined') {
            navigate('/home');
        } else if (accessToken === 'undefined') {
            localStorage.removeItem('access_token')
        }
    }, []);

    useEffect(() => {
        const code = searchParams.get('code');

        if (code) {
            fetch('https://accounts.spotify.com/api/token', {
                method: "POST",
                headers: {
                    'content-type': 'application/x-www-form-urlencoded',
                    'Authorization': 'Basic ' + btoa('6ab8ab4163a64874aaa6e1eb8a95f6b9' + ':' + 'da58e1a732bd475ca69db1ba0d97dd09')
                },
                body: new URLSearchParams({
                    code: code,
                    redirect_uri: 'http://127.0.0.1:8888/sign-in',
                    grant_type: 'authorization_code'
                })
            }).then(response => response.json()).then(data => {
                console.log('data', data)
                if (!data.access_token) {
                    console.error('Token exchange failed', data)
                    return
                }
                localStorage.setItem('access_token', data.access_token)
                navigate('/home')
            })
        }
    }, [])

    return (
        <div className={styles.pageContainer}>
            <div className={styles.contentContainer}>
                <Text type="title1">Spotify Music</Text>
                <Button variant="secondary" onClick={handleSignIn}> Sign in</Button>
            </div>
        </div>
    )
}

export default SignIn