import _ from "lodash";
import moment from "moment";
import { ProductCard } from "./";
import axios from "@app/config/axios.ts";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { RootState } from "@app/store/store.ts";
import { ComponentWrapper } from "@app/components";
import { useContractFunction } from "@usedapp/core";
import { faBoxOpen} from "@fortawesome/free-solid-svg-icons";

const ProductDetails = () => {
    const contractInstance = useSelector((state: RootState) => state.contract.instance);
    const [data, setData] = useState<any>({});
    const [metadata, setMetadata] = useState<any>({});
    const { send } = useContractFunction(contractInstance, 'mint', {});

    useEffect(() => {
        contractInstance?.getProduct(9).then((res:any) => {
            setData(res);
        })
    }, [contractInstance])

    useEffect(() => {
        if (!_.isEmpty(data)) {
            axios.get(`https://ipfs.io/ipfs/${data[1]}`).then((res) => {
                setMetadata(res.data)
            })
        }
    }, [data])

    const handleSubmit = async () => {
        const response = await send(9);
        console.log(response);
    }

    const formatValue = (value:any) => {
        if (typeof value === 'boolean') {
            return value ? 'Yes' : 'No'
        }

        if (moment(value, moment.ISO_8601, true).isValid()) {
            return moment(value).format('DD/MM/YYYY');
        }

        return value
    }

    return (
        <div className='my-8 w-full'>
            <ComponentWrapper title={data[0]} icon={faBoxOpen}>
            {data &&
                <>
                    <div className='w-full flex flex-row space-x-4'>
                        <div className='w-2/12'>
                            <ProductCard item={{name: '', metadata:data[1]}} />
                        </div>
                        <div className='w-full bg-light-primary text-dark-secondary p-4 text-xl rounded-3xl'>
                            <p>{metadata.name}</p>
                            <p>{metadata.description}</p>
                            <div className='flex'>
                                <button className='w-48 p-4 bg-orange-400 rounded-3xl mt-10' onClick={handleSubmit}>Mint!</button>
                            </div>
                        </div>
                    </div>
                    <div className='w-full flex flex-row mt-8 space-x-4'>
                        <div className='w-1/3 bg-light-primary text-dark-secondary p-4 text-xl rounded-3xl'>
                            {_.map(metadata.attributes, (item) => (
                                <div className='w-full flex flex-row justify-between'>
                                    <p>{item.trait_type}</p>
                                    <p>{formatValue(item.value)}</p>
                                </div>
                            ))}
                        </div>
                        <div className='w-2/3 bg-light-primary text-dark-secondary p-4 text-xl rounded-3xl'>
                            <div>
                                <p>NFTs Minted for this product_</p>
                            </div>
                            [
                            {_.map(data[2], (item) => (
                                <span className='pr-2'>{item.toNumber()}</span>
                            ))}
                            ]
                        </div>
                    </div>
                </>
            }
            </ComponentWrapper>
        </div>
    )
}

export default ProductDetails;