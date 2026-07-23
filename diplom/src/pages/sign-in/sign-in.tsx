import { useSearchParams } from 'react-router'
import { Button } from '../../shared/button'
import { Text } from '../../shared/text'
import styles from './sign-in.module.css'
import { useEffect } from 'react'

const signInLink = 'https://accounts.spotify.com/en/authorize?response_type=code&client_id=6ab8ab4163a64874aaa6e1eb8a95f6b9&redirect_uri=http://127.0.0.1:8888/sign-in'

const SignIn = () => {
    const [searchParams] = useSearchParams();

    const handleSignIn = () => {
        window.location.href = signInLink;
    }

    useEffect(() => {
        const code = searchParams.get('code');


        if(code) {
            console.log(code, 'код существует')
            // запросить access_token, положить в LS и перейти на главную
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