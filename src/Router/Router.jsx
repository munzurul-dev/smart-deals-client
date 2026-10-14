import { createBrowserRouter } from "react-router";
import RootLayout from "../Components/RootLayout/RootLayout";
import Home from "../Components/Home/Home";
import Register from "../Components/AuthLayout/Register";
import AuthRoot from "../Components/AuthRoot/AuthRoot";
import Login from "../Components/AuthLayout/Login";
import AllProducts from "../AllProducts/AllProducts";
import PrivetRoute from "../AuthProvider/PrivetRoute";
import ProductDetails from "../Components/ProductDetails/ProductDetails";
import ProductsRoot from "../ProductsRoot/ProductsRoot";

const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    errorElement: <p>Error page</p>,
    children: [
      {
        index: true,
        Component: Home,
      },
    ],
  },
  {
    path: "products",
    Component: ProductsRoot,
    errorElement: <p>Error page</p>,
    children: [
      {
        path: "/products/allProducts",
        element: (
          <>
            <PrivetRoute>
              <AllProducts></AllProducts>
            </PrivetRoute>
          </>
        ),
      },
      {
        path:"/products/productDetails/:id",
        loader: ({params})=> fetch(`http://localhost:3000/products/${params.id}`),
        Component: ProductDetails,
      }

    ],
  },
  {
    path: "/auth",
    Component: AuthRoot,
    errorElement: <p>Error Page</p>,
    children: [
      {
        path: "/auth/register",
        Component: Register,
      },

      {
        path: "/auth/login",
        Component: Login,
      },
    ],
  },
]);
export default router;
