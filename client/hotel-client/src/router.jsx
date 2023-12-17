import { createBrowserRouter } from "react-router-dom";
import Home from "./components/home/Home";
import EditRoom from "./components/room/EditRoom";
import ExistingRooms from "./components/room/ExistingRooms";

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
]);

export default router;
