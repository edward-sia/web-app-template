import React from "react";
import Shell from "./Shell";

const Other = React.lazy(() => import("otherApp1/Other"))

const App = () => 
  <div style={{ width: '100%', border: '1px solid black' }}>
    <h3>Hosted app, also expose Shell React component via Module Federation.</h3>
    <Shell />
  </div>

export default App;
