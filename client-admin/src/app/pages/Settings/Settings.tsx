import { ComponentWrapper } from "@app/components";
import { faExchangeAlt, faUsers } from "@fortawesome/free-solid-svg-icons";
import { Falsy, useContractFunction, useToken } from "@usedapp/core";
import { useAppSelector } from "@app/store/hooks.ts";
import { RootState } from "@app/store";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { TokenInfo } from "@usedapp/core/dist/cjs/src/model/TokenInfo";
import { contract } from "@app/config/chainConfig.ts";
import { Contract, ContractReceipt } from "ethers";

const Settings = () => {
    const contractInstance: Contract | null = useAppSelector((state: RootState) => state.contract.coin);
    const stringToken: TokenInfo | Falsy = useToken(contract.coin, {});

    const { send } = useContractFunction(contractInstance, 'approve', {});

    const handleClick = async (): Promise<void> => {
        send(contract.stake, stringToken?.totalSupply).then((res: ContractReceipt | undefined) => console.log(res));
    };

    return (
        <div className='my-8 w-full'>
            <ComponentWrapper title='Settings' icon={faUsers}>
                <div className={`bg-light-primary text-dark-primary w-1/3  mt-6 rounded-3xl `}>
                    <div className="rounded-3xl">
                        <div className={`bg-light-secondary text-dark-primary rounded-3xl px-2 py-2`}>
                            <h2 className="text-xl font-semibold"><FontAwesomeIcon icon={faExchangeAlt} className="mx-2" />Settings</h2>
                        </div>
                        <div className="mt-4">
                            <div className="justify-between px-4 py-1 font-bold text-lg">
                                <div className='mb-4'>
                                    <p className="">Approve **Only Owner**</p>
                                    <button className='w-48 p-4 ml-6 bg-orange-400 rounded-3xl ' onClick={handleClick}>Apporve!</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </ComponentWrapper>
        </div>
    )
}

export default Settings;