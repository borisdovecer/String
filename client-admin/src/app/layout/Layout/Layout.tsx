import { useEthers } from "@usedapp/core";
import { useState } from "react";
import { Header, Sidebar } from "@app/layout";
import { useAppSelector } from "@app/store/hooks.ts";
import AppRoutes from "@app/layout/Routes/AppRoutes.tsx";

const Layout = () => {
    const theme = useAppSelector((state:any) => state.config.theme);
    const { account } = useEthers();
    const [openSidebar, setOpenSidebar] = useState<boolean>(false);

    return (
        <div className={`${theme ? 'bg-light-secondary' : 'bg-dark-secondary'} flex`}>
            <Header />
            {account &&
                <div className={`transition-all duration-500 ease-in-out ${openSidebar ? 'w-64' : 'w-16'}`}>
                    <Sidebar openSidebar={openSidebar} setOpenSidebar={setOpenSidebar} />
                </div>
            }
            <div className='w-full relative custom-scrollbar overflow-y-scroll'>
                <div className='w-full px-4 absolute z-20 my-12'>
                    <AppRoutes />
                </div>
                <div className='h-screen absolute ml-2 z-10'>
                    <div className={`${theme ? 'bg-dark-primary' : 'bg-light-primary'} w-screen  absolute top-1/2 -left-20 h-1.5`}>...</div>
                </div>
            </div>
        </div>
    )
}

export default Layout;