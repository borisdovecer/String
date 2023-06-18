import { Layout } from "@app/layout";
import { BrowserRouter } from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {Contract} from "ethers";
import {contract} from "@app/config/chainConfig.ts";
import StringNFT from "@app/abi/StringNFT.json";
import {createContract} from "@app/config/ContractSlice.ts";
import {useEthers} from "@usedapp/core";

const App = () =>  {
    const theme = useSelector((state:any) => state.config.theme);
    const { account, library }:any = useEthers();

    const dispatch = useDispatch();

    useEffect(() => {
        if(account && library){
            const contractInstance = new Contract(contract.address, StringNFT.abi, library.getSigner());
            dispatch(createContract(contractInstance));
        }
    }, [account, library, dispatch]);

    return (
      <div className={`w-full h-screen ${theme ? 'bg-light-primary text-dark-primary' : 'bg-dark-primary text-light-primary'}`}>
        <BrowserRouter>
            <Layout />
        </BrowserRouter>
    </div>
  )
}

export default App
