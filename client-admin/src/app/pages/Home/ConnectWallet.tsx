import { FC, JSX } from "react";
import { useEthers, Web3Ethers } from "@usedapp/core";

const ConnectWallet: FC = (): JSX.Element => {
    const { activateBrowserWallet }: Web3Ethers = useEthers();

    const connectWallet = (): void => {
        activateBrowserWallet();
    };

    return (
        <div className='py-6 text-xl'>
            <h1 className='text-3xl text-center'>
                unlock your products story
            </h1>
            <div className='pt-12'>
                <button className='border-2 border-black w-full rounded-3xl' onClick={connectWallet}>
                    connect wallet
                </button>
            </div>
        </div>
    )
}

export default ConnectWallet;