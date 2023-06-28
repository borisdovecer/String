import _ from "lodash";
import { ProductCard } from "./";
import { Contract } from "ethers";
import { RootState } from "@app/store";
import { Link } from "react-router-dom";
import { FC, JSX, useEffect, useState } from "react";
import { ComponentWrapper } from "@app/components";
import { useAppSelector } from "@app/store/hooks.ts";
import { fields, IFields, IProduct } from './fields.ts';
import { useContractFunction, useEthers, Web3Ethers } from "@usedapp/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBoxOpen, faTag } from "@fortawesome/free-solid-svg-icons";
import {contract} from "@app/config/chainConfig.ts";
import Company from "@app/abi/Company.json";

const ProductList: FC = (): JSX.Element => {
    const theme: boolean = useAppSelector((state:RootState) => state.config.theme);
    const [formData, setFormData] = useState<any>({});
    const [products, setProducts] = useState<any>(null);
    const [companyInstance, setCompanyInstance] = useState<any>()
    const { library }: Web3Ethers | any = useEthers();

    const { send } = useContractFunction(companyInstance, 'addProduct', {});

    useEffect(() => {
        const companyInstance: Contract = new Contract(contract.company, Company.abi, library.getSigner());
        setCompanyInstance(companyInstance);
    }, []);

    useEffect(() => {
        companyInstance?.getAllProducts().then((res:any) => {

            const realData = _.map(res[1], (item) => {
                return {
                    name: 'Playstation',
                    metadata: item
                }
            });
            setProducts(realData)
        })
    }, [companyInstance])

    const handleChange = (e:any): void => {
        const { name, value } = e.target;
        setFormData({...formData, [name]: value })
    }

    const handleSubmit = (): void => {
        const { metadata } = formData;
        send(metadata).then((res) => console.log(res))
    }

    return (
        <div className='my-8 w-full'>
            <ComponentWrapper title='Products' icon={faBoxOpen}>
                <div className='flex flex-row space-x-4'>
                    <div className='w-full max-h-[700px] custom-scrollbar overflow-y-scroll'>
                        <div className="grid grid-cols-3 gap-4 py-4">
                            {products && _.map(products, (item:IProduct) => (
                                <Link key={item.name} to={`/products/${item.name}`} >
                                    <ProductCard item={item} />
                                </Link>
                            ))}
                        </div>
                    </div>
                    <div className={`${theme ? 'bg-light-primary' : 'bg-light-secondary'} w-full text-black rounded-2xl p-4`}>
                        <span><FontAwesomeIcon icon={faTag} className="mx-2" />new_product_schema_</span>
                        <div className='mt-8'>
                            {_.map(fields, (item: IFields) => (
                                <div key={item.label} className='flex flex-col'>
                                    <label>{item.label}</label>
                                    <input className={`${theme ? 'bg-light-secondary' : 'bg-light-tertiary'} rounded-xl pl-2`} type={item.type} name={item.name} onChange={handleChange} />
                                </div>
                            ))}
                        </div>
                        <div className='text-center mt-12 mb-4'>
                            <button onClick={handleSubmit} className='bg-dark-primary text-light-primary text-lg p-3 rounded-2xl px-6'>create_schema_</button>
                        </div>
                    </div>
                </div>
            </ComponentWrapper>
        </div>
    )
}

export default ProductList;