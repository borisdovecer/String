import { useEthers } from "@usedapp/core";

const ConnectWallet = () => {
    const { activateBrowserWallet } = useEthers();

    const connectWallet = () => {
        activateBrowserWallet();
    };

    return (
        <div className='py-6 text-xl'>
            <h1 className='text-3xl text-left'>
                Unlock Your products story...
            </h1>
            <div className='pt-12'>
                <button className='border-2 border-black px-4 rounded-3xl' onClick={connectWallet}>
                    Connect wallet
                </button>
            </div>
        </div>
    )
}

export default ConnectWallet;