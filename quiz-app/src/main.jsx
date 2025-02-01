import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App /> {/* No extra <BrowserRouter> here */}
  </React.StrictMode>
);
