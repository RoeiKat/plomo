import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import "./index.css";
import App from "./App";
import { store } from "./store/store";

const el = document.getElementById("root");
if (!el) throw new Error("Root element #root not found");

console.log("boot: app"); // confirm you still see this

ReactDOM.createRoot(el).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
);
