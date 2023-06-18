import {useEthers} from "@usedapp/core";

const ConnectWallet = () => {
    const { activateBrowserWallet } = useEthers();

    const connectWallet = () => {
        activateBrowserWallet();
    };

    return (
        <div>
            <p>Please, connect your wallet</p>
            <button className='mr-4 px-4 border rounded-xl' onClick={connectWallet}>
                _connect wallet
            </button>
        </div>
    )
}

export default ConnectWallet;