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
import MyItems from "../Pages/Items/MyItems";
import UpdateItem from "../Pages/Items/UpdateItem";

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
                loader: async () => await fetch('http://localhost:5000/items')
            },
            {
                path: "/myitems",
                element: <PrivateRoute><MyItems></MyItems></PrivateRoute>,
            },
            {
                path: "/updateitem/:id",
                element: <PrivateRoute><UpdateItem></UpdateItem></PrivateRoute>,
                loader:  ({params}) => fetch(`http://localhost:5000/host_items/${params.id}`)
            },
        ]
    },
]);

export default router;