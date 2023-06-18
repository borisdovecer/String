import {Link} from "react-router-dom";
import {useState} from "react";

const Register = () => {
    const [companyName, setCompanyName] = useState<string>('');

    const handleChange = (e: any) => {
        setCompanyName(e.targer.value);
    }

    const handleSubmit = () => {
        console.log(companyName);
    }


    return (
        <div className='my-24 w-full text-center'>
            <p className='text-2xl text-gray-800 font-bold'>Register your company</p>
            <div className='flex flex-col items-center justify-center mt-6'>
                <label className='mb-2 text-gray-700' htmlFor='companyName'>
                    Company name
                </label>
                <input type='text' id='companyName'
                       className='px-4 py-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-600'
                       onChange={handleChange}/>
                <button
                    className='mt-6 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500'
                    onClick={handleSubmit}>Submit
                </button>
            </div>
            <div className='mt-10'>
                <Link className='text-indigo-600 hover:underline' to='/'>Get back</Link>
            </div>
        </div>

    )
}

export default Register;