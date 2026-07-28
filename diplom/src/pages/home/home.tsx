import { useEffect, type FC } from "react";

import { MainLayout } from "../../layouts/main-layout/main-layout";
import { Outlet } from "react-router";
import { useAccessToken } from "../../hooks/use-access-token";

const Home: FC = () => {
    const token = useAccessToken();

    const loadUserData = async () => {
        const response = await fetch('https://api.spotify.com/v1/me', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        const data = await response.json()
        console.log(data, 'data')
    }

    useEffect(() => {
        loadUserData()
    }, [])

    return (
        <MainLayout>
            <Outlet />
        </MainLayout>
    )
}

export default Home;