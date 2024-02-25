import { Alert } from "@mui/material";
import { useEffect } from "react";
import ReactGA from "react-ga";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import loadGoogleAnalytics from "./config/analyticsScript";
import { useError } from "./hooks/useError";
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
  const { error } = useError();
  ReactGA.initialize(import.meta.env.VITE_APP_TRACKING_ANALYTICS_ID);

  useEffect(() => {
    //tracking users loaded the app
    ReactGA.pageview(window.location.pathname + window.location.search);
  }, []);
  return (
    <>
      {error ? <Alert severity="error">{error}</Alert> : <></>}
      <RouterProvider router={router} />
    </>
  );
}

export default App;
