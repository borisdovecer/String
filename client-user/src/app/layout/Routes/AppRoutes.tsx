import { Routes, Route } from 'react-router-dom';
import { Home, ErrorPage, Support, ProductDetails, ProductList } from "@app/pages";

const routeConfig = [
    { id: 'home', path:'/', element: <Home /> },
    { id: 'home', path:'/support', element: <Support /> },
    { id: 'home', path:'/products/:id', element: <ProductDetails /> },
    { id: 'home', path:'/products', element: <ProductList /> },
    { id: 'error', path:'*', element: <ErrorPage /> }
]

const AppRoutes = () => {
    const router = routeConfig.map((route) =>
        <Route key={route.id} path={route.path} element={route.element} />
    );

    return <Routes>{router}</Routes>;
};

export default AppRoutes;
