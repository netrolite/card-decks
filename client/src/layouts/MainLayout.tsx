import { Outlet } from "react-router-dom";

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