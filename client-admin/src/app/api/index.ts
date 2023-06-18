import axios from "@app/config/axios.ts";
import { contract } from "@app/config/chainConfig.ts";
import _ from "lodash";

export const getEtherscanData = async () => {
    try {
        const response = await axios.get(`https://api-sepolia.etherscan.io/api?module=account&action=txlist&address=${contract.address}&apikey=128GJPMTD44MYQNCWAAC2PEJQQ8RE3NQE3`);

        const omitArray = ['input', 'isError','value', 'txreceipt_status', 'gasPrice','gasUsed','confirmations', 'methodId', 'cumulativeGasUsed','contractAddress'];
        return _.map(response.data.result, (item) => _.omit(item, omitArray))

    } catch (error) {
        console.error('Error finding data: ', error);
        throw error;
    }
};