import _ from "lodash";
import { Contract } from "ethers";
import { fields } from './fields.ts';
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import StringNFT from "@app/abi/StringNFT.json";
import { ComponentWrapper } from "@app/components";
import { contract } from "@app/config/chainConfig.ts";
import { useContractFunction, useEthers } from "@usedapp/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBoxOpen, faTag } from "@fortawesome/free-solid-svg-icons";
import axios from "@app/config/axios.ts";

const ProductList = () => {
    const [formData, setFormData] = useState<any>({});
    const [products, setProducts] = useState(null);
    const { account, library }:any = useEthers();
    const [contractInstance, setContractInstance] = useState<Contract | null>(null);
    const { send } = useContractFunction(contractInstance, 'addProductToCompany', {});

    useEffect(() => {
        if(account && library){
            setContractInstance(new Contract(contract.address, StringNFT.abi, library.getSigner()));
        }
    }, [account, library]);

    useEffect(() => {
        contractInstance?.getAllProducts(0).then((res:any) => {
            setProducts(res);
        })
    }, [contractInstance]);

    useEffect(() => {
        if (products) {
            const ee = (products?.[2][1]);

            const splitted = (_.split(ee, '/'))
            axios.get(`https://ipfs.io/ipfs/${splitted[2]}/${splitted[3]}`).then((res) => {
                console.log(res)
            })

        }
    }, [products])

    const handleChange = (e:any) => {
        const { name, value } = e.target;
        setFormData({...formData, [name]: value })
    }

    const handleSubmit = () => {
        const { name, metadata } = formData;
        send(0, name, metadata).then((res) => console.log(res))
    }

    return (
        <div className='my-8 w-full'>
            <ComponentWrapper title='Products' icon={faBoxOpen}>
                <div className='flex flex-row space-x-4'>
                    <div className='w-full max-h-[700px] custom-scrollbar overflow-y-scroll'>
                        <div className="grid grid-cols-3 gap-4 py-4">
                            {products && _.map(products, (item:any, index:number) => (
                                <Link to={`/products/${item[0]}`}>
                                    <div key={index} className="flex justify-center items-center relative">
                                        <span className='absolute top-1'>{item[0]}</span>
                                        <img className="w-48 h-48 object-cover rounded-3xl" src='https://via.placeholder.com/150' alt="Example" />
                                    </div>
                                </Link>

                            ))}
                        </div>
                    </div>
                    <div className='bg-light-primary w-full text-black rounded-2xl p-4'>
                        <span><FontAwesomeIcon icon={faTag} className="mx-2" />new_product_schema_</span>
                        <div className='mt-8'>
                            {_.map(fields, (item) => (
                                <div className='flex flex-col'>
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