import _ from "lodash";
import { AxiosResponse } from "axios";
import axios from "@app/config/axios.ts";
import { contract } from "@app/config/chainConfig.ts";

export const getEtherscanData = async (): Promise<any> => {
    try {


        const response: AxiosResponse = await axios.get(`**https://api.polygonscan.com/api?module=contract&action=getabi&address=${contract.nft}&apikey=...`);
        console.log(response)
        const omitArray: string[] = ['input', 'isError','value', 'txreceipt_status', 'gasPrice','gasUsed','confirmations', 'methodId', 'cumulativeGasUsed','contractAddress'];
        return _.map(response.data.result, (item) => _.omit(item, omitArray))

    } catch (error) {
        console.error('Error finding data: ', error);
        throw error;
    }
};