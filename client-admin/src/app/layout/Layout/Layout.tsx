import { RootState } from "@app/store";
import { Header, Sidebar } from "@app/layout";
import { FC, JSX, useEffect, useState } from "react";
import { useAppSelector } from "@app/store/hooks.ts";
import { useEthers, Web3Ethers } from "@usedapp/core";
import AppRoutes from "@app/layout/Routes/AppRoutes.tsx";

const Layout: FC = (): JSX.Element => {
    const theme: boolean = useAppSelector((state: RootState) => state.config.theme);
    const { account }: Web3Ethers = useEthers();
    const [openSidebar, setOpenSidebar] = useState<boolean>(false);
    const [delayed, setDelayed] = useState<boolean>(false);

    useEffect((): void => {
        setTimeout((): void => {
            setDelayed(openSidebar)
        }, 420)
    }, [openSidebar])

    return (
        <div className={`${theme ? 'bg-light-secondary' : 'bg-dark-secondary'} flex`}>
            <Header />
            {account &&
                <div className={`transition-all z-20 duration-500 ease-in-out ${openSidebar ? 'w-64' : 'w-16'}`}>
                    <Sidebar openSidebar={openSidebar} setOpenSidebar={setOpenSidebar} />
                </div>
            }
            <div className='w-full relative custom-scrollbar overflow-y-scroll'>
                <div className='w-full px-4 absolute z-20 my-12'>
                    <AppRoutes />
                </div>
                <div className='flex flex-row'>
                    <div className='h-screen w-11/12 z-10 fixed'>
                        {account && <div className={`${theme ? 'bg-dark-primary' : 'bg-light-primary'} w-1/2 absolute top-1/2 -left-20 h-1.5`}/>}
                    </div>
                    <div className='h-screen w-full z-10 text-center flex items-center justify-center'>
                        {account && <h1 className={`text-7xl font-bold mr-20 fixed ${delayed ? 'color-change-5x opacity-80 ease-out duration-1000' : ''} rounded-full px-4`}>s</h1>}
                    </div>
                    <div className='h-screen w-11/12 right-0 z-0 fixed'>
                        {account && <div className={`${theme ? 'bg-dark-primary' : 'bg-light-primary'} w-1/2 absolute top-1/2 right-1 h-1.5`} />}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Layout;