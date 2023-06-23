import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Contract } from 'ethers';
import { ContractState } from './';

// Define the initial state
const initialState: ContractState = {
    instance: null,
    coin: null,
    stake: null
};


export const contractSlice= createSlice({
    name: 'contract',
    initialState,
    reducers: {
        createContract: (state:any, action: PayloadAction<Contract>) => {
            state.instance = action.payload;
        },
        createCoin: (state:any, action: PayloadAction<Contract>) => {
            state.coin = action.payload;
        },
        createStake: (state:any, action: PayloadAction<Contract>) => {
            state.stake = action.payload;
        },
    },
});

// Export the reducer function as the default export
export default contractSlice.reducer;

// Export the actions created from the slice
export const { createContract, createStake, createCoin } = contractSlice.actions;
