import _ from "lodash";
import { useEffect, useState} from "react";
import {useContractFunction, useEthers, Web3Ethers} from "@usedapp/core";
import {ComponentWrapper, EmployeeTable} from "@app/components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBuilding, faUsers } from "@fortawesome/free-solid-svg-icons";
import {Contract} from "ethers";
import {contract} from "@app/config/chainConfig.ts";
import Company from "@app/abi/Company.json";

const Accounts = () => {
    const [employees, setEmployees] = useState<any>([])
    // const [company, setCompany] = useState<any>([])
    const [address, setAddress] = useState<string>('');
    const [role, setRole] = useState<number>(0);
    const [companyInstance, setCompanyInstance] = useState<any>(null);

    const { library }: Web3Ethers | any = useEthers();

    const addEmployee = useContractFunction(companyInstance, 'addEmployee', {});
    // const removeEmployee = useContractFunction(contractInstance, 'removeEmployee', {});

    useEffect(() => {
        const companyInstance: Contract = new Contract(contract.company, Company.abi, library.getSigner());
        setCompanyInstance(companyInstance);
    }, []);

    useEffect(() => {
        companyInstance?.getAllEmployees().then((res:any) => {
            const formated = _.map(_.zip(...res), ([wallet, metadata, level]) => ({ wallet, metadata, level }));
            setEmployees(formated);

        })
    }, [companyInstance])

    const handleAddEmployee = async () => {
        addEmployee.send(address,0,'meta', role).then((res) => console.log(res));
    };
    const handleRemoveEmployee = async () => {
        // const { send } = removeEmployee
        // send(address).then((res) => console.log(res));
    };

    const handleChange = (e:any) => {
        setAddress(e.target.value);
    }

    const handleSelectChange = (e:any) => {
        setRole(e.target.value);
    }

    const handleAddressClick = (address:string) => {
        setAddress(address)
    }

    return (
        <div className='my-8 w-full'>
            <ComponentWrapper title='Acount Management' icon={faUsers}>
                <div className='flex flex-row space-x-4 text-black'>
                    <div className='w-3/4'>
                        <div className={`bg-light-secondary text-dark-primary rounded-3xl h-min-full`}>
                            {!_.isEmpty(employees) && <EmployeeTable employees={employees} handleAddressClick={handleAddressClick}/>}
                        </div>
                    </div>
                    <div className={`bg-light-primary text-dark-primary w-1/4  mt-6 rounded-3xl `}>
                        <div className="rounded-3xl">
                            <div className={`bg-light-secondary text-dark-primary rounded-3xl px-2 py-2`}>
                                <h2 className="text-xl font-semibold"><FontAwesomeIcon icon={faBuilding} className="mx-2" />{}</h2>
                            </div>
                            <div className="mt-4">
                                    <div className="justify-between px-4 py-1 font-bold text-lg">
                                        <p className="">company details...</p>
                                        <p>Some basic information about company</p>
                                        <p>Data will be fetched from ipfs</p>
                                    </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={`bg-light-primary text-dark-primary flex flex-row space-x-4 py-8 text-lg font-bold justify-between rounded-3xl mt-4 h-8 items-center`}>
                    <div className='w-full flex justify-between items-center'>
                        <input onChange={handleChange} className='text-black border-black border mx-8 pl-2 w-2/3 rounded-xl' type='text' placeholder='Address' />
                        <select onChange={handleSelectChange} className='border-black border mx-8 pl-2 w-1/2 rounded-xl'>
                            <option value={4}>Admin</option>
                            <option value={3}>Minter</option>
                            <option value={2}>Transporter</option>
                            <option value={1}>Viewer</option>
                        </select>
                    </div>
                    <div className='w-1/3 flex flex-row space-x-6 px-4'>
                        <button onClick={handleAddEmployee} className={`bg-dark-primary text-light-primary px-4 rounded-2xl`}>
                            add employee
                        </button>
                        <button onClick={handleRemoveEmployee} className={`bg-dark-primary text-light-primary px-4 rounded-2xl`}>
                            remove employee
                        </button>
                    </div>
                </div>
            </ComponentWrapper>
        </div>
    )
}

export default Accounts;