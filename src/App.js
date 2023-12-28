import React from "react";
import Footer from "./Component/Footer";
// import Tooltip css globally
import "react-tippy/dist/tippy.css";
import "./index.css"
import AppNavigators from "./navigators/AppNavigators";
function App() {

  return (
    <div>
      <AppNavigators />
      <Footer />
    </div>
  );
}

export default App;
