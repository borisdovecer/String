import { useEthers } from "@usedapp/core";
import PolygonIDVerifier from "@app/services/PolygonIDVerifier.tsx";
import { setProvedAccessBirthday } from "@app/config/configReducer.ts";
import ConnectWallet from "@app/pages/Home/ConnectWallet.tsx";
import Welcome from "@app/pages/Home/Welcome.tsx";
import { Link } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "@app/store/hooks.ts";
import { useState } from "react";

const Home = () => {
    const provedAccessBirthday: boolean = useAppSelector((state) => state.config.provedAccessBirthday);
    const dispatch = useAppDispatch();
    const [showQR, setShowQR] = useState(false)

    const { account } = useEthers();

    const verify = () => {
        dispatch(setProvedAccessBirthday())
    }

    return (
        <div className='my-8 text-center'>
            {!account ?
                <>
                    <div className='flex flex-row justify-between w-1/2 mx-auto space-x-16'>
                        <div className='w-1/2 '>
                            <div className='py-6 text-xl'>
                                <h1 className='text-3xl text-center'>
                                    string
                                </h1>
                                <div className='pt-12 flex flex-col space-y-8'>
                                    <Link to='/support'>
                                        <button className='border-2 border-black w-1/2 rounded-3xl'>
                                            support
                                        </button>
                                    </Link>
                                    {provedAccessBirthday &&
                                        <Link to='/register'>
                                            <button className='border-2 border-black w-1/2 rounded-3xl'>
                                                register company
                                            </button>
                                        </Link>
                                    }
                                </div>
                            </div>
                        </div>
                        <div className='w-1/2'>
                            {!provedAccessBirthday ?
                                <>
                                    {showQR ?
                                        <PolygonIDVerifier
                                            serverURL='https://vc-birthday-server.onrender.com'
                                            credentialType="KYCAgeCredential"
                                            issuerLink={
                                                "https://oceans404.notion.site/How-to-get-a-Verifiable-Credential-f3d34e7c98ec4147b6b2fae79066c4f6?pvs=4"
                                            }
                                            onVerificationResult={() => verify()}
                                        />
                                        :
                                        <div className='py-6 text-xl' onClick={() => setShowQR(true)} >
                                            <h1 className='text-3xl text-center'>
                                                unlock your product story
                                            </h1>
                                            <div className='pt-12'>
                                                <button className='border-2 border-black w-full rounded-3xl'>
                                                    verify with polygon id
                                                </button>
                                            </div>
                                        </div>
                                    }
                                </>
                                :
                                <ConnectWallet />
                            }
                        </div>
                    </div>

                    {/* dev mode only */}
                    <div className='fixed bottom-0'>
                        <p>**************************</p>
                        <p>****** developer mode ******</p>
                        <ConnectWallet />
                        <p>**************************</p>
                        <p>**************************</p>
                    </div>
                    {/* Will be deleted */}
                </>
                :
                <Welcome />
            }
        </div>
    )
}

export default Home;