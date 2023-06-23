import { ComponentWrapper } from "@app/components";
import { faExchangeAlt, faHandHoldingUsd} from "@fortawesome/free-solid-svg-icons";
// import _ from "lodash";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {Contract, ContractReceipt} from "ethers";
import {useAppSelector} from "@app/store/hooks.ts";
import {RootState} from "@app/store";
import {useContractFunction} from "@usedapp/core";
import {useState} from "react";

const Swap = () => {
    const stakeInstance: Contract | null = useAppSelector((state: RootState) => state.contract.stake);
    const [stakeAmount, setStakeAmount] = useState<number | null>();
    const { send } = useContractFunction(stakeInstance, 'stake', {});

    const handleStake = () => {
        send(stakeAmount).then((res: ContractReceipt | undefined) => console.log(res));
    }

    return (
        <div className='my-8'>
            <ComponentWrapper title='Swap ETH to SRTC' icon={faHandHoldingUsd}>
                <div className='flex flex-row space-x-4 text-black'>
                    <div className={`bg-light-primary text-dark-primary w-1/3  mt-6 rounded-3xl `}>
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
                    <div className={`bg-light-primary text-dark-primary w-1/3  mt-6 rounded-3xl `}>
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
                                        <input type='number' className='p-2 border border-dark-quaternary rounded-3xl' /> sSTRC
                                        <button className='w-48 p-4 ml-6 bg-orange-400 rounded-3xl ' onClick={() => console.log('swap')}>Unlock!</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={`bg-light-primary text-dark-primary w-1/3  mt-6 rounded-3xl `}>
                        <div className="rounded-3xl">
                            <div className={`bg-light-secondary text-dark-primary rounded-3xl px-2 py-2`}>
                                <h2 className="text-xl font-semibold"><FontAwesomeIcon icon={faExchangeAlt} className="mx-2" />Balance</h2>
                            </div>
                            <div className="mt-4">
                                <div className="justify-between px-4 py-1 font-bold text-lg">
                                    <p className="">Your current balance:</p>
                                    <p>1,312.666 STRC</p>
                                    <p>0.00 sSTRC</p>
                                    <p>1.2333 ETH</p>

                                    <p>rewards: 234.423 STRC</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </ComponentWrapper>
        </div>
    )
};

export default Swap;