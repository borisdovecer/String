import { configureStore } from '@reduxjs/toolkit';
import config from "@app/config/configReducer.ts";
import contract from "@app/config/ContractSlice.ts";

export const store = configureStore({
    reducer: {
        config,
        contract
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
