import {IItem} from "@app/layout/Sidebar/Items.tsx";
import {
    faCheckCircle,
    faCoins,
    faExchangeAlt,
    faHandHoldingUsd,
    faStar,
} from "@fortawesome/free-solid-svg-icons";

export { default as Home } from './Home.tsx';
export { default as ConnectWallet } from './ConnectWallet.tsx';
export { default as Welcome } from './Welcome.tsx';

export const topLevelFields: IItem[] = [
    { id: 'stake', link: '/token', text: 'Stake', icon: faHandHoldingUsd, requiredBalance: 0 },
    { id: 'products', link: '/products', text: 'Mint!', icon: faCoins, requiredBalance: 2000 },
    { id: 'transfer', link: '/transfer', text: 'Transfer', icon: faExchangeAlt, requiredBalance: 1000 },
    { id: 'statistic', link: '/dashboard', text: 'Statistic', icon: faCheckCircle, requiredBalance: 100 },
    { id: 'premium', link: '/settings', text: 'Premium', icon: faStar, requiredBalance: 0 },
]
