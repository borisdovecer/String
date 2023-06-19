import { ComponentWrapper } from "@app/components";
import { faUsers } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { useContractFunction } from "@usedapp/core";
import { useAppSelector } from "@app/store/hooks.ts";

const Settings = () => {
    const contractInstance = useAppSelector((state) => state.contract.instance);
    const [companyName, setCompanyName] = useState<string>('');

    const { send } = useContractFunction(contractInstance, 'addCompany', {});

    useEffect(() => {
        if (contractInstance) {
            contractInstance.getAllCompanies().then((res:string) => console.log(res))
        }
    }, [contractInstance])

    const handleChange = (e:any) => {
        setCompanyName(e.target.value);
    }

    const handleClick = async () => {
        send(companyName).then((res) => console.log(res));
    };

    return (
        <div className='my-8 w-full'>
            <ComponentWrapper title='Settings' icon={faUsers}>
                <div>
                    <div>
                        <label>Add Name of the Company **Only Owner** </label>
                        <input className='text-black' name='name' type='text' onChange={handleChange} />
                    </div>
                    <button onClick={handleClick}>Create</button>
                </div>
            </ComponentWrapper>
        </div>
    )
}

export default Settings;