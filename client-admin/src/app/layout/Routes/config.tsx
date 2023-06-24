import {
    Dashboard,
    ErrorPage,
    Home,
    Support,
    Transfer,
    ProductDetails,
    Settings,
    ProductList,
    Accounts,
    Register,
} from "@app/pages";
import { JSX } from "react";

export interface IRoutes {
    id: string,
    path: string,
    element: JSX.Element,
    requiredBalance: number
}

export const routeConfig: IRoutes[] = [
    { id: 'home', path:'/', element: <Home />, requiredBalance: 0 },
    { id: 'dashboard', path:'/dashboard', element: <Dashboard />, requiredBalance: 100 },
    { id: 'transfer', path:'/transfer', element: <Transfer />, requiredBalance: 1000 },
    { id: 'details', path:'/products/:id', element: <ProductDetails />, requiredBalance: 2000 },
    { id: 'settings', path:'/settings', element: <Settings />, requiredBalance: 0 },
    { id: 'products', path:'/products', element: <ProductList />, requiredBalance: 2000 },
    { id: 'accounts', path:'/accounts', element: <Accounts />, requiredBalance: 1000 },
    { id: 'error', path:'*', element: <ErrorPage />, requiredBalance: 0 }
];

export const routeBasic: IRoutes[] = [
    { id: 'home', path:'/', element: <Home />, requiredBalance: 0 },
    { id: 'register', path:'/register', element: <Register />, requiredBalance: 0 },
    { id: 'support', path:'/support', element: <Support />, requiredBalance: 0 },
    { id: 'error', path:'*', element: <ErrorPage />, requiredBalance: 0 }
];