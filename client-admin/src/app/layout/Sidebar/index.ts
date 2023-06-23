import {Dispatch, SetStateAction} from "react";

export { default as Sidebar } from './Sidebar.tsx';

export interface IProps {
    openSidebar: boolean,
    setOpenSidebar: Dispatch<SetStateAction<boolean>>
}