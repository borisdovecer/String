import {useContractFunction, useEthers} from "@usedapp/core";
import {useEffect, useState} from "react";
import {Contract} from "ethers";
import {contract} from "@app/config/chainConfig.ts";
import StringNFT from "@app/abi/StringNFT.json";
import axios from "@app/config/axios.ts";
import _ from "lodash";

const ProductDetails = () => {
    const [data, setData] = useState<any>({});
    const [metadata, setMetadata] = useState({});
    const { activateBrowserWallet, account, library }:any = useEthers();
    const [contractInstance, setContractInstance] = useState<Contract | null>(null);
    const { send } = useContractFunction(contractInstance, 'mint', {});

    useEffect(() => {
        if(account && library){
            setContractInstance(new Contract(contract.address, StringNFT.abi, library.getSigner()));
        }
    }, [account, library]);

    useEffect(() => {
        contractInstance?.getProduct(3).then((res:any) => {
            setData(res);
        })
    }, [contractInstance])

    useEffect(() => {
        if (!_.isEmpty(data)) {
            const link = data[1];
            const ipfs = (_.split(link, '/'))

            axios.get(`https://ipfs.io/ipfs/${ipfs[2]}/${ipfs[3]}`).then((res) => {
                setMetadata(res.data)
            })
        }
    }, [data])

    const handleSubmit = async () => {
        if (!account) {
            await activateBrowserWallet();
            return;
        }
        send(1).then((res) => console.log(res));
    }

    return (
        <div className='my-8 w-full'>
            {data &&
                <div>
                    <p>Product name: {data[0]}</p>
                    <p>metadata on ipfs?: {data[1]}</p>
                    {JSON.stringify(metadata)}
                </div>
            }
            <div className='flex'>
                <button className='w-48 p-4 bg-orange-400 rounded-3xl my-10' onClick={handleSubmit}>Mint!</button>
            </div>

        </div>
    )
}

export default ProductDetails;