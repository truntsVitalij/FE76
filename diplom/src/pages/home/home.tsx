import { type FC } from "react";

import { MainLayout } from "../../layouts/main-layout/main-layout";
import { Outlet } from "react-router";

const Home: FC = () => {
  return (
    <MainLayout>
      <Outlet />
    </MainLayout>
  );
};

export default Home;
