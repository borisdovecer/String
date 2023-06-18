import { useEthers } from "@usedapp/core";
import PolygonIDVerifier from "@app/services/PolygonIDVerifier.tsx";
import { useDispatch, useSelector } from "react-redux";
import { setProvedAccessBirthday } from "@app/config/configReducer.ts";
import ConnectWallet from "@app/pages/Home/ConnectWallet.tsx";
import Welcome from "@app/pages/Home/Welcome.tsx";

const Home = () => {
    const provedAccessBirthday = useSelector((state:any) => state.config.provedAccessBirthday);
    const dispatch = useDispatch();
    const { account } = useEthers();

    const verify = () => {
        dispatch(setProvedAccessBirthday())
    }

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
                            onVerificationResult={() => verify()}
                        />
                        :
                        <ConnectWallet />
                    }
                </div>
                :
                <Welcome />
            }
        </div>
    )
}

export default Home;