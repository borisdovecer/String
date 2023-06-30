import { Sepolia, Mumbai } from '@usedapp/core';
import { IConfig } from './';

export const config: IConfig = {
    readOnlyChainId: Sepolia.chainId,
    readOnlyChainName: Sepolia.chainName,
    readOnlyUrls: {
        [Mumbai.chainId]: "https://rpc-mumbai.maticvigil.com",
        // [Sepolia.chainId]: getDefaultProvider('sepolia')
    },
};

console.log()
export const contract: any = {
    nft: '0xF692D943e7D18b290CC38f51583b4c80D9917b5C',
    coin: '0xFFa7CF04864Cc07Ed4ACBc9A4e01B5066452Cec6',
    stake: '0x43e62071B5d2C52BD1e3941d473459319256FfC8',
    factory: '0x7aEBf14876Db217962b45675F5C1e18D2e0b74Eb',
    reward: '0xc135FD457F1F8602b55EceaCc6EcB3faf71F19c8',
    registry: '0xa7C289C9afd37FbC41b2A32e33df32347D04D3a3',
    company: localStorage.companyWallet
}
