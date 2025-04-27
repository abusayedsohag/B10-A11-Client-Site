import {
    createBrowserRouter,
} from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Auth/Login";
import Register from "../Pages/Auth/Register";
import AddItems from "../Pages/Items/AddItems";
import PrivateRoute from "../router/PrivateRoute";
import ListItems from "../Pages/Items/ListItems";
import MyItems from "../Pages/Items/MyItems";
import UpdateItem from "../Pages/Items/UpdateItem";
import RecoverItems from "../Pages/Items/RecoverItems";
import CardDetails from "../Pages/Home/CardDetails";

const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout></MainLayout>,
        errorElement: <div>404</div>,
        children: [
            {
                path: "/",
                element: <Home></Home>,
                loader: () => fetch('http://localhost:5000/item')
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
            {
                path: "/detailsitem/:id",
                element: <PrivateRoute><CardDetails></CardDetails></PrivateRoute>,
                loader:  ({params}) => fetch(`http://localhost:5000/items/${params.id}`)
            },
            {
                path: "/recoveritems",
                element: <PrivateRoute><RecoverItems></RecoverItems></PrivateRoute>,
            },
        ]
    },
]);

export default router;