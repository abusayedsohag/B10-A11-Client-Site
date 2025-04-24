import {
    createBrowserRouter,
} from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import Home from "../Pages/Home";
import Login from "../Pages/Auth/Login";
import Register from "../Pages/Auth/Register";
import AddItems from "../Pages/Items/AddItems";
import PrivateRouter from "../router/PrivateRoute";

const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout></MainLayout>,
        errorElement: <div>404</div>,
        children: [
            {
                path: "/",
                element: <Home></Home>,
            },
            {
                path: "/login",
                element: <Login></Login>,
            },
            {
                path: "/register",
                element: <Register></Register>,
            },
            {
                path: "/additems",
                element: <PrivateRouter><AddItems></AddItems></PrivateRouter>,
            },
        ]
    },
]);

export default router;