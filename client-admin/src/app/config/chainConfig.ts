import { getDefaultProvider } from '@ethersproject/providers';
import { Sepolia } from '@usedapp/core';
import { IConfig, IContract } from './';

export const config: IConfig = {
    readOnlyChainId: Sepolia.chainId,
    readOnlyChainName: Sepolia.chainName,
    readOnlyUrls: {
        [Sepolia.chainId]: getDefaultProvider('sepolia')
    },
};

export const contract: IContract = {
    address: '0x0C417e1b32bAdf9c862F5Eb80068D350DB0c239C',
    coin: '0x47d454FD76CEB02a535f923D9c24596C164691EE',
    stake: '0x43e62071B5d2C52BD1e3941d473459319256FfC8'
}
