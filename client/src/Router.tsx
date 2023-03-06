import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider
} from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import App from "./pages/App";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<MainLayout />}>
      <Route index element={<App />} />
    </Route>
  )
)

const Router = () => <RouterProvider router={router} />
export default Router;