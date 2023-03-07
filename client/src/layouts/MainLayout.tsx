import { useState } from "react";
import { Outlet } from "react-router-dom";
import { IErrState } from "../pages/ErrorPage";

const MainLayout = () => {
  return (
    <div id="app">
      <main id="main-container">
        <Outlet />
      </main>
    </div>
  )
}

export default MainLayout;