import _ from "lodash";
import { FC, JSX } from 'react';
import { Routes, Route } from 'react-router-dom';
// import { contract } from "@app/config/chainConfig.ts";
import { IRoutes, routeBasic, routeConfig } from './config.tsx';
import { useEthers, Web3Ethers } from "@usedapp/core";

const AppRoutes: FC = (): JSX.Element => {
    const { account }: Web3Ethers = useEthers();
    // const stakedTokens: any = useTokenBalance(contract.stake, account, {});

    const routes: IRoutes[] = account ? routeConfig : routeBasic;
    // const filteredRoutes: IRoutes[] = _.filter(routes, (route:IRoutes): boolean => route.requiredBalance > 0 ? route.requiredBalance <= (stakedTokens / (10**18)) : true);

    const router: JSX.Element[] = routes.map((route: IRoutes): JSX.Element =>
        <Route key={route.id} path={route.path} element={route.element} />
    );

    return <Routes>{router}</Routes>;
};

export default AppRoutes;
