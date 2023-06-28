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

export const contract: any = {
    nft: '0x9391c204408883F895661aa49e5BdeB87ccf71e5',
    coin: '0x6023a7ADf1B44d56d83b1Acc8f5D4201de981d42',
    stake: '0x43e62071B5d2C52BD1e3941d473459319256FfC8',
    factory: '0x38DC3846780Ab1d171436CB43E0a8fc2cD378319',
    reward: '0x9451a41D5C53D9a78e747c2758541Ec579A04d3E',
    registry: '0x62c54E5c82Fa4f578a887DfFaA5895Cc50381b27',
    company: '0x3C84ed3A6F5e0AB501AEc28aeBBd967AC64ad663'

}
