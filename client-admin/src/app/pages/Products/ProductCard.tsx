import axios from "@app/config/axios.ts";
import { useEffect, useState } from "react";

interface IProduct {
    name: string,
    metadata: string
}

interface IProps {
    item: IProduct
}

const ProductCard = ({ item }: IProps) => {
    const [imageUrl, setImageUrl] = useState<string | null>(null);

    useEffect(() => {
        axios.get(`https://ipfs.io/ipfs/${item.metadata}`).then((res) => {
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