import { Link } from "react-router-dom";

const Support = () => {
    return (
        <div className='my-24 w-full text-center'>
            <p className='text-2xl text-gray-800 font-bold'>Support</p>
            <div className='mt-6 text-left mx-auto w-2/4 text-gray-600'>
                <p className='mb-4'>You must have a wallet to use the application.</p>
                <ul className='list-disc ml-5 mb-4'>
                    <li>Please install Metamask and switch to Polygon mainnet.</li>
                    <li>
                        <a href='#' className='text-indigo-600 underline'>Tutorial on Youtube</a>
                    </li>
                </ul>
                <p className='mb-4'>You must have a Polygon ID to use the application.</p>
                <ul className='list-disc ml-5 mb-4'>
                    <li>Please download the Polygon ID app for Android or iOS.</li>
                    <li>
                        <div className='flex space-x-3'>
                            {/*<a href='android_link'><img src='android_icon_link' alt='Android Icon' className='h-6 w-6' /></a>*/}
                            {/*<a href='ios_link'><img src='ios_icon_link' alt='iOS Icon' className='h-6 w-6' /></a>*/}
                        </div>
                    </li>
                </ul>
                <p>You need to have credentials to use the application.</p>
            </div>
            <div className='mt-10'>
                <Link className='text-indigo-600 hover:underline' to='/'>Get back</Link>
            </div>
        </div>

    )
}

export default Support;