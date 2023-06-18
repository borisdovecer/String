import {ComponentWrapper, Table} from "@app/components";
import {faArrowAltCircleRight} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useEffect, useState} from "react";
import {useContractFunction, useEthers} from "@usedapp/core";
import {Contract} from "ethers";
import {contract} from "@app/config/chainConfig.ts";
import StringNFT from "@app/abi/StringNFT.json";
import _ from "lodash";

const Transfer = () => {

    const [transactions, setTransactions] = useState<any>(null);
    const [selected, setSelected] = useState<any>([])
    const [addressTo, setAddressTo] = useState('');
    const { account, library }:any = useEthers();
    const [contractInstance, setContractInstance] = useState<Contract | null>(null);
    const { send } = useContractFunction(contractInstance, 'bulkTransfer', {});

    useEffect(() => {
        if(account && library){
            setContractInstance(new Contract(contract.address, StringNFT.abi, library.getSigner()));
        }
    }, [account, library]);

    useEffect(() => {
        contractInstance?.walletOfOwner(account).then((res:any) => {
            setSelected(_.map(res, (item) => item.toNumber()));
            const tx = _.map(res, (item) => {
                return {
                    id: item.toNumber(),
                    wallet: account
                }
            })
            setTransactions(tx);
        })
    }, [contractInstance]);

    const handleSubmit = () => {
        send(addressTo, selected).then((res) => console.log(res))
    }

    return (
        <div className='my-8 w-full'>
            <ComponentWrapper title='Transfer' icon={faArrowAltCircleRight}>
                <div className='mb-4'>
                    {transactions && <Table data={transactions}/>}
                </div>
                <div className='flex flex-row space-x-4 bg-light-primary text-black text-lg font-bold justify-between rounded-3xl h-8 text-center items-center'>
                    <div className='w-full'>
                        <span>Transfer to: </span>
                        <input className='text-black border-black border pl-2 rounded-xl' type='text' placeholder='Address' onChange={(e) => setAddressTo(e.target.value)} />
                    </div>
                    <div className='w-full'>
                        <span>token count</span>
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