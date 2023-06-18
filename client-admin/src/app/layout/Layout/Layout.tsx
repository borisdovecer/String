import { Header, Sidebar } from "@app/layout";
import AppRoutes from "@app/layout/Routes/AppRoutes.tsx";
import {useEthers} from "@usedapp/core";
import {useState} from "react";
import {useSelector} from "react-redux";

const Layout = () => {
    const theme = useSelector((state:any) => state.config.theme);
    const { account }:any = useEthers();
    const [openSidebar, setOpenSidebar] = useState(true);

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