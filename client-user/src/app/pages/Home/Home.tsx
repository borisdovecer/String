import { Link } from "react-router-dom";
import { Swiper } from "@app/components";
import {useEthers} from "@usedapp/core";

const Home = () => {
    const { activateBrowserWallet, account }:any = useEthers();

    const connectWallet = () => {
        activateBrowserWallet();
    };

    return (
        <div
            className='custom-scrollbar overflow-y-scroll w-full bg-white text-2xl text-center pt-10 overflow-auto'
            style={{
                scrollSnapType: 'y mandatory',  // force snap for every section in y-axis
                height: '100vh',  // restrict the height to viewport height
                overflowY: 'scroll'  // enable vertical scrolling
            }}
        >
            <div className='relative h-screen flex flex-col justify-between items-center' style={{ scrollSnapAlign: 'start' }}>
                <span></span>
                <div>
                    <p className='text-9xl mx-24'>S</p>
                    <p className='text-2xl'>Made on ETH</p>
                </div>
                <div className='h-1/5 border-r-4 border-black'></div>
            </div>
            <div className='relative h-screen ' style={{scrollSnapAlign: 'start'}}>
                <Swiper />
            </div>
            <div className='relative h-screen flex flex-col justify-between items-center' style={{scrollSnapAlign: 'start'}}>
                <div className='h-1/5 border-r-4 border-black'></div>
                <div className='flex flex-col'>
                    {!account ?
                        <>
                            <button className='text-5xl mb-16' onClick={connectWallet}>_Connect wallet</button>
                        </>
                        :
                        <>
                            <p>_Your wallet address:</p>
                            <p className='font-bold'>{account}</p>
                            <Link to='/products'>
                                <button className='mt-16'>_Check your NFT products</button>
                            </Link>

                        </>
                    }
                    <Link to='/support'>
                        <button className='text-lg mt-10'>_Get all support you need here</button>
                    </Link>
                </div>
                <span></span>
            </div>
        </div>
    )
}

export default Home;