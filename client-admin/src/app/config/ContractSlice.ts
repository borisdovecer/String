import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Contract } from 'ethers';

// Define a type for the slice state
interface ContractState {
    instance: Contract | null;
}

// Define the initial state
const initialState: ContractState = {
    instance: null
};

export const contractSlice = createSlice({
    name: 'contract',
    initialState,
    reducers: {
        // Define a reducer that accepts an action of type PayloadAction<Contract>
        // and updates the state
        createContract: (state:any, action: PayloadAction<Contract>) => {
            state.instance = action.payload;
        },
    },
});

// Export the reducer function as the default export
export default contractSlice.reducer;

// Export the actions created from the slice
export const { createContract } = contractSlice.actions;
