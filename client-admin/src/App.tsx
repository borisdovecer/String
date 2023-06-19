import { useEffect } from "react";
import { Contract } from "ethers";
import { Layout } from "@app/layout";
import { useDispatch } from "react-redux";
import { useEthers } from "@usedapp/core";
import StringNFT from "@app/abi/StringNFT.json";
import { BrowserRouter } from "react-router-dom";
import { useAppSelector } from "@app/store/hooks.ts";
import { contract } from "@app/config/chainConfig.ts";
import { createContract } from "@app/config/ContractSlice.ts";

const App = () =>  {
    const theme = useAppSelector((state:any) => state.config.theme);
    const { account, library }:any = useEthers();

    const dispatch = useDispatch();

    useEffect(() => {
        if(account && library){
            const contractInstance = new Contract(contract.address, StringNFT.abi, library.getSigner());
            dispatch(createContract(contractInstance));
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
