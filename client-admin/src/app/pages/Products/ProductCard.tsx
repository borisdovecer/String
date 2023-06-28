import { AxiosResponse } from "axios";
import axios from "@app/config/axios.ts";
import { FC, JSX, useEffect, useState } from "react";
import { IProduct } from "@app/pages/Products/fields.ts";

interface IProps {
    item: IProduct
}

const ProductCard: FC<IProps> = ({ item }: IProps): JSX.Element => {
    const [imageUrl, setImageUrl] = useState<string | null>(null);


    useEffect((): void => {
        axios.get(`https://ipfs.io/ipfs/QmbjQKkp14PrvDuv5De8y2xz2XhmGZoGbrkUetv2yp91JY`).then((res:AxiosResponse<any>): void => {
            if (res.data){
                setImageUrl(res.data.image);
            }
        })
    }, [item])

    return (
        <div className="flex justify-center items-center relative">
            <span className='absolute top-0 m-2 h-6 text-dark-secondary'>{item.name}</span>
            <img className="w-48 h-48 object-cover rounded-3xl" src={imageUrl ? `https://ipfs.io/ipfs/${imageUrl}` : 'https://via.placeholder.com/150'} alt="Example" />
        </div>
    )
}
export default ProductCard;