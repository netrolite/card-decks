import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
  RouterProvider
} from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import DecksPage from "./pages/DecksPage";
import DeckPage from "./pages/DeckPage";
import ErrPage from "./pages/ErrPage";
import NotFoundPage from "./pages/NotFoundPage";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<MainLayout />}>
      <Route path="/" errorElement={<ErrPage />}>

        <Route index element={<Navigate to="decks" />} />

        <Route path="decks" element={<DecksPage />} />
        <Route path="decks/:deckId" element={<DeckPage />} />

        <Route path="*" element={<NotFoundPage />} />

      </Route>
    </Route>
  )
)

const Router = () => <RouterProvider router={router} />
export default Router;