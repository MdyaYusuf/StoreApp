import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { createBrowserRouter, RouterProvider } from "react-router"
import { getUser } from "./pages/account/accountSlice"
import { getCart } from "./pages/cart/cartSlice"
import HomePage from "./pages/HomePage"
import ProductsPage from "./pages/ProductsPage"
import ProductDetailsPage from "./pages/ProductDetailsPage"
import CartPage from "./pages/cart/CartPage"
import LoginPage from "./pages/account/LoginPage"
import RegisterPage from "./pages/account/RegisterPage"
import ErrorPage from "./pages/errors/ErrorPage"
import ServerErrorPage from "./pages/errors/ServerError"
import NotFoundPage from "./pages/errors/NotFoundPage"
import MainLayout from "./layout/MainLayout"
import Loading from "./components/Loading"
import CheckoutPage from "./pages/checkout/Checkout"
import AuthGuard from "./auth/AuthGuard"

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
        element: <AuthGuard />,
        children: [
          { path: "checkout", element: <CheckoutPage /> }
        ]
      },
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
]);

function App() {

  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  const initApp = async () => {
    await dispatch(getUser());
    await dispatch(getCart());
  }

  useEffect(() => {
    initApp().then(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <Loading message="Uygulama başlatılıyor..." />
    )
  }

  return (
    <RouterProvider router={router} />
  )
}

export default App
