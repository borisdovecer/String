import { RootState } from "@app/store";
import { Link } from "react-router-dom";
import { shortenAddress } from "@usedapp/core";
import { useEthers, Web3Ethers } from "@usedapp/core";
import { contract } from "@app/config/chainConfig.ts";
import { toggleTheme } from "@app/config/configReducer.ts";
import { FC, JSX, useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAppSelector, useAppDispatch } from "@app/store/hooks.ts";
import { faSun, faMoon, faUser, faWallet } from '@fortawesome/free-solid-svg-icons';

const Header: FC = (): JSX.Element => {
    const theme: boolean = useAppSelector((state: RootState) => state.config.theme);
    const dispatch = useAppDispatch();
    const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
    const dropdownRef = useRef<HTMLSpanElement>(null);

    const { account, deactivate }: Web3Ethers = useEthers();

    const handleThemeToggleClick = (): void => {
        dispatch(toggleTheme());
    }

    const handleClickOutside = (e: MouseEvent): void => {
        if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
            setIsDropdownOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    return (
        <div className={`${!theme ? 'bg-dark-primary shadow-dark-tertiary shadow-sm' : 'bg-light-primary'} text-lg w-full flex justify-between items-center h-10 fixed z-50 rounded-b-xl`}>
            <div className='flex flex-row items-center'>
                <div className={`w-12 ${theme ? 'bg-dark-primary' : 'bg-light-primary'} h-1`} />
                <div className='pl-4 font-bold text-2xl'>
                    string
                </div>
            </div>
            <div className='flex flex-row items-center'>
                <div className='flex flex-row'>
                    {account &&
                        <div className='px-2 rounded-3xl'>
                            <FontAwesomeIcon icon={faWallet} className='mx-2' />
                            <span>{shortenAddress(account)}</span>
                        </div>
                    }

                    <span className="ml-4">
                    {theme ?
                        <button onClick={handleThemeToggleClick}>
                            <FontAwesomeIcon icon={faMoon} />
                        </button>
                        :
                        <button onClick={handleThemeToggleClick}>
                            <FontAwesomeIcon icon={faSun} />
                        </button>
                    }
                    </span>
                    {!account ?
                        <></>
                        :
                        <span ref={dropdownRef} className="px-4">
                            <FontAwesomeIcon icon={faUser} onClick={() => setIsDropdownOpen(!isDropdownOpen)} />
                            {isDropdownOpen && (
                                <div className="absolute mt-1.5 right-0 w-64 bg-white shadow-lg rounded border-gray-300 border mr-1 scale-in-tr">

                                    <Link to="/account" className="block px-4 py-2 text-gray-800 hover:bg-gray-200" onClick={() => setIsDropdownOpen(false)}>
                                        Account
                                    </Link>
                                    <Link to={`https://sepolia.etherscan.io/address/${contract.address}`} target='_blank'>
                                        <span className="block px-4 py-2 text-gray-800 hover:bg-gray-200">
                                            View on Etherscan
                                        </span>
                                    </Link>
                                    <div className="block px-4 py-2 text-gray-800 border-t border-gray-300 ">
                                        <button onClick={deactivate}>
                                            Disconnect
                                        </button>
                                    </div>
                                </div>
                            )}
                        </span>
                    }
                </div>
                <div className={`w-12 ${theme ? 'bg-dark-primary' : 'bg-light-primary'} h-1`} />
            </div>
        </div>
    )
}

export default Header;