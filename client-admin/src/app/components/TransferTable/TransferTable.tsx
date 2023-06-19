import _ from "lodash";
import { RootState } from "@app/store";
import { useAppSelector } from "@app/store/hooks.ts";

const TransferTable = ({data, handleSelectChange}: any) => {
    const theme = useAppSelector((state: RootState) => state.config.theme);

    return (
        <div className="overflow-x-auto custom-scrollbar mt-6 rounded-3xl">
            <table className="w-full">
                <thead>
                    <tr className={`${!theme ? 'bg-dark-secondary text-light-primary' : 'bg-light-secondary text-dark-primary'} rounded-2xl px-2 md:px-4 py-2 font-bold cursor-pointer`}>
                        <th><input type='checkbox' name='select' /></th>
                        <th>Token ID</th>
                        <th>Product Name</th>
                        <th>Owner</th>
                    </tr>
                </thead>
                <tbody className='overflow-y-auto'>
                {_.map(data, (id) => (
                    <tr key={id} className={`${theme ? "bg-light-primary text-dark-secondary" : "bg-dark-tertiary text-light-primary"} px-2 md:px-4 py-2 text-center`}>
                        <td><input onChange={handleSelectChange} type='checkbox' id={id} /></td>
                        <td>{id}</td>
                        <td>ps4</td>
                        <td>Minter</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default TransferTable;