import {
    faHome,
    faTachometerAlt,
    faBoxOpen,
    faCog,
    faArrowAltCircleRight,
    faBars,
    faUsers
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {Link, useLocation} from "react-router-dom";
import _ from "lodash";
import {useSelector} from "react-redux";
import {useState} from "react";

interface IItem {
    id: string,
    text: string,
    link: string,
    icon: any
};

const items: IItem[] = [
    { id: "home", text: "Home", link: "/", icon: faHome },
    { id: "accounts", text: "Accounts", link: "/accounts", icon: faUsers },
    { id: "dashboard", text: "Dashboard", link: "/dashboard", icon: faTachometerAlt },
    { id: "products", text: "Products", link: "/products", icon: faBoxOpen },
    { id: "transfer", text: "Transfer", link: "/transfer", icon: faArrowAltCircleRight },
    { id: "settings", text: "Settings", link: "/settings", icon: faCog },
];

const Sidebar = ({openSidebar, setOpenSidebar}:any) => {
    const theme = useSelector((state:any) => state.config.theme);
    const location = useLocation()
    const [activeItem, setActiveItem] = useState<string>(_.split(location.pathname, '/')[1]);

    const handleItemClick = (itemId: string) => {
        setActiveItem(itemId);
    };

    return (
        <div className={`${!theme ? 'border-dark-primary text-light-primary' : 'bg-dark-secondary'} w-full z-10 h-screen pt-4 px-2 border-r`}>
            <div className='flex justify-left text-light-primary mt-12 ml-3 text-xl'>
                <FontAwesomeIcon icon={faBars} onClick={() => setOpenSidebar(!openSidebar)} />
            </div>
            <ul className='space-y-6 pt-6 text-left'>
                {_.map(items, (item: IItem, index: number) => (
                    <li key={index} onClick={() => handleItemClick(item.id)}>
                        <Link to={item.link}  className={`text-xl text-light-primary pl-2 hover:border-l-2 ${activeItem === item.id ? 'border-l-2 font-extrabold' : ''}`}>
                            <FontAwesomeIcon icon={item.icon} className="mr-4" />
                            {openSidebar && <span>{item.text}</span>}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Sidebar;