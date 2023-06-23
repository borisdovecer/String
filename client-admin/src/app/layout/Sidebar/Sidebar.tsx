import _ from "lodash";
import { IProps } from './';
import { BigNumberish } from "ethers";
import { items, IItem } from './Items.tsx';
import { contract } from "@app/config/chainConfig.ts";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { Link, useLocation, Location } from "react-router-dom";
import { FC, Fragment, JSX, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Falsy, useEthers, useTokenBalance, Web3Ethers } from "@usedapp/core";

const Sidebar: FC<IProps> = ({openSidebar, setOpenSidebar}:IProps): JSX.Element => {
    const location: Location = useLocation();
    const [activeItem, setActiveItem] = useState<string>(_.split(location.pathname, '/')[1]);
    const [delayedText, setDelayedText] = useState<boolean>(false);
    const { account }: Web3Ethers = useEthers();

    const stakedTokens: BigNumberish | Falsy = useTokenBalance(contract.stake, account, {});
    const stakeToNumber: number = stakedTokens?.toNumber() || 0

    const handleItemClick = (itemId: string): void => {
        setActiveItem(itemId);
    };

    useEffect(() => {
        setTimeout(() => {
            setDelayedText(openSidebar);
        },300)

    }, [openSidebar])

    return (
        <div className={`bg-dark-primary z-10 h-screen pt-4 px-2`}>
            <div className='flex justify-left text-light-primary mt-12 ml-3 text-xl'>
                <FontAwesomeIcon icon={faBars} onClick={() => setOpenSidebar(!openSidebar)} />
            </div>
            <ul className='space-y-6 pt-6 text-left'>
                {_.map(items, (item: IItem, index: number) => (
                    <Fragment key={item.id}>
                        {item.requiredBalance <= stakeToNumber &&
                            <li key={index} onClick={() => handleItemClick(item.id)}>
                                <Link to={item.link}
                                      className={`text-xl text-light-primary pl-2 hover:border-l-2 ${activeItem === item.id ? 'border-l-2 font-extrabold' : ''}`}>
                                    <FontAwesomeIcon icon={item.icon} className="mr-4"/>
                                    {delayedText &&
                                        <span className='transition-opacity duration-500 ease-in-out'>
                                  {openSidebar && item.text}
                                </span>
                                    }
                                </Link>
                            </li>
                        }
                    </Fragment>
                ))}
            </ul>
        </div>
    )
}

export default Sidebar;