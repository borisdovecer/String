import { IEmployee } from "@app/pages/Transfer";

export { default as EmployeeTable } from './EmployeeTable.tsx';

export interface IProps {
    employees: IEmployee[]
    handleAddressClick: (wallet:string) => void
}