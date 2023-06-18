import {ComponentWrapper} from "@app/components";
import {faHome, faUserCheck, faExchangeAlt, faCoins, faCheckCircle} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Link} from "react-router-dom";

const Welcome = () => {
    return (
        <div className='my-8 w-full'>
            <ComponentWrapper title='Home' icon={faHome}>
                <div className='bg-light-primary text-dark-primary rounded-3xl p-8 text-left text-5xl h-[300px]'>
                    <h1 className='underline'>One platform</h1>
                    <h1>for managing all <span className='underline'>your products</span>.</h1>
                </div>
                <div className='flex flex-row space-x-4 text-left'>
                    <div className='bg-light-primary text-dark-primary rounded-3xl mt-8 w-2/3 p-8 text-xl'>
                        <h1 className='text-2xl font-bold mb-12'>Welcome to admin panel</h1>
                        <div className='flex justify-between space-x-4'>
                            <Link to='/accounts'>
                                <div className='text-center'>
                                    <FontAwesomeIcon icon={faUserCheck} className="text-5xl p-2 border-2 border-black rounded-xl" />
                                    <p className='mt-2'>Authorize</p>
                                </div>
                            </Link>
                            <Link to='/transfer'>
                                <div className='text-center'>
                                    <FontAwesomeIcon icon={faExchangeAlt} className="text-5xl p-2 border-2 border-black rounded-xl" />
                                    <p className='mt-2'>Transfer</p>
                                </div>
                            </Link>
                            <Link to='/products'>
                                <div className='text-center'>
                                    <FontAwesomeIcon icon={faCoins} className="text-5xl p-2 border-2 border-black rounded-xl" />
                                    <p className='mt-2'>Mint</p>
                                </div>
                            </Link>
                            <Link to='/dashboard'>
                                <div className='text-center'>
                                    <FontAwesomeIcon icon={faCheckCircle} className="text-5xl p-2 border-2 border-black rounded-xl" />
                                    <p className='mt-2'>Validate</p>
                                </div>
                            </Link>
                        </div>
                    </div>
                    <div className='bg-light-primary text-dark-primary rounded-3xl mt-8 w-1/3 p-8 text-xl'>
                        <h1 className='text-2xl font-bold mb-4'>TBD</h1>
                        <p className='text-xl font-bold'>...</p>
                    </div>
                </div>



            </ComponentWrapper>
        </div>
    )
}

export default Welcome;