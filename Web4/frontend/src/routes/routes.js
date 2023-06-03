import MainPage from "../pages/MainPage";
import LoginPage from "../pages/LoginPage";
import About from "../pages/About";

export const privateRoutes = [
    {path: "/main", element: <MainPage/>, exact: true},
    {path: "/about", element: <About/>, exact: true}
]

export const publicRoutes = [
    {path: "/login", element: <LoginPage/>, exact: true},
    {path: "/about", element: <About/>, exact: true}
]