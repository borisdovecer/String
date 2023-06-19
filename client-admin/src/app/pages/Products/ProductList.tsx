import _ from "lodash";
import { ProductCard } from "./";
import { fields } from './fields.ts';
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { ComponentWrapper } from "@app/components";
import { useContractFunction } from "@usedapp/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBoxOpen, faTag } from "@fortawesome/free-solid-svg-icons";
import { useAppSelector } from "@app/store/hooks.ts";

interface IProduct {
    name: string,
    metadata: string
}

const ProductList = () => {
    const contractInstance = useAppSelector((state) => state.contract.instance);
    const [formData, setFormData] = useState<any>({});
    const [products, setProducts] = useState<IProduct[] | null>(null);
    const { send } = useContractFunction(contractInstance, 'addProductToCompany', {});

    useEffect(() => {
        contractInstance?.getAllProducts(0).then((res:any) => {
            const mapped = _.map(res, (item): IProduct => {
                return {
                    name: item[0],
                    metadata: item[1]
                }
            });
            const uniqItems: IProduct[] = _.uniqBy(mapped, 'name')
            setProducts(uniqItems);
        })
    }, [contractInstance]);

    const handleChange = (e:any) => {
        const { name, value } = e.target;
        setFormData({...formData, [name]: value })
    }

    const handleSubmit = () => {
        const { name, metadata } = formData;
        send(1, name, metadata).then((res) => console.log(res))
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
                    <div className='bg-light-primary w-full text-black rounded-2xl p-4'>
                        <span><FontAwesomeIcon icon={faTag} className="mx-2" />new_product_schema_</span>
                        <div className='mt-8'>
                            {_.map(fields, (item) => (
                                <div key={item.label} className='flex flex-col'>
                                    <label>{item.label}</label>
                                    <input className='rounded-xl pl-2 bg-light-secondary' type={item.type} name={item.name} onChange={handleChange} />
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