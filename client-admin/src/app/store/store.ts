import { configureStore } from '@reduxjs/toolkit';
import configReducer from "@app/config/configReducer.ts";

export default configureStore({
    reducer: {
        config: configReducer
    },
});
