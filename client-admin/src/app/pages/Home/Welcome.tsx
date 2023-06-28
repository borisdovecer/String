import _ from "lodash";
import { topLevelFields } from './';
import { RootState } from "@app/store";
import { Link } from "react-router-dom";
import { FC, Fragment, JSX, useEffect, useState } from "react";
import { formatEther } from "@ethersproject/units";
import { ComponentWrapper, Swap } from "@app/components";
import { useAppSelector } from "@app/store/hooks.ts";
import { IItem } from "@app/layout/Sidebar/Items.tsx";
import { contract } from "@app/config/chainConfig.ts";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { TokenInfo } from "@usedapp/core/dist/cjs/src/model/TokenInfo";
import { useEthers, useTokenBalance, useToken, Falsy, Web3Ethers, useEtherBalance } from "@usedapp/core";
import { BigNumberish, Contract } from "ethers";
import Company from "@app/abi/Company.json";

const Welcome: FC = (): JSX.Element => {
    const theme: boolean = useAppSelector((state: RootState) => state.config.theme);
    const { account, library }: Web3Ethers | any = useEthers();
    const ethBalance: BigNumberish | Falsy = useEtherBalance(account)
    const stringToken: TokenInfo | Falsy = useToken(contract.coin, {});
    const nftBalance: string | Falsy = useTokenBalance(contract.nft, account, {})?.toString();
    const strcBalance: any = useTokenBalance(contract.coin, account, {});
    const companyBalance: any = useTokenBalance(contract.coin, contract.company, {});

    const [companyInstance, setCompanyInstance] = useState<any>(null);
    const [stakedBalance, setStakedBalance] = useState<any>();

    useEffect((): void => {
        const comInstance: Contract = new Contract(contract.company, Company.abi, library.getSigner());
        setCompanyInstance(comInstance)
    }, [])

    useEffect(() => {
        companyInstance?.getStakedBalance().then((res:BigNumberish): void => {
            setStakedBalance(res);
        })
    }, [companyInstance])

    return (
        <div className='my-8 w-full'>
            <ComponentWrapper title='Home' icon={faHome}>
                    <div className={`${theme ? 'bg-light-primary' : 'bg-light-secondary'} text-dark-primary rounded-3xl p-8 text-left text-5xl`}>
                        <h1 className='underline'>One platform</h1>
                        <h1>for managing all <span className='underline'>your products</span>.</h1>
                        <p className='text-lg pt-16'>ERC721 address: {contract.nft}</p>
                        <p className='text-lg'>ERC20 address: {contract.coin}</p>
                        <p className='text-lg'>Company address: {contract.company}</p>
                    </div>
                    <div className='flex flex-row space-x-4 text-left'>
                        <div className={`${theme ? 'bg-light-primary' : 'bg-light-secondary'} text-dark-primary rounded-3xl mt-8 w-2/3 p-8 text-xl`}>
                            <h1 className='text-2xl font-bold mb-12'>Welcome to admin panel</h1>
                            <div className='flex justify-between space-x-4'>
                                {_.map(topLevelFields, (item: IItem) => (
                                    <Fragment key={item.id}>
                                            <Link to={item.link}>
                                                <div className='text-center'>
                                                    <FontAwesomeIcon icon={item.icon} className="text-5xl p-2 border-2 border-black rounded-xl"/>
                                                    <p className='mt-2'>{item.text}</p>
                                                </div>
                                            </Link>
                                    </Fragment>
                                ))}
                            </div>
                        </div>
                        <div className={`${theme ? 'bg-light-primary' : 'bg-light-secondary'} text-dark-primary rounded-3xl mt-8 w-1/3 p-8 text-xl space-y-4`}>
                            <div className='flex flex-row justify-between'>
                                <h1 className='text-xl font-bold'>Products created:</h1>
                                <p className='text-xl font-bold'>4</p>
                            </div>
                            <div className='flex flex-row justify-between'>
                                <h1 className='text-xl font-bold'>NFT Balance: </h1>
                                <p className='text-xl font-bold'>{nftBalance} STRNFT</p>
                            </div>
                            <div className='flex flex-row justify-between'>
                                <h1 className='text-xl font-bold'>STRC Balance:</h1>
                                <p className='text-xl font-bold'>{strcBalance && formatEther(strcBalance)} {stringToken?.symbol}</p>
                            </div>
                            <div className='flex flex-row justify-between'>
                                <h1 className='text-xl font-bold'>Staked Balance:</h1>
                                <p className='text-xl font-bold'>{stakedBalance && formatEther(stakedBalance)} {stringToken?.symbol}</p>
                            </div>
                            <div className='flex flex-row justify-between'>
                                <h1 className='text-xl font-bold'>Company Balance:</h1>
                                <p className='text-xl font-bold'>{companyBalance && formatEther(companyBalance)} {stringToken?.symbol}</p>
                            </div>
                            <div className='flex flex-row justify-between'>
                                <h1 className='text-xl font-bold'>MATIC Balance:</h1>
                                <p className='text-xl font-bold'>{ethBalance && formatEther(ethBalance)} MATIC</p>
                            </div>
                        </div>
                    </div>
                </ComponentWrapper>
            <Swap />
        </div>
    )
}

export default Welcome;