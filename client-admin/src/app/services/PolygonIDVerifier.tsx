import { useState, useEffect } from "react";
import QRCode from "react-qr-code";
import { io } from "socket.io-client";

interface IProps {
    serverURL: string,
    onVerificationResult: any,
    credentialType?: string,
    issuerLink?: string
}

const PolygonIDVerifier = ({ serverURL, onVerificationResult }: IProps) => {
    const [sessionId, setSessionId] = useState<string>("");
    const [qrCodeData, setQrCodeData] = useState<any>(null);
    const [verificationMessage, setVerificationMessage] = useState<string>("");
    const [socketEvents, setSocketEvents] = useState<any>([]);

    const socket = io(serverURL);

    useEffect(() => {
        socket.on("connect", () => {
            setSessionId(socket.id);

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

    const getQrCodeApi = (sessionId: string): string => serverURL + `/api/get-auth-qr?sessionId=${sessionId}`;

    const fetchQrCode = async ():Promise<void> => {
        const response = await fetch(getQrCodeApi(sessionId));
        const data = await response.text();
        setQrCodeData(JSON.parse(data));
    };

    const handleSocketEventSideEffects = (): void => {
        if (socketEvents.length) {
            const currentSocketEvent:any = socketEvents[socketEvents.length - 1];

            if (currentSocketEvent.fn === "handleVerification") {
                if (currentSocketEvent.status === "IN_PROGRESS") {
                    setVerificationMessage("Verifying proof...");
                } else {
                    if (currentSocketEvent.status === "DONE") {
                        setVerificationMessage("Verified proof!");
                        setTimeout(() => {
                            onVerificationResult(true);
                        }, 2000);
                        socket.close();
                    } else {
                        setVerificationMessage("Error verifying VC");
                    }
                }
            }
        }
    };

    return (
        <div>
            {sessionId && qrCodeData ?
                <div className='p-4 bg-light-secondary'>
                    <QRCode value={JSON.stringify(qrCodeData)} size={420} />
                </div>
                :
                <div className="flex justify-center items-center h-[240px]">
                    <div className="animate-spin rounded-full h-20 w-20 border-t-2 border-b-2 border-gray-500"></div>
                </div>
            }
            <div className='text-2xl mt-16 text-blue-400'>{verificationMessage}</div>
        </div>
    );
};

export default PolygonIDVerifier;
