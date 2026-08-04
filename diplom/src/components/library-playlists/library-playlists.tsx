import type { FC } from "react";

import styles from "./library-playlists.module.css";
import { Link, useParams } from "react-router";

interface IPlaylist {
  id: string;
  name: string;
  ownerName: string;
  mainImage?: string;
}

interface ILibraryPlaylistsProps {
  list: IPlaylist[];
}

export const LibraryPlaylists: FC<ILibraryPlaylistsProps> = ({ list }) => {
  const { id } = useParams();

  const isActive = (playlistId: string) => id === playlistId;

  return (
    <div className={styles.listContainer}>
      {list.map((playlist) => (
        <Link
          className={`${styles.playlist} ${isActive(playlist.id) ? styles.activePlaylist : ""}`}
          key={playlist.id}
          to={`/playlists/${playlist.id}`}
        >
          {playlist.mainImage ? (
            <img src={playlist.mainImage} className={styles.img} />
          ) : (
            <div className={`${styles.emptyImg} ${styles.img}`} />
          )}
          <div className={styles.content}>
            <span className={styles.title}>{playlist.name}</span>
            <div className={styles.description}>
              <span className={styles.descriptionLabel}>Playlist</span>
              <span className={styles.ownerName}>{playlist.ownerName}</span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};
