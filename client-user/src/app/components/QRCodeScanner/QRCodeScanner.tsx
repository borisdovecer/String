// import React, { useState } from 'react';
// import {QrReader} from 'react-qr-reader';
//
// const Qr: any = QrReader;

const QRCodeScanner = () => {
    // const [scanResult, setScanResult] = useState('');
    //
    // const handleScan = (data: string | null) => {
    //     if (data) {
    //         setScanResult(data);
    //         if (isValidUrl(data)) {
    //             // window.location.href = data;
    //         }
    //     }
    // }
    //
    // const handleError = (err: any) => {
    //     console.error(err);
    // }
    //
    // const isValidUrl = (string: string) => {
    //     try {
    //         new URL(string);
    //     } catch (_) {
    //         return false;
    //     }
    //     return true;
    // }

    return (
        <div>
            {/*<Qr*/}
            {/*    onError={handleError}*/}
            {/*    onScan={handleScan}*/}
            {/*    onResult={() => {}}*/}
            {/*    className="w-80 h-80 border border-gray-300 rounded-2xl"*/}
            {/*/>*/}
            {/*<p>{scanResult}</p>*/}
        </div>
    );
}

export default QRCodeScanner;
