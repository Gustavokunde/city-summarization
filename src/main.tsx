import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import App from "./App.tsx";
import { ErrorProvider } from "./hooks/useError";
import "./index.css";
import { persistor, store } from "./store/cities/cities";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ErrorProvider>
          <App />
        </ErrorProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
