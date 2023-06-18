import {
    Dashboard,
    ErrorPage,
    Home,
    Support,
    Transfer,
    ProductDetails,
    ProductDefine,
    Settings,
    ProductList,
    Accounts,
} from "@app/pages";

export interface IRoutes {
    id: string,
    path: string,
    element: JSX.Element
}

export const routeConfig: IRoutes[] = [
    { id: 'home', path:'/', element: <Home /> },
    { id: 'dashboard', path:'/dashboard', element: <Dashboard /> },
    { id: 'transfer', path:'/transfer', element: <Transfer /> },
    { id: 'details', path:'/products/:id', element: <ProductDetails /> },
    { id: 'define-product', path:'/define-product', element: <ProductDefine /> },
    { id: 'settings', path:'/settings', element: <Settings /> },
    { id: 'products', path:'/products', element: <ProductList /> },
    { id: 'accounts', path:'/accounts', element: <Accounts /> },
    { id: 'error', path:'*', element: <ErrorPage /> }
];

export const routeBasic: IRoutes[] = [
    { id: 'home', path:'/', element: <Home /> },
    { id: 'support', path:'/support', element: <Support /> },
    { id: 'error', path:'*', element: <ErrorPage /> }
];