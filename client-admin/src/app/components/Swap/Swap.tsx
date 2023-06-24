import { ComponentWrapper } from "@app/components";
import { faExchangeAlt, faHandHoldingUsd} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { BigNumber, BigNumberish, Contract, ContractReceipt } from "ethers";
import { useAppSelector } from "@app/store/hooks.ts";
import { RootState} from "@app/store";
import { Falsy, useContractFunction, useEthers, useToken, useTokenBalance, useEtherBalance, Web3Ethers } from "@usedapp/core";
import { useState } from "react";
import { TokenInfo } from "@usedapp/core/dist/cjs/src/model/TokenInfo";
import { contract } from "@app/config/chainConfig.ts";
import { formatEther } from '@ethersproject/units'
import _ from "lodash";

const Swap = () => {
    const stakeInstance: Contract | null = useAppSelector((state: RootState) => state.contract.stake);
    const stringToken: TokenInfo | Falsy = useToken(contract.coin, {});
    const { account }: Web3Ethers = useEthers();
    const ethBalance: BigNumberish | Falsy = useEtherBalance(account)

    const tokenNumber: BigNumberish | Falsy = useTokenBalance(contract.coin, account, {});
    const stakedTokens: BigNumberish | Falsy = useTokenBalance(contract.stake, account, {});

    const [unlockAmount, setUnlockAmount] = useState<number>(0);

    const stake = useContractFunction(stakeInstance, 'stake', {});
    const withdraw = useContractFunction(stakeInstance, 'withdraw', {});

    const [stakeAmount, setStakeAmount] = useState<number>(0);

    const [errorMessage, setError] = useState<string>('');

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

    const handleUnlock = async (): Promise<void> => {
        const { send } = withdraw
        const bigNumStakeAmount: BigNumber = BigNumber.from(unlockAmount).mul(BigNumber.from(10).pow(18));

        if (unlockAmount !== 0 && _.toNumber(unlockAmount) <= _.toNumber(stakedTokens) / (10**18)) {
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
                                    <p className="">Swap ETH to STRC</p>
                                    <div className='mb-4'>
                                        <input type='number' className='p-2 border border-dark-quaternary rounded-3xl' /> ETH
                                    </div>
                                    <div className='mb-4'>
                                        <input type='number' className='p-2 border border-dark-quaternary rounded-3xl' /> STRC
                                    </div>
                                    <div className='flex'>
                                        <button className='w-48 p-4 bg-orange-400 rounded-3xl ' onClick={() => console.log('swap')}>Swap!</button>
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