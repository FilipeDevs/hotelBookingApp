import { createBrowserRouter } from "react-router-dom";
import Home from "./components/home/Home";
import EditRoom from "./components/room/EditRoom";
import ExistingRooms from "./components/room/ExistingRooms";
import AddRoom from "./components/room/AddRoom";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/edit-room/:roomId",
    element: <EditRoom />,
  },
  {
    path: "/existing-rooms",
    element: <ExistingRooms />,
  },
  {
    path: "/add-room",
    element: <AddRoom />,
  },
]);

export default router;
