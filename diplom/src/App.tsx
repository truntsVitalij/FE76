import { useEffect } from "react"
import { useNavigate } from "react-router";
import { SIGN_IN } from "./router/const";

// const CLIENT_ID = '6ab8ab4163a64874aaa6e1eb8a95f6b9';
// const CLIENT_SECRET = 'da58e1a732bd475ca69db1ba0d97dd09';

function App() {
  const navigate = useNavigate();

  // const getAccessToken = async () => {
  //   const response = await fetch('https://accounts.spotify.com/api/token', {
  //     method: 'POST',
  //     headers: {
  //       "Content-Type": "application/x-www-form-urlencoded"
  //     },
  //     body: new URLSearchParams({
  //       'grant_type': 'client_credentials',
  //       'client_id': CLIENT_ID,
  //       'client_secret': CLIENT_SECRET
  //     })
  //   })

  //   const data = await response.json();

  //   localStorage.setItem('access_token', data.access_token);
  // }

  const getArtist = async () => {
    const response = await fetch('https://api.spotify.com/v1/artists/4Z8W4fKeB5YxbusRsdQVPb', {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('access_token')}`
      }
    })
    const artistData = await response.json();

    console.log(artistData, 'ARTIST');
  }

  useEffect(() => {
    if(!localStorage.getItem('access_token')) {
      navigate(SIGN_IN)
    }
  }, [])

  return (
    <>
      <div>DIPLOM</div>

      <button onClick={getArtist}>get artist</button>
    </>
  )
}

export default App
