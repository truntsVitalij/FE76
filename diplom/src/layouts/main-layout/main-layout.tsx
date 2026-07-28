import { useState, type FC, type PropsWithChildren } from "react";

import { NavBar } from "../../components/navbar";
import { UserLibrarySidebar } from "../../components/user-library-sidebar";
import { DownloadAppSidebar } from "../../components/download-app-sidebar";

import styles from './main-layout.module.css';


export const MainLayout: FC<PropsWithChildren> = ({ children }) => {
    const [isLibrarySidebarExpanded, setIsLibrarySidebarExpanded] = useState(false);

    const handleSidebarResize = () => {
        setIsLibrarySidebarExpanded(prev => !prev);
    }

    return (
        <div className={styles.mainLayout}>
            <NavBar />
            <div className={styles.content}>
                <UserLibrarySidebar isExpanded={isLibrarySidebarExpanded} onResize={handleSidebarResize} />
                <main className={`${styles.main} ${isLibrarySidebarExpanded ? styles.collapsed : ''}`}>
                    {children}
                </main>
                <DownloadAppSidebar />
            </div>
        </div>
    )
}