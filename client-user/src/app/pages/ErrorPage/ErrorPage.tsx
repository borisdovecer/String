import { Link } from "react-router-dom";

const ErrorPage = () => {
    return (
        <div className='w-full text-center'>
            <p className='text-3xl mt-24'>Something went wrong</p>
            <Link to='/'>
                <button className='mt-10'>Get back</button>
            </Link>
        </div>
    )
}

export default ErrorPage;