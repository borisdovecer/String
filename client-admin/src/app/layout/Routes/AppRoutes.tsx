import { FC } from 'react';
import { useEthers } from "@usedapp/core";
import { Routes, Route } from 'react-router-dom';
import {IRoutes, routeBasic, routeConfig} from './config.tsx';

const AppRoutes: FC = () => {
    const { account } = useEthers();

    const routes:IRoutes[] = account ? routeConfig : routeBasic;
    const router: JSX.Element[] = routes.map((route: IRoutes) =>
        <Route key={route.id} path={route.path} element={route.element} />
    );

    return <Routes>{router}</Routes>;
};

export default AppRoutes;
