import _ from "lodash";

const EmployeeTable = ({employees, handleAddressClick}: any) => {
    return (
        <div className="overflow-x-auto custom-scrollbar mt-6 rounded-3xl text-left">
            <table className="w-full">
                <thead>
                <tr className={`bg-light-secondary text-dark-primary rounded-2xl px-2 md:px-4 py-2 font-bold cursor-pointer`}>
                    <th className='px-6'>Wallet</th>
                    <th>Role</th>
                </tr>
                </thead>
                <tbody className='overflow-y-auto'>
                {_.map(employees, (employee:any) => (
                    <tr key={employee.wallet} className={`bg-light-primary text-dark-secondary px-2 md:px-4 py-2`}>
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