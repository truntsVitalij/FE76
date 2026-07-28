import { useEffect, type FC } from 'react';
import styles from './user-library-sidebar.module.css';
import { PanelLeftClose, Plus, Maximize2, Minimize2 } from 'lucide-react';

import { useAccessToken } from '../../hooks/use-access-token';
import { Button } from '../../shared/button';

const LIBRARY_URIS = ['spotify:playlist', 'spotify:album', 'spotify:artist'];

interface IUserLibrarySidebarProps {
    isExpanded?: boolean
    onResize: () => void
}

export const UserLibrarySidebar: FC<IUserLibrarySidebarProps> = ({ isExpanded = false, onResize }) => {
    const token = useAccessToken();

    const loadLibraryContent = async () => {

        const response = await fetch('https://api.spotify.com/v1/me/playlists', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        const data = await response.json()
        console.log(data)
    }

    const handleSwitchSidebarSize = () => {
        onResize();
    }

    useEffect(() => {
        loadLibraryContent();
    }, [])

    return (
        <div className={`${styles.userLibrarySidebar} ${isExpanded ? styles.expanded : ''}`}>
            <div className={styles.header}>
                <div className={styles.headerLeft}>
                    <PanelLeftClose className={styles.closeIcon} size={16} color="rgba(255, 255, 255, 0.5)" />
                    <span> Your Library </span>
                </div>
                <div className={styles.headerRight}>
                    <Button> <Plus size={14} /> Create</Button>
                    <Button onClick={handleSwitchSidebarSize} variant='icon'>{isExpanded ? <Minimize2 size={14} color="white" /> : <Maximize2 size={14} color="white" />}</Button>
                </div>

            </div>
        </div>
    )
}