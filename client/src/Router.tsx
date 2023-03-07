import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider
} from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Decks from "./pages/Decks";
import Error from "./pages/Error";
import NotFound from "./pages/NotFound";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<MainLayout />}>
      <Route path="/" errorElement={<Error />}>

        <Route index element={<Decks />} />

        <Route path="*" element={<NotFound />} />

      </Route>
    </Route>
  )
)

const Router = () => <RouterProvider router={router} />
export default Router;