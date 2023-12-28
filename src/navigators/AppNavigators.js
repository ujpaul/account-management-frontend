import React from "react";
import { Route, Routes } from "react-router-dom";
import routes from "./routes";
import ProtectedRoute from "../utils/ProtectedRoute";


const AppNavigators = () => (
      <Routes>
        {
          routes.map((route) => (
            <Route
              exact
              path={route.path}
              element={
                route.requireAuth ? (
                  <ProtectedRoute>
                    {route.element}
                  </ProtectedRoute>
                ): route.element
              } 
            />
          ))
        }
      </Routes>
  );

export default AppNavigators;
