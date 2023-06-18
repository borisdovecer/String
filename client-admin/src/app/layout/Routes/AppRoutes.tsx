import { FC } from 'react';
import { Routes, Route } from 'react-router-dom';
import {IRoutes, routeBasic, routeConfig} from './config.tsx';
import {useEthers} from "@usedapp/core";

const AppRoutes: FC = () => {
    const { account } = useEthers();

    const routes:IRoutes[] = account ? routeConfig : routeBasic;
    const router: JSX.Element[] = routes.map((route: IRoutes) =>
        <Route key={route.id} path={route.path} element={route.element} />
    );

    return <Routes>{router}</Routes>;
};

export default AppRoutes;
