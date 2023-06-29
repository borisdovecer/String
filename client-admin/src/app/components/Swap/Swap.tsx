import { ComponentWrapper } from "@app/components";
import { faExchangeAlt, faHandHoldingUsd} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { BigNumber, BigNumberish, Contract, ContractReceipt } from "ethers";
import { useAppSelector } from "@app/store/hooks.ts";
import { RootState} from "@app/store";
import { Falsy, useContractFunction, useEthers, useTokenBalance, Web3Ethers } from "@usedapp/core";
import {useEffect, useState} from "react";
import { contract } from "@app/config/chainConfig.ts";
import _ from "lodash";
import Company from "@app/abi/Company.json";
import StringCoin from "@app/abi/StringCoin.json";

const Swap = () => {
    // const stakeInstance: Contract | null = useAppSelector((state: RootState) => state.contract.stake);
    // const stringToken: TokenInfo | Falsy = useToken(contract.coin, {});
    const { account, library }: Web3Ethers | any = useEthers();

    const tokenNumber: BigNumberish | Falsy = useTokenBalance(contract.coin, account, {});
    const [unlockAmount, setUnlockAmount] = useState<number>(0);
    const [transferAmount, setTransferAmount] = useState<number>(0);


    const [companyInstance, setCompanyInstance] = useState<any>(null);
    const [coinInstance, setCoinInstance] = useState<any>(null);
    const stake = useContractFunction(companyInstance, 'stake', {});
    const withdraw = useContractFunction(companyInstance, 'withdraw', {});
    const transfer = useContractFunction(coinInstance, 'transfer', {});

    const [stakeAmount, setStakeAmount] = useState<number>(0);
    const [errorMessage, setError] = useState<string>('');

    useEffect(() => {
        const companyInstance: Contract = new Contract(contract.company, Company.abi, library.getSigner());
        const coinInstance: Contract = new Contract(contract.coin, StringCoin.abi, library.getSigner());
        setCoinInstance(coinInstance);
        setCompanyInstance(companyInstance);
    }, [])

    const handleStake = async (): Promise<void> => {
        const { send } = stake;
        const bigNumStakeAmount: BigNumber = BigNumber.from(stakeAmount).mul(BigNumber.from(10).pow(18));


        if (stakeAmount > 0 && _.toNumber(stakeAmount) <= _.toNumber(tokenNumber) / (10**18)) {
            const res: ContractReceipt | undefined = await send(bigNumStakeAmount);
            if (res) {
                setError('Ok!')
            } else {
                setError('Not Ok!')
            }
        } else {
            setError('Invalid token amount')
        }
    }
    console.log(coinInstance);
    const handleUnlock = async (): Promise<void> => {
        const { send } = withdraw
        const bigNumStakeAmount: BigNumber = BigNumber.from("9").mul(BigNumber.from(10).pow(18));

        const ee =  await companyInstance.getStakedBalance()
        const xx =  await coinInstance.balanceOf(contract.company)

        console.log(xx);


        if (unlockAmount !== 0 || _.toNumber(bigNumStakeAmount) <= _.toNumber(ee)) {
            const res: ContractReceipt | undefined = await send(bigNumStakeAmount);
            if (res) {
                setError('Ok!')
            } else {
                setError('Not Ok!')
            }
        } else {
            setError('Invalid token amount');
        }
    }

    const handleTransfer = async (): Promise<void> => {
        const { send } = transfer
        const bigNumTransferAmount: BigNumber = BigNumber.from(transferAmount).mul(BigNumber.from(10).pow(18));
        const res: ContractReceipt | undefined = await send(contract.company, bigNumTransferAmount);
        if (res) {
            setError('Ok!')
        } else {
            setError('Not Ok!')
        }

    }

    return (
        <div className='my-8'>
            <ComponentWrapper title='Swap ETH to SRTC' icon={faHandHoldingUsd}>
                <div className='flex flex-row space-x-4 text-black'>
                    <div className={`bg-light-primary text-dark-primary w-1/2  mt-6 rounded-3xl `}>
                        <div className="rounded-3xl">
                            <div className={`bg-light-secondary text-dark-primary rounded-3xl px-2 py-2`}>
                                <h2 className="text-xl font-semibold"><FontAwesomeIcon icon={faExchangeAlt} className="mx-2" />Swap</h2>
                            </div>
                            <div className="mt-4">
                                <div className="px-4 py-1 font-bold text-lg">
                                    <p className="">Transfer to Company wallet </p>
                                    <div className='mb-4'>
                                        <input type='number' className='p-2 border border-dark-quaternary rounded-3xl' onChange={(e:any) => setTransferAmount(e.target.value)} /> STRC
                                    </div>
                                    <div className='flex flex-row justify-center'>
                                        <button className='w-48 p-4 bg-orange-400 rounded-3xl ' onClick={handleTransfer}>Send!</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={`bg-light-primary text-dark-primary w-1/2 mt-6 rounded-3xl `}>
                        <div className="rounded-3xl">
                            <div className={`bg-light-secondary text-dark-primary rounded-3xl px-2 py-2`}>
                                <h2 className="text-xl font-semibold"><FontAwesomeIcon icon={faExchangeAlt} className="mx-2" />Stake</h2>
                            </div>
                            <div className="mt-4">
                                <div className="justify-between px-4 py-1 font-bold text-lg">
                                    <div className='mb-4'>
                                        <p className="">Stake your SRTC</p>
                                        <input type='number' className='p-2 border border-dark-quaternary rounded-3xl' onChange={(e:any) => setStakeAmount(e.target.value)} /> STRC
                                        <button className='w-48 p-4 ml-6 bg-orange-400 rounded-3xl ' onClick={handleStake}>Stake!</button>
                                    </div>
                                    <div className='mb-4'>
                                        <p className="">Unlock your SRTC</p>
                                        <input type='number' className='p-2 border border-dark-quaternary rounded-3xl' onChange={(e:any) => setUnlockAmount(e.target.value)} /> sSTRC
                                        <button className='w-48 p-4 ml-6 bg-orange-400 rounded-3xl ' onClick={handleUnlock}>Unlock!</button>
                                    </div>
                                </div>
                            </div>
                            <div className='text-center h-10'>
                                {errorMessage}
                            </div>
                        </div>
                    </div>
                </div>

            </ComponentWrapper>
        </div>
    )
};

export default Swap;