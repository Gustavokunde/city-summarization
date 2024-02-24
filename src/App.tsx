import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import CitiesSelection from "./pages/CitiesSelection";
import CityDetails from "./pages/CityDetails";

const router = createBrowserRouter([
  {
    path: "/city/:cityName",
    element: <CityDetails />,
  },
  {
    path: "/",
    element: <CitiesSelection />,
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
