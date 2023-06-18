import _ from "lodash";
import { useSelector } from "react-redux";
import { RootState } from "@app/store/store.ts";

const EmployeeTable = ({employees, handleAddressClick}: any) => {
    const theme = useSelector((state: RootState) => state.config.theme);

    return (
        <div className="overflow-x-auto custom-scrollbar mt-6 rounded-3xl text-left">
            <table className="w-full">
                <thead>
                <tr className={`${!theme ? 'bg-dark-secondary text-light-primary' : 'bg-light-secondary text-dark-primary'} rounded-2xl px-2 md:px-4 py-2 font-bold cursor-pointer`}>
                    <th className='px-6'>Wallet</th>
                    <th>Role</th>
                </tr>
                </thead>
                <tbody className='overflow-y-auto'>
                {_.map(employees, (employee:any) => (
                    <tr key={employee.wallet} className={`${theme ? "bg-light-primary text-dark-secondary" : "bg-dark-tertiary text-light-primary"} px-2 md:px-4 py-2`}>
                        <td onClick={() => handleAddressClick(employee.wallet)} className='cursor-pointer px-6 py-2'>{employee.wallet}</td>
                        <td>{employee.role}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default EmployeeTable;