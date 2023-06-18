import {ComponentWrapper} from "@app/components";
import {faUsers} from "@fortawesome/free-solid-svg-icons";
import {useEffect, useState} from "react";
import {useContractFunction, useEthers} from "@usedapp/core";
import { Contract } from 'ethers';
import StringNFT from '@app/abi/StringNFT.json';
import {contract} from "@app/config/chainConfig.ts";

const Settings = () => {
    const [companyName, setCompanyName] = useState<string>('');

    const { activateBrowserWallet, account, library }:any = useEthers();
    const [contractInstance, setContractInstance] = useState<Contract | null>(null);
    const { send } = useContractFunction(contractInstance, 'addCompany', {});

    useEffect(() => {
        if(account && library){
            setContractInstance(new Contract(contract.address, StringNFT.abi, library.getSigner()));
        }

    }, [account, library]);

    useEffect(() => {
        if (contractInstance) {
            contractInstance?.getAllCompanies().then((res:string) => console.log(res))
        }
    }, [contractInstance])

    const handleChange = (e:any) => {
        setCompanyName(e.target.value);
    }

    const handleClick = async () => {
        if (!account) {
            await activateBrowserWallet();
            return;
        }
        send(companyName).then((res) => console.log(res));
    };

    return (
        <div className='my-8 w-full'>
            <ComponentWrapper title='Settings' icon={faUsers}>
                <div>
                    <div>
                        <label>Add Name of the Company **Only Owner** </label>
                        <input className='text-black' name='name' type='text' onChange={handleChange} />
                    </div>
                    <button onClick={handleClick}>Create</button>
                </div>
            </ComponentWrapper>
        </div>
    )
}

export default Settings;