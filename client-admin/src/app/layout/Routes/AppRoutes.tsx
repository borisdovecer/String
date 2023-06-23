import _ from "lodash";
import { FC, JSX } from 'react';
import { BigNumberish } from "ethers";
import { Routes, Route } from 'react-router-dom';
import { contract } from "@app/config/chainConfig.ts";
import { IRoutes, routeBasic, routeConfig } from './config.tsx';
import { Falsy, useEthers, useTokenBalance, Web3Ethers } from "@usedapp/core";

const AppRoutes: FC = (): JSX.Element => {
    const { account }: Web3Ethers = useEthers();
    const stakedTokens: BigNumberish | Falsy = useTokenBalance(contract.stake, account, {});
    const stakeToNumber: number = stakedTokens?.toNumber() || 0;

    const routes: IRoutes[] = account ? routeConfig : routeBasic;
    const filteredRoutes: IRoutes[] = _.filter(routes, (route:IRoutes): boolean => route.requiredBalance <= stakeToNumber);

    const router: JSX.Element[] = filteredRoutes.map((route: IRoutes) =>
        <Route key={route.id} path={route.path} element={route.element} />
    );

    return <Routes>{router}</Routes>;
};

export default AppRoutes;
