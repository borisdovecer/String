import { Contract } from "ethers";

export interface IConfig {
    readOnlyChainId: number,
    readOnlyChainName: string,
    readOnlyUrls: { [p: number]: string }
}

export interface IContract {
    address: string;
    coin: string;
    stake: string
}

export interface ContractState {
    instance: Contract | null;
    coin: Contract | null;
    stake: Contract | null;
}