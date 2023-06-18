import _ from "lodash";
import { useSelector } from "react-redux";
import { useEffect, useState} from "react";
import { ComponentWrapper, Table } from "@app/components";
import { useContractFunction, useEthers } from "@usedapp/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBuilding, faUsers } from "@fortawesome/free-solid-svg-icons";
import { RootState } from '@app/store/store.ts';

const Accounts = () => {
    const contractInstance = useSelector((state: RootState) => state.contract.instance);
    const theme = useSelector((state: RootState) => state.config.theme);
    const [employees, setEmployees] = useState<any>([])
    const [company, setCompany] = useState<any>([])
    const [address, setAddress] = useState<string>('');
    const [role, setRole] = useState<number>(0);

    const { activateBrowserWallet, account } = useEthers();
    const addEmployee = useContractFunction(contractInstance, 'addEmployeeToCompany', {});
    const removeEmployee = useContractFunction(contractInstance, 'removeEmployee', {});

    useEffect(() => {
        contractInstance?.getAllEmployeesInCompany(0).then((res:string) => setEmployees(res));
        contractInstance?.getCompanyById(1).then((res:string) => setCompany(res));
    }, [contractInstance]);

    const handleAddEmployee = async () => {
        if (!account) {
            await activateBrowserWallet();
            return;
        }
        addEmployee.send(1, address, role).then((res) => console.log(res));
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

    const handleSelectChange = (e:any) => {
        setRole(e.target.value);
    }

    const accounts = _.map(employees, (item) => {
        const roles:any = {
            2: 'Transporter',
            3: 'Minter'
        };

        const role: string = item[2] > 3 ? 'admin' : (roles[item[2]] || 'Viewer');

        return {
            wallet: item[0],
            company: company[0],
            permissionLevel: role
        }
    })
    const filterZeroCompany = _.filter(accounts, (item: never) => item[1] !== 0)
    const uniqueAddresses = _.uniqBy(filterZeroCompany, 'wallet')

    return (
        <div className='my-8 w-full'>
            <ComponentWrapper title='Acount Management' icon={faUsers}>
                <div className='flex flex-row space-x-4 text-black'>
                    <div className='w-3/4'>
                        <div className={`${theme ? 'bg-light-primary text-dark-primary' : 'bg-dark-primary text-light-primary' } text-black rounded-3xl h-min-full`}>
                            {!_.isEmpty(uniqueAddresses) && <Table data={uniqueAddresses}/>}
                        </div>
                    </div>
                    <div className={`${theme ? 'bg-light-primary text-dark-primary' : 'bg-dark-primary text-light-primary' } w-1/4  mt-6 rounded-3xl `}>
                        <div className="rounded-3xl">
                            <div className={`${theme ? 'bg-light-secondary' : 'bg-dark-secondary'} rounded-3xl px-2 py-2`}>
                                <h2 className="text-xl font-semibold"><FontAwesomeIcon icon={faBuilding} className="mx-2" />{company[0]}</h2>
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
                <div className={`${theme ? 'bg-light-primary text-dark-primary' : 'bg-dark-primary text-light-primary'} flex flex-row space-x-4 text-black py-8 text-lg font-bold justify-between rounded-3xl mt-4 h-8 items-center`}>
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
                        <button onClick={handleAddEmployee} className={`${theme ? 'bg-dark-primary text-light-primary' : 'bg-light-primary text-dark-primary'} px-4 rounded-2xl`}>
                            add employee
                        </button>
                        <button onClick={handleRemoveEmployee} className={`${theme ? 'bg-dark-primary text-light-primary' : 'bg-light-primary text-dark-primary'} px-4 rounded-2xl`}>
                            remove employee
                        </button>
                    </div>
                </div>
            </ComponentWrapper>
        </div>
    )
}

export default Accounts;