import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider
} from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Decks, { decksLoader } from "./pages/Decks";
import { decksAction } from "./components/NewDeckForm";
import Error from "./pages/Error";
import NotFound from "./pages/NotFound";
import Test from "./pages/Test";
import axios from "axios";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<MainLayout />}>
      <Route path="/" errorElement={<Error />}>

        <Route
          index
          element={<Decks />} 
          loader={decksLoader}
          action={decksAction}
        />

        <Route
          path="test/:projectId/:anotherThing"
          element={<Test />}
          loader={async ({ params, request }) => {
            const { data: decks } = await axios.get("http://localhost:4000/decks");
            return decks;
          }}
          action={async ({ params, request }) => {
            // action is called when something inside the element send a request other than "GET"
            const dataGetter = await request.formData();
            const data = {
              name: dataGetter.get("name"),
              createdBy: dataGetter.get("deck-name")
            }
            
            await axios.post("http://localhost:4000/decks", data);
            return null;
          }}
        />

        <Route path="*" element={<NotFound />} />

      </Route>
    </Route>
  )
)

const Router = () => <RouterProvider router={router} />
export default Router;