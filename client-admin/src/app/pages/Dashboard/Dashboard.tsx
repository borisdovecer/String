import _ from "lodash";
import { useEffect, useState } from "react";
import { getEtherscanData } from "@app/api";
import { ComponentWrapper, Table } from "@app/components";
import { faTachometerAlt } from "@fortawesome/free-solid-svg-icons";

const Dashboard = () => {
    const [data, setData] = useState<any>(null)

    useEffect(() => {
        getEtherscanData().then((res) => {
            setData(_.orderBy(res, 'timeStamp', 'desc'))
        })
    },[])

    return (
        <div className='my-8 w-full'>
            <ComponentWrapper title='Dashboard' icon={faTachometerAlt}>
                {data && <Table data={data} />}
            </ComponentWrapper>
        </div>
    )
}

export default Dashboard;