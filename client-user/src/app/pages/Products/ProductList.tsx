import {Link} from "react-router-dom";

const ProductList = () => {
    return (
        <div className='my-8 w-full text-center'>
            <p>Product list</p>
            <div><Link to='/'>get back </Link></div>
        </div>
    )
}

export default ProductList;