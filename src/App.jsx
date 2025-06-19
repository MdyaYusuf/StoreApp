import { createBrowserRouter, RouterProvider } from "react-router"
import MainLayout from "./layout/MainLayout"
import HomePage from "./pages/HomePage"
import ProductsPage from "./pages/ProductsPage"
import CartPage from "./pages/CartPage"
import LoginPage from "./pages/LoginPage"
import RegisterPage from "./pages/RegisterPage"
import ProductDetailsPage from "./pages/ProductDetailsPage"
import ErrorPage from "./pages/errors/ErrorPage"
import ServerErrorPage from "./pages/errors/ServerError"
import NotFoundPage from "./pages/errors/NotFoundPage"
import { useEffect } from "react"
import requests from "./api/apiClient"
import { useCartContext } from "./context/CartContext"

export const router = createBrowserRouter([
  { 
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: "products",
        children: [
          { index: true, element: <ProductsPage /> }, 
          { path: ":id", element: <ProductDetailsPage /> } 
        ]
      },
      { path: "cart", element: <CartPage /> },
      { path: "login", element: <LoginPage /> }, 
      { path: "register", element: <RegisterPage /> }, 
      { 
        path: "errors",
        children: [
          { index: true, element: <ErrorPage /> },
          { path: "server-error", element: <ServerErrorPage /> },
          { path: "not-found", element: <NotFoundPage /> }
        ]
      },
      { path: "*", element: <NotFoundPage /> }
    ]
  }
])

function App() {

  const { setCart } = useCartContext();

  useEffect(() => {
    requests.cart.get()
      .then(cart => setCart(cart))
      .catch(error => console.log(error));
  }, []);
    
  return (
    <RouterProvider router={router} />
  )
}

export default App
