import {Link} from "react-router-dom";
import {useState} from "react";

const FindProduct = () => {
    const [id, setId] = useState();

    const hadnleChange = (e:any) => {
        setId(e.target.value)
    }

    return (
        <>
            <div className='h-1/5 border-r-4 absolute top-0 border-black'></div>
            <div className='w-1/12 border-b-4 absolute left-0 border-black'></div>
            <div className="text-2xl flex flex-col items-center">
                <div className='mb-4'>
                    <h1 className='text-3xl'>_String</h1>
                    <p className='text-sm'>_Unlock your product story</p>
                </div>
                <input type="text" id="id" onChange={hadnleChange} placeholder='_Enter your product ID' className="border rounded px-2 py-1" />
                <Link to={`/products/${id}`} className='w-full'>
                    <button className='mt-4 border-gray-300 border rounded-md w-1/2'>_find</button>
                </Link>
            </div>
            <div className='h-1/5 border-r-4 absolute bottom-0 border-black'></div>
        </>
    )
}

export default FindProduct;