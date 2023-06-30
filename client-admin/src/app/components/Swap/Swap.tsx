import { ComponentWrapper } from "@app/components";
import { faExchangeAlt, faHandHoldingUsd} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {BigNumber, BigNumberish, constants, Contract, ContractReceipt} from "ethers";
import { Falsy, useContractFunction, useEthers, useTokenBalance, Web3Ethers, Mumbai } from "@usedapp/core";
import { useEffect, useState } from "react";
import {config, contract} from "@app/config/chainConfig.ts";
import _ from "lodash";
import Company from "@app/abi/Company.json";
import StringCoin from "@app/abi/StringCoin.json";
import { abi as IUniswapV2Router02ABI } from '@uniswap/v2-periphery/build/IUniswapV2Router02.json'
import { SwapWidget  } from '@uniswap/widgets'
import {Link} from "react-router-dom";
const UNISWAP_ROUTER_ADDRESS = "your Uniswap Router address"
const TOKEN_ADDRESS = contract.coin
const WETH_ADDRESS = constants.AddressZero
// const UNISWAP_ROUTER_ADDRESS = "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D";

const Swap = () => {
    const { account, library }: Web3Ethers | any = useEthers();
    const [companyInstance, setCompanyInstance] = useState<any>(null);
    const [coinInstance, setCoinInstance] = useState<any>(null);

    const tokenNumber: BigNumberish | Falsy = useTokenBalance(contract.coin, account, {});
    const [stakeAmount, setStakeAmount] = useState<number>(0);
    const [unlockAmount, setUnlockAmount] = useState<number>(0);

    const stake = useContractFunction(companyInstance, 'stake', {});
    const withdraw = useContractFunction(companyInstance, 'withdraw', {});

    const [uniswapInstance, setUniswapInstance] = useState<any>(null);
    const swwar = useContractFunction(uniswapInstance, 'swapExactTokensForETHSupportingFeeOnTransferTokens', { transactionName: 'Swap' })

    const [errorMessage, setError] = useState<string>('');

    useEffect(() => {
        const companyInstance: Contract = new Contract(contract.company, Company.abi, library.getSigner());
        const coinInstance: Contract = new Contract(contract.coin, StringCoin.abi, library.getSigner());
        const uniswapRouter = new Contract(
            UNISWAP_ROUTER_ADDRESS,
            IUniswapV2Router02ABI,
            library.getSigner()
        )
        setUniswapInstance(uniswapRouter);
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
    const handleUnlock = async (): Promise<void> => {
        const { send } = withdraw
        const bigNumStakeAmount: BigNumber = BigNumber.from(unlockAmount).mul(BigNumber.from(10).pow(18));
        const stakedBalance =  await companyInstance.getStakedBalance()

        if (unlockAmount !== 0 || _.toNumber(bigNumStakeAmount) <= _.toNumber(stakedBalance)) {
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

    const handleSwap = async (): Promise<void> => {
        // ... define amountOutMin, path, and to based on your requirements

        // Send the transaction
        const { send } = swap;
        // const res = await send(amountOutMin, path, to, Math.floor(Date.now() / 1000) + 60 * 20);
    }

    const jsonRpcUrlMap = {
        80001: ['https://rpc-mumbai.maticvigil.com/'],
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
                                <div className="Uniswap">
                                    {/*<SwapWidget jsonRpcUrlMap={jsonRpcUrlMap} />*/}
                                    well... until i finish this swap MATIC for STRC here:
                                    <Link to='https://app.uniswap.org/#/swap' target="_blank">
                                        <p className='text-xl mt-4 font-bold'>uniswap</p>
                                    </Link>
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