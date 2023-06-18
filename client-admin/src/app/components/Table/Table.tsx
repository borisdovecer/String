import _ from 'lodash';
import {useSelector} from "react-redux";
import {Link} from "react-router-dom";
import moment from "moment";

const Table = ({ data }:any) => {
    const headers = Object.keys(data[0]);

    const theme = useSelector((state:any) => state.config.theme);

    const cellFormat = (row:any, header: string) => {
        if (header === 'timeStamp') {
            const date: Date = new Date(row[header] * 1000);
            return moment(date).startOf('hour').fromNow()
        }
        if (header === 'blockNumber' && row[header]) {
            return (
                <Link to={`https://sepolia.etherscan.io/block/${row[header]}`} target="_blank">
                    {row[header]}
                </Link>
            );
        }

        if (_.includes(['contractAddress', 'to', 'from', 'blockHash', 'hash'], header)) {
            if (header === 'hash' && row[header]) {
                return (
                    <Link to={`https://sepolia.etherscan.io/tx/${row[header]}`} target="_blank">
                        {row[header].slice(0, 5)}...{row[header].slice(row[header].length - 4)}
                    </Link>
                );
            }

            if (_.includes(['to', 'from', 'contractAddress'], header) && row[header]) {
                return (
                    <Link to={`https://sepolia.etherscan.io/address/${row[header]}`} target="_blank">
                        {row[header].slice(0, 5)}...{row[header].slice(row[header].length - 4)}
                    </Link>
                );
            }
            return `${row[header].slice(0, 5)}...${row[header].slice(row[header].length - 4)}`
        }

        return row[header]
    }

    return (
        <>
            <div className="overflow-x-auto custom-scrollbar mt-6 rounded-3xl">
                <table className="w-full">
                    <thead>
                    <tr className='rounded-2xl'>
                        {headers.map((header) => (
                            <th
                                key={header}
                                className={`${!theme ? 'bg-dark-secondary text-light-primary' : 'bg-light-secondary text-dark-primary'} px-2 md:px-4 py-2 font-bold cursor-pointer`}
                            >
                                {_.startCase(header)}
                            </th>
                        ))}
                    </tr>
                    </thead>
                    <tbody>
                    {data.map((row:any, rowIndex:number) => (
                        <tr
                            key={rowIndex}
                            className={`${theme ? "bg-light-primary text-dark-secondary" : "bg-dark-tertiary text-light-primary"}`}
                        >
                            {headers.map((header) => (
                                <td
                                    key={header}
                                    className="px-2 md:px-4 py-2 text-center"
                                >
                                    {cellFormat(row, header)}
                                </td>
                            ))}

                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default Table;