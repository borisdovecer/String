import _ from "lodash";
import moment from "moment";
import { ProductCard } from "./";
import axios from "@app/config/axios.ts";
import { FC, useEffect, useState, JSX } from "react";
import { ComponentWrapper } from "@app/components";
import { useContractFunction, useEthers, Web3Ethers } from "@usedapp/core";
import { useAppSelector } from "@app/store/hooks.ts";
import { faBoxOpen} from "@fortawesome/free-solid-svg-icons";
import { RootState } from "@app/store";
import { AxiosResponse } from "axios";
import { Contract, ContractReceipt } from "ethers";
import { contract} from "@app/config/chainConfig.ts";
import Company from "@app/abi/Company.json";

interface IMedadata {
    name: string,
    description: string,
    image: string,
    attributes?: {trait_type:string | number, value: string | number}[],
    properties?: any
}

const ProductDetails : FC = () : JSX.Element => {
    const theme: boolean = useAppSelector((state: RootState) => state.config.theme);
    const [data, setData] = useState<any>({});
    const [rewardAmount, setRewardAmount] = useState<number>(0)
    const [metadata, setMetadata] = useState<IMedadata | null>(null);
    const [companyInstance, setCompanyInstance] = useState<any>()

    const mint = useContractFunction(companyInstance, 'mintNewProduct', {});

    const { library }: Web3Ethers | any = useEthers();

    useEffect(() => {
        const companyInstance: Contract = new Contract(contract.company, Company.abi, library.getSigner());
        setCompanyInstance(companyInstance);
    }, []);

    useEffect(() => {
        companyInstance?.getProductById(2).then((res:any) => {
            setData({name: 'Playstation z', metadata: res})
        })
    }, [companyInstance])

    useEffect(() => {
        if (!_.isEmpty(data)) {
            axios.get(`https://ipfs.io/ipfs/${data?.metadata}`).then((res: AxiosResponse<any>) => {
                setMetadata(res.data)
            })
        }
    }, [data])

    const handleSubmit = async () => {
        const { send } = mint;
        send(3, rewardAmount).then((res: ContractReceipt | undefined) => console.log(res));
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
            <ComponentWrapper title={data.name} icon={faBoxOpen}>
            {data &&
                <>
                    <div className='w-full flex flex-row space-x-4'>
                        <div className='w-2/12'>
                            <ProductCard item={{name: '', metadata:data.metadata}} />
                        </div>
                        <div className={`${theme ? 'bg-light-primary' : 'bg-light-secondary'} w-full text-dark-secondary p-4 text-xl rounded-3xl`}>
                            <p>{metadata?.name}</p>
                            <p>{metadata?.description}</p>
                            <input type='number' name='rewardAmount' onChange={(e:any) => setRewardAmount(e.target.value)} />
                            <div className='flex'>
                                <button className='w-48 p-4 bg-orange-400 rounded-3xl mt-10' onClick={handleSubmit}>Mint!</button>
                            </div>
                        </div>
                    </div>
                    <div className='w-full flex flex-row mt-8 space-x-4'>
                        <div className={`${theme ? 'bg-light-primary' : 'bg-light-secondary'} w-1/3 text-dark-secondary p-4 text-xl rounded-3xl`}>
                            {_.map(metadata?.attributes, (item) => (
                                <div key={item.trait_type} className='w-full flex flex-row justify-between'>
                                    <p>{item.trait_type}</p>
                                    <p>{formatValue(item.value)}</p>
                                </div>
                            ))}
                        </div>
                        <div className={`${theme ? 'bg-light-primary' : 'bg-light-secondary'} w-2/3 text-dark-secondary p-4 text-xl rounded-3xl`}>
                            <div>
                                <p>NFTs Minted for this product_</p>
                            </div>
                            []
                        </div>
                    </div>
                </>
            }
            </ComponentWrapper>
        </div>
    )
}

export default ProductDetails;