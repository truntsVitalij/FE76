import { useAccessToken } from "@/hooks/use-access-token";
import { useEffect, useState, type FC } from "react";
import { useParams } from "react-router";

const Playlist: FC = () => {
  const token = useAccessToken();
  const { id } = useParams();

  const [currentPlaylist, setCurrentPlaylist] = useState(null);

  const loadCurrentPlaylist = async (id: string) => {
    if (!token) return;

    const response: Response = await fetch(
      `https://api.spotify.com/v1/playlists/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    const data = await response.json();
    setCurrentPlaylist(data);
    console.log(data);
  };

  useEffect(() => {
    loadCurrentPlaylist(id);
  }, [id]);

  return (
    <div>
      <h2>{currentPlaylist?.name}</h2> ID: {id}
    </div>
  );
};

export default Playlist;
