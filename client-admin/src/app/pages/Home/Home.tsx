import { useEthers } from "@usedapp/core";
import PolygonIDVerifier from "@app/services/PolygonIDVerifier.tsx";
import {useState} from "react";

const Home = () => {
    const [provedAccessBirthday, setProvedAccessBirthday] = useState(false);
    const { activateBrowserWallet, account }:any = useEthers();

    const connectWallet = () => {
        activateBrowserWallet();
    };

    return (
        <div className='my-8 w-full text-center'>
            {!account ?
                <div>
                    {!provedAccessBirthday ?
                        <PolygonIDVerifier
                            serverURL='https://vc-birthday-server.onrender.com'
                            credentialType={"KYCAgeCredential"}
                            issuerLink={
                                "https://oceans404.notion.site/How-to-get-a-Verifiable-Credential-f3d34e7c98ec4147b6b2fae79066c4f6?pvs=4"
                            }
                            onVerificationResult={setProvedAccessBirthday}
                        />
                        :
                        <div>
                            <p>Please, connect your wallet</p>
                            <button className='mr-4 px-4 border rounded-xl' onClick={connectWallet}>
                                _connect wallet
                            </button>
                        </div>
                    }

                </div>
                :
                <div>
                    <p>Hello, {provedAccessBirthday && account}</p>

                </div>
            }
        </div>
    )
}

export default Home;