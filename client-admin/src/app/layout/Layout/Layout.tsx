import { useEthers } from "@usedapp/core";
import { useState } from "react";
import { Header, Sidebar } from "@app/layout";
import { useAppSelector } from "@app/store/hooks.ts";
import AppRoutes from "@app/layout/Routes/AppRoutes.tsx";

const Layout = () => {
    const theme = useAppSelector((state:any) => state.config.theme);
    const { account } = useEthers();
    const [openSidebar, setOpenSidebar] = useState(false);

    return (
        <div className='flex'>
            <Header />
            {account &&
                <div className={`${openSidebar ? 'w-1/6' : 'w-16'}`}>
                    <Sidebar openSidebar={openSidebar} setOpenSidebar={setOpenSidebar} />
                </div>
            }
            <div className='w-full custom-scrollbar overflow-y-scroll'>
                <div className={`${theme ? 'bg-light-secondary' : 'bg-dark-secondary'} h-screen px-4 py-12`}>
                    <AppRoutes />
                </div>
            </div>
        </div>
    )
}

export default Layout;