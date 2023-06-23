import {useState, useEffect, FC, JSX} from "react";
import QRCode from "react-qr-code";
import { io, Socket } from "socket.io-client";

interface IProps {
    serverURL: string,
    onVerificationResult: any,
    credentialType?: string,
    issuerLink?: string
}

const PolygonIDVerifier: FC<IProps> = ({ serverURL, onVerificationResult }: IProps): JSX.Element => {
    const [sessionId, setSessionId] = useState<string>("");
    const [qrCodeData, setQrCodeData] = useState<any>(null);
    const [verificationMessage, setVerificationMessage] = useState<string>("");
    const [socketEvents, setSocketEvents] = useState<any>([]);

    const socket: Socket = io(serverURL);

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
        const response: Response = await fetch(getQrCodeApi(sessionId));
        const data: string = await response.text();
        setQrCodeData(JSON.parse(data));
    };

    const handleSocketEventSideEffects = (): void => {
        if (socketEvents.length) {
            const currentSocketEvent = socketEvents[socketEvents.length - 1];

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
