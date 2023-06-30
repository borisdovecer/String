import { Contract } from "ethers";
import { Layout } from "@app/layout";
import { RootState } from "@app/store";
import { BrowserRouter } from "react-router-dom";
import { FC, JSX, useEffect, useState } from "react";
import { useEthers, Web3Ethers} from "@usedapp/core";
import { contract } from "@app/config/chainConfig.ts";
import { useAppSelector } from "@app/store/hooks.ts";
import Registry from "@app/abi/Registry.json";

const App: FC = (): JSX.Element => {
    const theme: boolean = useAppSelector((state:RootState) => state.config.theme);
    const { account, library }: Web3Ethers | any = useEthers();
    const [registry, setRegistry] = useState<any>(null);
    const [address,setAddress] = useState<string>('')

    useEffect((): void => {
        const registryInstance: Contract = new Contract(contract.registry, Registry.abi, library?.getSigner());
        setRegistry(registryInstance);
    }, [account]);

    useEffect((): void => {
        console.log(account)
        if (account) {
            registry?.getCompanyForEmployee(account).then((res:any) => {
                setAddress(res);
                localStorage.companyWallet = res;
            })
        }

    }, [registry, account]);

    return (
      <div className={`w-full h-screen fontHeming ${theme ? 'bg-light-primary text-dark-primary' : 'bg-dark-primary text-light-primary'}`}>
        <BrowserRouter>
            {<Layout />}
        </BrowserRouter>
    </div>
  )
}

export default App
