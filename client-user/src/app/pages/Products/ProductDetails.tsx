import {Link, useParams} from "react-router-dom";

const ProductDetails = () => {
    const {id} = useParams();

    return (
        <div className='my-8 w-full text-center'>
            <p>Product details of token {id}</p>
            <div><Link to='/'>get back </Link></div>
        </div>
    )
}

export default ProductDetails;