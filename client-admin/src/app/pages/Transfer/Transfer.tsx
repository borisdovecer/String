import _ from "lodash";
import { useEffect, useState } from "react";
import { useContractFunction, useEthers } from "@usedapp/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowAltCircleRight } from "@fortawesome/free-solid-svg-icons";
import { ComponentWrapper, TransferTable, EmployeeTable } from "@app/components";
import { useAppSelector } from "@app/store/hooks.ts";

const Transfer = () => {
    const contractInstance = useAppSelector((state) => state.contract.instance);
    const [transactions, setTransactions] = useState<any>(null);
    const [employees, setEmployees] = useState<any>(null)
    const [selected, setSelected] = useState<number[]>([])
    const [addressTo, setAddressTo] = useState<string>('');
    const { account } = useEthers();
    const { send } = useContractFunction(contractInstance, 'bulkTransfer', {});

    useEffect(() => {
        // All NFS on users wallet
        contractInstance?.walletOfOwner(account).then((res:any) => {
            const tx = _.map(res, (item) => item.toNumber())
            setTransactions(tx);
        })

        // All employees in company
        contractInstance?.getAllEmployeesInCompany(1).then((res:string) => {
            const mapped = _.map(res, (item:any) => {
                const roles:any = {
                    2: 'Transporter',
                    3: 'Minter'
                };

                const role: string = item[2] > 3 ? 'admin' : (roles[item[2]] || 'Viewer');
                return {
                    wallet: item[0],
                    role
                }
            })
            setEmployees(mapped)
        });

    }, [contractInstance]);

    const handleSubmit = () => {
        send(addressTo, selected).then((res) => console.log(res))
    }

    const handleAddressClick = (address:string) => {
        setAddressTo(address)
    }

    const handleSelectChange = (e:any) => {
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