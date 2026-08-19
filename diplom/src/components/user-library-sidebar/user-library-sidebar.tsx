import { useEffect, useMemo, type FC } from "react";
import styles from "./user-library-sidebar.module.css";
import { PanelLeftClose, Plus, Maximize2, Minimize2 } from "lucide-react";

import { Button } from "../../shared/button";
import { useLoadPlaylist } from "@/api/use-load-playlists";
import { LibraryPlaylists } from "../library-playlists";
import { getLibraryPlaylists } from "@/utils/get-library-playlists";
import { useAccessToken } from "@/hooks/use-access-token";

interface IUserLibrarySidebarProps {
  isExpanded?: boolean;
  onResize: () => void;
}

export const UserLibrarySidebar: FC<IUserLibrarySidebarProps> = ({
  isExpanded = false,
  onResize,
}) => {
  const token = useAccessToken();
  const { load, isLoading, playlists } = useLoadPlaylist();

  const libraryList = useMemo(() => {
    return getLibraryPlaylists(playlists);
  }, [playlists]);

  const handleSwitchSidebarSize = () => {
    onResize();
  };

  const handleCreatePlaylist = async () => {
    const response = await fetch("https://api.spotify.com/v1/me/playlists", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: "Тестовый альбом",
        public: false,
        description: "фафыафафыафыаыфафыафыа",
      }),
    });

    const newPlaylist = await response.json();
  };

  useEffect(() => {
    void load();
  }, []);

  return (
    <div
      className={`${styles.userLibrarySidebar} ${isExpanded ? styles.expanded : ""}`}
    >
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <PanelLeftClose
            className={styles.closeIcon}
            size={16}
            color="rgba(255, 255, 255, 0.5)"
          />
          <span> Your Library </span>
        </div>
        <div className={styles.headerRight}>
          <Button onClick={handleCreatePlaylist}>
            {" "}
            <Plus size={14} /> Create
          </Button>
          <Button onClick={handleSwitchSidebarSize} variant="icon">
            {isExpanded ? (
              <Minimize2 size={14} color="white" />
            ) : (
              <Maximize2 size={14} color="white" />
            )}
          </Button>
        </div>
      </div>
      <div className={styles.listContainer}>
        {isLoading ? (
          <span className={styles.loader}>Loading...</span>
        ) : (
          <LibraryPlaylists list={libraryList} />
        )}
      </div>
    </div>
  );
};
