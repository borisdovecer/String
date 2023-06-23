import _ from "lodash";
import { BigNumberish } from "ethers";
import { RootState } from "@app/store";
import { Link } from "react-router-dom";
import { FC, Fragment, JSX } from "react";
import { ComponentWrapper } from "@app/components";
import { useAppSelector } from "@app/store/hooks.ts";
import { IItem } from "@app/layout/Sidebar/Items.tsx";
import { contract } from "@app/config/chainConfig.ts";
import { topLevelFields, bottomLevelFields } from './';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faCoins } from "@fortawesome/free-solid-svg-icons";
import { TokenInfo } from "@usedapp/core/dist/cjs/src/model/TokenInfo";
import { useEthers, useTokenBalance, useToken, Falsy, Web3Ethers } from "@usedapp/core";

const Welcome: FC = (): JSX.Element => {
    const theme: boolean = useAppSelector((state: RootState) => state.config.theme);
    const { account }: Web3Ethers = useEthers();
    const stringToken: TokenInfo | Falsy = useToken(contract.coin, {});
    const nftBalance: string | Falsy = useTokenBalance(contract.address, account, {})?.toString();
    const tokenNumber: string | Falsy = useTokenBalance(contract.coin, account, {})?.toString();
    const stakedTokens: BigNumberish | Falsy = useTokenBalance(contract.stake, account, {});
    const stakeToNumber: number = stakedTokens?.toNumber() || 0;

    return (
        <div className='my-8 w-full'>
            <div>
                <ComponentWrapper title='Home' icon={faHome}>
                    <div className={`${theme ? 'bg-light-primary' : 'bg-light-secondary'} text-dark-primary rounded-3xl p-8 text-left text-5xl h-[300px]`}>
                        <h1 className='underline'>One platform</h1>
                        <h1>for managing all <span className='underline'>your products</span>.</h1>
                        <p className='text-lg pt-8'>ERC721 address: {contract.address}</p>
                    </div>
                    <div className='flex flex-row space-x-4 text-left'>
                        <div className={`${theme ? 'bg-light-primary' : 'bg-light-secondary'} text-dark-primary rounded-3xl mt-8 w-2/3 p-8 text-xl`}>
                            <h1 className='text-2xl font-bold mb-12'>Welcome to admin panel</h1>
                            <div className='flex justify-between space-x-4'>
                                {_.map(topLevelFields, (item: IItem) => (
                                    <Fragment key={item.id}>
                                        {item.requiredBalance <= stakeToNumber &&
                                            <Link to={item.link}>
                                                <div className='text-center'>
                                                    <FontAwesomeIcon icon={item.icon} className="text-5xl p-2 border-2 border-black rounded-xl"/>
                                                    <p className='mt-2'>{item.text}</p>
                                                </div>
                                            </Link>
                                        }
                                    </Fragment>
                                ))}
                                {stakeToNumber <= 100 &&
                                    <div>You will have to stake 2000 STRC to use application <Link to='/token' className='text-green-500 text-2xl font-bold'>Swap/Stake</Link></div>
                                }
                            </div>
                        </div>
                        <div className={`${theme ? 'bg-light-primary' : 'bg-light-secondary'} text-dark-primary rounded-3xl mt-8 w-1/3 p-8 text-xl`}>
                            <div className='flex flex-row justify-between mb-4'>
                                <h1 className='text-2xl font-bold'>NFT Balance: </h1>
                                <p className='text-xl font-bold'>{nftBalance} STRNFT</p>
                            </div>
                            <div className='flex flex-row justify-between'>
                                <h1 className='text-2xl font-bold'>Products created:</h1>
                                <p className='text-xl font-bold'>4</p>
                            </div>
                        </div>
                    </div>
                </ComponentWrapper>
            </div>
            <div className='my-16'>
                <ComponentWrapper title='string coin' icon={faCoins}>
                    <div className={`${theme ? 'bg-light-primary' : 'bg-light-secondary'} text-dark-primary rounded-3xl p-8 text-left text-5xl h-[300px]`}>
                        <h1 className=''>Stake string coin</h1>
                        <h1>and unlock <span className='underline'>premium features</span>.</h1>
                        <p className='text-lg pt-8'>ERC20 address: {contract.address}</p>
                    </div>
                    <div className='flex flex-row space-x-4 text-left'>
                        <div className={`${theme ? 'bg-light-primary' : 'bg-light-secondary'} text-dark-primary rounded-3xl mt-8 w-2/3 p-8 text-xl`}>
                            <h1 className='text-2xl font-bold mb-12'>What would you do?</h1>
                            <div className='flex justify-between space-x-4'>
                                {_.map(bottomLevelFields, (item: IItem) => (
                                    <Fragment key={item.id}>
                                        {item.requiredBalance <= stakeToNumber &&
                                            <Link to={item.link}>
                                                <div className='text-center'>
                                                    <FontAwesomeIcon icon={item.icon} className="text-5xl p-2 border-2 border-black rounded-xl"/>
                                                    <p className='mt-2'>{item.text}</p>
                                                </div>
                                            </Link>
                                        }
                                    </Fragment>
                                ))}
                            </div>
                        </div>
                        <div className={`${theme ? 'bg-light-primary' : 'bg-light-secondary'} text-dark-primary rounded-3xl mt-8 w-1/3 p-8 text-xl`}>
                            <div className='flex flex-row justify-between mb-4'>
                                <h1 className='text-2xl font-bold'>Current Balance:</h1>
                                <p className='text-xl font-bold'>{tokenNumber} {stringToken?.symbol}</p>
                            </div>
                            <div className='flex flex-row justify-between mb-4'>
                                <h1 className='text-2xl font-bold'>Staked Balance:</h1>
                                <p className='text-xl font-bold'>{stakeToNumber} {stringToken?.symbol}</p>
                            </div>
                        </div>
                    </div>
                </ComponentWrapper>
            </div>
        </div>
    )
}

export default Welcome;