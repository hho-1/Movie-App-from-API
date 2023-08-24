import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
<BrowserRouter>           {/* context yapısınında navigate kullanabilmesi için app i browserrouter ile sarmalladık */}
    <App />
</BrowserRouter>
);
