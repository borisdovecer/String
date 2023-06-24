import {
    faArrowAltCircleRight,
    faBoxOpen, faCog,
    faHome,
    faTachometerAlt,
    faUsers,
    IconDefinition
} from "@fortawesome/free-solid-svg-icons";

export interface IItem {
    id: string,
    text: string,
    link: string,
    icon: IconDefinition,
    requiredBalance: number
}

export const items: IItem[] = [
    { id: "home", text: "Home", link: "/", icon: faHome, requiredBalance: 0 },
    { id: "accounts", text: "Accounts", link: "/accounts", icon: faUsers, requiredBalance: 1000 },
    { id: "dashboard", text: "Dashboard", link: "/dashboard", icon: faTachometerAlt, requiredBalance: 100 },
    { id: "products", text: "Products", link: "/products", icon: faBoxOpen, requiredBalance: 2000 },
    { id: "transfer", text: "Transfer", link: "/transfer", icon: faArrowAltCircleRight, requiredBalance: 4000 },
    { id: "settings", text: "Settings", link: "/settings", icon: faCog, requiredBalance: 0 },
];