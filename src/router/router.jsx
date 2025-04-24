import {
    createBrowserRouter,
} from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import Home from "../Pages/Home";
import Login from "../Pages/Auth/Login";
import Register from "../Pages/Auth/Register";
import AddItems from "../Pages/Items/AddItems";
import PrivateRoute from "../router/PrivateRoute";
import ListItems from "../Pages/Items/ListItems";

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
                element: <PrivateRoute><AddItems></AddItems></PrivateRoute>,
            },
            {
                path: "/listitems",
                element: <PrivateRoute><ListItems></ListItems></PrivateRoute>,
                loader: async() => await fetch('http://localhost:5000/items')
            },
        ]
    },
]);

export default router;