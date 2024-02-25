import { useEffect } from "react";
import ReactGA from "react-ga";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import loadGoogleAnalytics from "./config/analyticsScript";
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
  useEffect(() => loadGoogleAnalytics(), []);

  ReactGA.initialize(import.meta.env.VITE_APP_TRACKING_ANALYTICS_ID);

  useEffect(() => {
    //tracking users loaded the app
    ReactGA.pageview(window.location.pathname + window.location.search);
  }, []);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
