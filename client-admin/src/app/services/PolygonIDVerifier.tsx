import { useState, useEffect } from "react";
import QRCode from "react-qr-code";
import { io } from "socket.io-client";

const PolygonIDVerifier = ({ serverURL, onVerificationResult }:any) => {
    const [sessionId, setSessionId] = useState<any>("");
    const [qrCodeData, setQrCodeData] = useState<any>(null);
    const [verificationMessage, setVerificationMessage] = useState<any>("");
    const [socketEvents, setSocketEvents] = useState<any>([]);

    const socket = io(serverURL);

    useEffect(() => {
        socket.on("connect", () => {
            setSessionId(socket.id);

            // only watch this session's events
            socket.on(socket.id, (arg:any) => {
                setSocketEvents((prevEvents:any) => [...prevEvents, arg]);
            });
        });
    }, []);

    useEffect(() => {
        if (sessionId) {
            fetchQrCode();
        }
    }, [sessionId]);

    useEffect(() => {
        handleSocketEventSideEffects();
    }, [socketEvents]);

    const getQrCodeApi = (sessionId:any) => serverURL + `/api/get-auth-qr?sessionId=${sessionId}`;

    const fetchQrCode = async () => {
        const response = await fetch(getQrCodeApi(sessionId));
        const data = await response.text();
        setQrCodeData(JSON.parse(data));
    };

    const handleSocketEventSideEffects = () => {
        if (socketEvents.length) {
            const currentSocketEvent:any = socketEvents[socketEvents.length - 1];

            if (currentSocketEvent.fn === "handleVerification") {
                if (currentSocketEvent.status === "IN_PROGRESS") {
                    setVerificationMessage("Verifying proof");
                } else {
                    if (currentSocketEvent.status === "DONE") {
                        setVerificationMessage("✅ Verified proof");
                        setTimeout(() => {
                            onVerificationResult(true);
                        }, 2000);
                        socket.close();
                    } else {
                        setVerificationMessage("❌ Error verifying VC");
                    }
                }
            }
        }
    };

    return (
        <div className="flex flex-col items-center justify-center py-2">
            <div className="max-w-md w-full space-y-8">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        Prove Access Rights with Polygon ID
                    </h2>
                    {verificationMessage}
                </div>
                {sessionId && qrCodeData ?
                    <QRCode value={JSON.stringify(qrCodeData)} />
                    :
                    <div className="flex justify-center items-center space-x-2">
                        <svg className="animate-spin h-10 w-10 mr-3 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.292A9.962 9.962 0 0112 22v-4a5.962 5.962 0 01-6-5.708H6z"></path>
                        </svg>
                        <div>Loading...</div>
                    </div>
                }
            </div>
        </div>
    );
};

export default PolygonIDVerifier;
