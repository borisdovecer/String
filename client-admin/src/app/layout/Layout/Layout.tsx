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
            <div className='w-full custom-scrollbar overflow-y-scroll'>
                <div className='h-screen px-4 py-12'>
                    <div className=''>
                        <AppRoutes />
                    </div>
                    {/*<div className='w-screen absolute top-1/2 left-0 h-2 bg-dark-primary'>...</div>*/}
                </div>
            </div>
        </div>
    )
}

export default Layout;