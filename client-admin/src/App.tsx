import { Contract } from "ethers";
import { Layout } from "@app/layout";
import { RootState } from "@app/store";
import { Action } from "@reduxjs/toolkit";
import { BrowserRouter } from "react-router-dom";
import StringNFT from "@app/abi/StringNFT.json";
import StringCoin from "@app/abi/StringCoin.json";
import StringStake from "@app/abi/StringStake.json";
import { Dispatch, FC, JSX, useEffect } from "react";
import { useEthers, Web3Ethers} from "@usedapp/core";
import { contract } from "@app/config/chainConfig.ts";
import { useAppDispatch, useAppSelector } from "@app/store/hooks.ts";
import { createContract, createCoin, createStake } from "@app/config/ContractSlice.ts";

const App: FC = (): JSX.Element => {
    const theme: boolean = useAppSelector((state:RootState) => state.config.theme);
    const { account, library }: Web3Ethers | any = useEthers();

    const dispatch:Dispatch<Action> = useAppDispatch();

    useEffect(() => {
        if(account && library){
            const contractInstance: Contract = new Contract(contract.address, StringNFT.abi, library.getSigner());
            const stringInstance: Contract = new Contract(contract.coin, StringCoin.abi, library.getSigner());
            const stakeInstance: Contract = new Contract(contract.stake, StringStake.abi, library.getSigner());

            dispatch(createContract(contractInstance));
            dispatch(createCoin(stringInstance));
            dispatch(createStake(stakeInstance));
        }
    }, [account, library, dispatch]);

    return (
      <div className={`w-full h-screen fontHeming ${theme ? 'bg-light-primary text-dark-primary' : 'bg-dark-primary text-light-primary'}`}>
        <BrowserRouter>
            <Layout />
        </BrowserRouter>
    </div>
  )
}

export default App
