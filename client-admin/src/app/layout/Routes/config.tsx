import {
    Dashboard,
    ErrorPage,
    Home,
    Swap,
    Stake,
    Support,
    Transfer,
    ProductDetails,
    Settings,
    ProductList,
    Accounts,
    Register,
} from "@app/pages";

export interface IRoutes {
    id: string,
    path: string,
    element: JSX.Element
}

export const routeConfig: IRoutes[] = [
    { id: 'home', path:'/', element: <Home /> },
    { id: 'swap', path:'/Swap', element: <Swap /> },
    { id: 'stake', path:'/Stake', element: <Stake /> },
    { id: 'dashboard', path:'/dashboard', element: <Dashboard /> },
    { id: 'transfer', path:'/transfer', element: <Transfer /> },
    { id: 'details', path:'/products/:id', element: <ProductDetails /> },
    { id: 'settings', path:'/settings', element: <Settings /> },
    { id: 'products', path:'/products', element: <ProductList /> },
    { id: 'accounts', path:'/accounts', element: <Accounts /> },
    { id: 'error', path:'*', element: <ErrorPage /> }
];

export const routeBasic: IRoutes[] = [
    { id: 'home', path:'/', element: <Home /> },
    { id: 'register', path:'/register', element: <Register /> },
    { id: 'support', path:'/support', element: <Support /> },
    { id: 'error', path:'*', element: <ErrorPage /> }
];