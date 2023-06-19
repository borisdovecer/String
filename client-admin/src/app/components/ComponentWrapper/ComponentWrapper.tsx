import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faFilter, faEllipsisV } from '@fortawesome/free-solid-svg-icons'
import { useAppSelector } from "@app/store/hooks.ts";

const ComponentWrapper = ({children, title, icon}: any) => {
    const theme = useAppSelector((state:any) => state.config.theme);

    return (
        <div className={`${theme ? 'bg-dark-primary text-light-primary shadow-dark-tertiary shadow-xl' : 'bg-light-tertiary text-dark-primary shadow-dark-primary shadow-xl'} p-2 pb-10 rounded-3xl`}>
            <div className='flex flex-row mt-4 justify-between'>
                <div className='flex flex-row'>
                    <FontAwesomeIcon icon={icon} className="ml-4 mt-1" />
                    <p className={`pl-2 font-semibold`}>{title}</p>
                </div>
                <div className='mr-4'>
                    <FontAwesomeIcon icon={faSearch} className="mx-2" />
                    <FontAwesomeIcon icon={faFilter} className="mx-2" />
                    <FontAwesomeIcon icon={faEllipsisV} className="mx-2" />
                </div>
            </div>
            <div className={`p-4`}>
                {children}
            </div>
        </div>
    )
}

export default ComponentWrapper