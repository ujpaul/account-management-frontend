import React from "react";
// import ReactDOM from "react-dom/client";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter } from "react-router-dom";

import { store } from "./redux/store";
import { Provider } from "react-redux";

import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

// Css
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/animate.css/animate.css";
import "../node_modules/slick-carousel/slick/slick.css";
import "../node_modules/slick-carousel/slick/slick-theme.css";
import "../node_modules/cropperjs/dist/cropper.css";
import "../node_modules/toastr/build/toastr.min.css";
import "../node_modules/react-data-table-component-extensions/dist/index.css";
import "../node_modules/driver.js/dist/driver.min.css";
import "./assets/vendors/iconic-fonts/flat-icons/flaticon.css";
import "./assets/vendors/iconic-fonts/cryptocoins/cryptocoins.css";
import "./assets/vendors/iconic-fonts/cryptocoins/cryptocoins-colors.css";
import "./assets/vendors/iconic-fonts/font-awesome/css/all.min.css";
import "./assets/css/style.css";
import "./assets/css/custom.css";

const client = new QueryClient()
// const root = ReactDOM.createRoot(document.getElementById("fusion"));
ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={client}>
        <Provider store={store}>
          <App />
        </Provider>
      </QueryClientProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("fusion")
);
