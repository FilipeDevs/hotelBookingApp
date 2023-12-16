import { useState } from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "/node_modules/bootstrap/dist/js/bootstrap.min.js";
import AddRoom from "./components/room/AddRoom";
import ExistingRooms from "./components/room/ExistingRooms";

function App() {
  return (
    <>
      <AddRoom />
      <ExistingRooms />
    </>
  );
}

export default App;
