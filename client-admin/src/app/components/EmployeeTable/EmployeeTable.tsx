import _ from "lodash";
import { FC, JSX } from "react";
import { IEmployee } from "@app/pages/Transfer";
import { IProps } from './';

const EmployeeTable: FC<IProps> = ({employees, handleAddressClick}: IProps): JSX.Element => {
    console.log(employees)
    return (
        <div className="overflow-x-auto custom-scrollbar mt-6 rounded-3xl text-left">
            <table className="w-full">
                <thead>
                <tr className={`bg-light-secondary text-dark-primary rounded-2xl px-2 md:px-4 py-2 font-bold cursor-pointer`}>
                    <th className='px-12'>Wallet</th>
                    <th>Role</th>
                </tr>
                </thead>
                <tbody className='overflow-y-auto'>
                {_.map(employees, (employee:IEmployee) => (
                    <tr key={employee.wallet} className={`bg-light-primary text-dark-secondary py-2`}>
                        <td onClick={() => handleAddressClick(employee.wallet)} className='cursor-pointer px-8 py-2'>{employee.wallet}</td>
                        <td>{employee.role}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default EmployeeTable;