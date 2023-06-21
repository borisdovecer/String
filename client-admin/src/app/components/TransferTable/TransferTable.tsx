import _ from "lodash";

const TransferTable = ({data, handleSelectChange}: any) => {

    return (
        <div className="mt-6 rounded-3xl">
            <div>
                <div className={`bg-light-secondary text-dark-primary rounded-t-2xl px-4 py-2 font-bold flex`}>
                    <div className='w-full'><input type='checkbox' name='select' /></div>
                    <div className='w-full'>Token ID</div>
                    <div className='w-full'>Product Name</div>
                    <div className='w-full'>Owner</div>
                </div>
            </div>
            <div className='overflow-y-auto custom-scrollbar rounded-bl-3xl relative h-[500px]' >
                {_.map(data, (id) => (
                    <div key={id} className={`bg-light-primary text-dark-secondary px-4 py-2 flex`}>
                        <div className='w-full'><input onChange={handleSelectChange} type='checkbox' id={id} /></div>
                        <div className='w-full'>{id}</div>
                        <div className='w-full'>ps4</div>
                        <div className='w-full'>Minter</div>
                    </div>
                ))}
                <div className='fixed bottom-0'>ddfdfdfdfddfdfsd</div>
            </div>
        </div>

    );
};

export default TransferTable;