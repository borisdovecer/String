import _ from "lodash";
import { Contract } from "ethers";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import StringNFT from "@app/abi/StringNFT.json";
import { contract } from "@app/config/chainConfig.ts";
import { ComponentWrapper, Table } from "@app/components";
import { useContractFunction, useEthers } from "@usedapp/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBuilding, faUsers } from "@fortawesome/free-solid-svg-icons";

const Accounts = () => {
    const theme = useSelector((state:any) => state.config.theme);
    const [employees, setEmployees] = useState<any>([])
    const [company, setCompany] = useState<any>([])
    const [address, setAddress] = useState('');
    const { activateBrowserWallet, account, library }:any = useEthers();
    const [contractInstance, setContractInstance] = useState<Contract | null>(null);
    const addEmployee = useContractFunction(contractInstance, 'addEmployeeToCompany', {});
    const removeEmployee = useContractFunction(contractInstance, 'removeEmployee', {});

    useEffect(() => {
        if(account && library){
            setContractInstance(new Contract(contract.address, StringNFT.abi, library.getSigner()));
        }
    }, [account, library]);

    useEffect(() => {
        contractInstance?.getAllEmployeesInCompany(0).then((res:string) => setEmployees(res));
        contractInstance?.getCompanyById(1).then((res:string) => setCompany(res));
    }, [contractInstance]);

    const handleAddEmployee = async () => {
        if (!account) {
            await activateBrowserWallet();
            return;
        }
        addEmployee.send(1, address, 3).then((res) => console.log(res));
    };
    const handleRemoveEmployee = async () => {
        const { send } = removeEmployee
        if (!account) {
            await activateBrowserWallet();
            return;
        }
        send(address).then((res) => console.log(res));
    };

    const handleChange = (e:any) => {
        setAddress(e.target.value);
    }

    const accounts = _.map(employees, (item) => {
        return {
            companyId: item[1],
            wallet: item[0],
            permissionLevel: item[2]
        }
    })

    return (
        <div className='my-8 w-full'>
            <ComponentWrapper title='Acount Management' icon={faUsers}>
                <div className='flex flex-row space-x-4 text-black'>
                    <div className='w-3/4'>
                        <div className={`${theme ? 'bg-light-primary text-dark-primary' : 'bg-dark-primary text-light-primary' } text-black rounded-3xl`}>
                            {!_.isEmpty(accounts) && <Table data={accounts}/>}
                        </div>
                    </div>
                    <div className={`${theme ? 'bg-light-primary text-dark-primary' : 'bg-dark-primary text-light-primary' } w-1/4  mt-6 rounded-3xl `}>
                        <div className="rounded-3xl">
                            <div className={`${theme ? 'bg-light-secondary' : 'bg-dark-secondary'} rounded-3xl px-2 py-2`}>
                                <h2 className="text-xl font-semibold"><FontAwesomeIcon icon={faBuilding} className="mx-2" />{company[0]}</h2>
                            </div>
                            <div className="mt-4">
                                    <div className="flex justify-between px-4 py-1 font-bold text-lg">
                                        <p className="">company data...</p>
                                        <p></p>
                                    </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={`${theme ? 'bg-light-primary text-dark-primary' : 'bg-dark-primary text-light-primary'} flex flex-row space-x-4 text-black py-8 text-lg font-bold justify-between rounded-3xl mt-4 h-8 items-center`}>
                    <div className='w-full'>
                        <input onChange={handleChange} className='text-black border-black border mx-8 pl-2 w-full rounded-xl' type='text' placeholder='Address' />
                    </div>
                    <div className='w-full text-right space-x-4 pr-8'>
                        <button onClick={handleAddEmployee} className={`${theme ? 'bg-dark-primary text-light-primary' : 'bg-light-primary text-dark-primary'} w-1/4 rounded-2xl`}>
                            add employee
                        </button>
                        <button onClick={handleRemoveEmployee} className={`${theme ? 'bg-dark-primary text-light-primary' : 'bg-light-primary text-dark-primary'} w-1/4 rounded-2xl`}>
                            remove employee
                        </button>
                    </div>
                </div>
            </ComponentWrapper>
        </div>
    )
}

export default Accounts;