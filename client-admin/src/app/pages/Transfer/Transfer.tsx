import _ from "lodash";
import { IEmployee } from "./";
import { Contract, ContractReceipt } from "ethers";
import { FC, JSX, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Falsy, useContractFunction, useEthers } from "@usedapp/core";
import { faArrowAltCircleRight } from "@fortawesome/free-solid-svg-icons";
import { ComponentWrapper, TransferTable, EmployeeTable } from "@app/components";
import {contract} from "@app/config/chainConfig.ts";
import StringNFT from "@app/abi/StringNFT.json";
import Company from "@app/abi/Company.json";

const Transfer: FC = (): JSX.Element => {
    const [nftInstance, setNftInstance] = useState<any>(null);
    const ids= [1,2,3,4,5,6,7,8,9,10,11,12,13]

    const [transactions, setTransactions] = useState<number[] | null>(ids);
    const [employees, setEmployees] = useState<IEmployee[] | any>(null)
    const [selected, setSelected] = useState<number[]>([])
    const [addressTo, setAddressTo] = useState<string>('');
    const { account, library }: any = useEthers();
    const transferFrom = useContractFunction(nftInstance, 'transferFrom', {});
    const [companyInstance, setCompanyInstance] = useState<any>(null);

    useEffect(() => {
        const nftInstance: Contract = new Contract(contract.nft, StringNFT.abi, library.getSigner());
        const companyInstance: Contract = new Contract(contract.company, Company.abi, library.getSigner());
        setCompanyInstance(companyInstance);
        setNftInstance(nftInstance);
    }, []);

    console.log(nftInstance)

    useEffect(() => {
        companyInstance?.getAllEmployees().then((res:any) => {
            const formated = _.map(_.zip(...res), ([wallet, metadata, level]) => ({ wallet, metadata, level }));
            setEmployees(formated);
        })
    }, [companyInstance])

    const handleSubmit = (): void => {
        const { send } = transferFrom;
        send(account, addressTo, 1).then((res: ContractReceipt | Falsy) => console.log(res))
    }

    const handleAddressClick = (address:string): void => {
        setAddressTo(address)
    }

    const handleSelectChange = (e:any): void => {
        const { id } = e.target
        if (!_.includes(selected, _.toNumber(id))) {
            selected.push(_.toNumber(id));
            setSelected(selected);
        } else {
            _.pull(selected, _.toNumber(id))
        }
    }

    return (
        <div className='my-8 w-full'>
            <ComponentWrapper title='Transfer' icon={faArrowAltCircleRight}>
                <div className='flex flex-row space-x-4'>
                    <div className='mb-4 w-1/2'>
                        {transactions &&
                            <TransferTable data={transactions} selected={selected} handleSelectChange={handleSelectChange} />
                        }
                    </div>
                    <div className='mb-4 w-1/2'>
                        {employees &&
                            <EmployeeTable employees={_.uniqBy(employees, 'wallet')} handleAddressClick={handleAddressClick} />
                        }
                        <div className='flex flex-row space-x-4 bg-light-primary text-black text-lg font-bold justify-between rounded-3xl mt-4 h-60 p-8'>
                            {!_.isEmpty(selected) &&
                                <div>
                                    <p>Transfer from: {account}</p>
                                    <p>Tokens: {JSON.stringify(selected)}</p>
                                    <p>Addres to: {addressTo}</p>
                                </div>}
                        </div>
                    </div>
                </div>
                <div className='flex flex-row space-x-4 bg-light-primary text-black text-lg font-bold justify-between rounded-3xl h-8 text-center items-center'>
                    <div className='w-full'>
                        <span>Transfer to: </span>
                        <input className='text-black border-black border pl-2 rounded-xl' value={addressTo} type='text' placeholder='Address' onChange={(e) => setAddressTo(e.target.value)} />
                    </div>
                    <div className='w-full'>
                        <span>tokens count</span>
                        <span className='mx-2 px-2 bg-light-secondary rounded-lg'>{_.size(transactions)}</span>
                    </div>
                    <div className='w-full'>
                        <button onClick={handleSubmit} className='bg-dark-primary text-light-primary w-1/2 rounded-2xl'>
                            <FontAwesomeIcon icon={faArrowAltCircleRight} className="mx-2" />
                            transfer
                        </button>
                    </div>
                </div>
            </ComponentWrapper>
        </div>
    )
}

export default Transfer;