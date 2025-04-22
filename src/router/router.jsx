import {
    createBrowserRouter,
} from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import Home from "../Pages/Home";

const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout></MainLayout>,
        errorElement: <div>404</div>,
        children: [
            {
                path: "/",
                element: <Home></Home>,
            }
        ]
    },
]);

export default router;