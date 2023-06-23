import {IItem} from "@app/layout/Sidebar/Items.tsx";
import {
    faCheckCircle,
    faCoins,
    faExchangeAlt,
    faHandHoldingUsd,
    faLockOpen, faStar,
    faUserCheck
} from "@fortawesome/free-solid-svg-icons";

export { default as Home } from './Home.tsx';
export { default as ConnectWallet } from './ConnectWallet.tsx';
export { default as Welcome } from './Welcome.tsx';

export const topLevelFields: IItem[] = [
    { id: 'authorize', link: '/accounts', text: 'Authorize', icon: faUserCheck, requiredBalance: 10 },
    { id: 'transfer', link: '/transfer', text: 'transfer', icon: faExchangeAlt, requiredBalance: 1000 },
    { id: 'products', link: '/products', text: 'Mint!', icon: faCoins, requiredBalance: 2000 },
    { id: 'statistic', link: '/dashboard', text: 'Statistic', icon: faCheckCircle, requiredBalance: 100 },
]

export const bottomLevelFields: IItem[] = [
    { id: 'swap', link: '/token', text: 'Swap', icon: faExchangeAlt, requiredBalance: 0 },
    { id: 'stake', link: '/token', text: 'Stake', icon: faHandHoldingUsd, requiredBalance: 0 },
    { id: 'unlock', link: '/', text: 'Unlock!', icon: faLockOpen, requiredBalance: 0 },
    { id: 'premium', link: '/settings', text: 'Premium', icon: faStar, requiredBalance: 0 },
]