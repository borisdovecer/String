import { ComponentWrapper } from "@app/components";
import { faExchangeAlt, faUsers } from "@fortawesome/free-solid-svg-icons";
import {  useContractFunction, useEthers, Web3Ethers} from "@usedapp/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { contract } from "@app/config/chainConfig.ts";
import {BigNumber, Contract, ContractReceipt} from "ethers";
import {useEffect, useState} from "react";
import CompanyFactory from '@app/abi/CompanyFactory.json'
import Registry from '@app/abi/Registry.json'
import Company from '@app/abi/Company.json'
import StringNFT from '@app/abi/StringNFT.json'
import StringCoin from '@app/abi/StringCoin.json'

const Settings = () => {
    const { account, library }: Web3Ethers | any = useEthers();
    const [factory, setFactory] = useState<any>(null);
    const [reg, setReg] = useState<any>(null);
    const [com, setCom] = useState<any>(null);
    const [nft, setNft] = useState<any>(null);
    const [coin, setCoin] = useState<any>(null);


    const factoryContract = useContractFunction(factory, 'createCompany', {});
    const addProd = useContractFunction(com, 'addProduct', {});
    const mint = useContractFunction(com, 'mintNewProduct', {});
    const stakex = useContractFunction(com, 'stake', {});
    const transferx = useContractFunction(coin, 'transfer', {});
    const { send } = useContractFunction(coin, 'approve', {});

    useEffect(() => {
        const contractInstance: Contract = new Contract(contract.factory, CompanyFactory.abi, library.getSigner());
        const registryInstance: Contract = new Contract(contract.registry, Registry.abi, library.getSigner());
        const companyInstance: Contract = new Contract(contract.company, Company.abi, library.getSigner());
        const nftInstance: Contract = new Contract(contract.nft, StringNFT.abi, library.getSigner());
        const coinInstance: Contract = new Contract(contract.coin, StringCoin.abi, library.getSigner());
        setCoin(coinInstance);
        setFactory(contractInstance);
        setReg(registryInstance);
        setCom(companyInstance);
        setNft(nftInstance);
    }, [])

    const handleClick = async (): Promise<void> => {
        const { send } = factoryContract;
        send('boris', account).then((res: ContractReceipt | undefined) => console.log(res));
    };

    console.log(coin)

    const getNftBalance =() => {
        nft.balanceOf(account).then((res:any) => console.log(res.toString()))
    }

    const handleMint = async (): Promise<void> => {
        const { send } = mint;
        send(0, 0).then((res: ContractReceipt | undefined) => console.log(res));
    };

    const handleFind = () => {
        reg.getCompanyForEmployee(account).then((res:any) => {
            console.log(res.toString());
        })
    }

    const getProductBuyId = () => {
        com.getProductById(0).then((res:any) => {
            console.log(res);
        })
    }

    const getStakedBalance = () => {
        com.getRewardBalance().then((res:any) => {
            console.log(res.toString());
        })
    }

    const transfer = () => {
        const { send } = transferx;
        send(contract.company,1000).then((res: ContractReceipt | undefined) => console.log(res));
    }

    const stake = () => {
        const { send } = stakex;
        send(1000).then((res: ContractReceipt | undefined) => console.log(res));
    }

    const handleAdd = () => {
        const { send } = addProd;
        send('boris').then((res: ContractReceipt | undefined) => console.log(res));
    }

    const approve = () => {
        const bigNumStakeAmount: BigNumber = BigNumber.from("420000").mul(BigNumber.from(10).pow(18));
        // send('0x7b8dbd971ee6aac5196d8f9713fbeb1f7478185c', contract.company, bigNumStakeAmount);

        send(contract.reward,bigNumStakeAmount).then((res: ContractReceipt | undefined) => console.log(res));
    }

    return (
        <div className='my-8 w-full'>
            <ComponentWrapper title='Settings' icon={faUsers}>
                <div className={`bg-light-primary text-dark-primary w-1/3  mt-6 rounded-3xl `}>
                    <div className="rounded-3xl">
                        <div className={`bg-light-secondary text-dark-primary rounded-3xl px-2 py-2`}>
                            <h2 className="text-xl font-semibold"><FontAwesomeIcon icon={faExchangeAlt} className="mx-2" />Settings</h2>
                        </div>
                        <div className="mt-4">
                            <div className="justify-between px-4 py-1 font-bold text-lg">
                                <div className='mb-4'>
                                    <p className="">Approve **Only Owner**</p>
                                    <button className='w-48 p-4 ml-6 bg-orange-400 rounded-3xl ' onClick={approve}>Approve!</button>
                                </div>
                            </div>
                        </div>
                        <div className="mt-4">
                            <div className="justify-between px-4 py-1 font-bold text-lg">
                                <div className='mb-4'>
                                    <p className="">Approve **Only Owner**</p>
                                    <button className='w-48 p-4 ml-6 bg-orange-400 rounded-3xl ' onClick={handleClick}>Create Company!</button>
                                </div>
                            </div>
                        </div>
                        <div className="mt-4">
                            <div className="justify-between px-4 py-1 font-bold text-lg">
                                <div className='mb-4'>
                                    <p className="">Approve **Only Owner**</p>
                                    <button className='w-48 p-4 ml-6 bg-orange-400 rounded-3xl ' onClick={handleAdd}>Add Product!</button>
                                </div>
                            </div>
                        </div>
                        <div className="mt-4">
                            <div className="justify-between px-4 py-1 font-bold text-lg">
                                <div className='mb-4'>
                                    <p className="">Approve **Only Owner**</p>
                                    <button className='w-48 p-4 ml-6 bg-orange-400 rounded-3xl ' onClick={getProductBuyId}>Get Product!</button>
                                </div>
                            </div>
                        </div>
                        <div className="mt-4">
                            <div className="justify-between px-4 py-1 font-bold text-lg">
                                <div className='mb-4'>
                                    <p className="">Approve **Only Owner**</p>
                                    <button className='w-48 p-4 ml-6 bg-orange-400 rounded-3xl ' onClick={handleMint}>Mint!</button>
                                </div>
                            </div>
                        </div>
                        <div className="mt-4">
                            <div className="justify-between px-4 py-1 font-bold text-lg">
                                <div className='mb-4'>
                                    <p className="">Approve **Only Owner**</p>
                                    <button className='w-48 p-4 ml-6 bg-orange-400 rounded-3xl ' onClick={getNftBalance}>Balance NFT!</button>
                                </div>
                            </div>
                        </div>
                        <div className="mt-4">
                            <div className="justify-between px-4 py-1 font-bold text-lg">
                                <div className='mb-4'>
                                    <p className="">Approve **Only Owner**</p>
                                    <button className='w-48 p-4 ml-6 bg-orange-400 rounded-3xl ' onClick={transfer}>Transfer!</button>
                                </div>
                            </div>
                        </div>
                        <div className="mt-4">
                            <div className="justify-between px-4 py-1 font-bold text-lg">
                                <div className='mb-4'>
                                    <p className="">Approve **Only Owner**</p>
                                    <button className='w-48 p-4 ml-6 bg-orange-400 rounded-3xl ' onClick={stake}>Stake!</button>
                                </div>
                            </div>
                        </div>
                        <div className="mt-4">
                            <div className="justify-between px-4 py-1 font-bold text-lg">
                                <div className='mb-4'>
                                    <p className="">Approve **Only Owner**</p>
                                    <button className='w-48 p-4 ml-6 bg-orange-400 rounded-3xl ' onClick={getStakedBalance}>get staked!</button>
                                </div>
                            </div>
                        </div>
                        <div className='mt-5 p-4'>
                            <button onClick={handleFind} >find</button>
                        </div>
                    </div>
                </div>
            </ComponentWrapper>
        </div>
    )
}

export default Settings;