
import dynamic from 'next/dynamic';
import React from 'react'
import { PuffLoader } from 'react-spinners';

const DynamicComponentWithLoading = dynamic(
    () => import('@/screens/SelectPlan/SelectPlan'),
    { loading: () => <div className='h-screen w-full flex justify-center items-center'> <PuffLoader color="#36d7b7" className='w-[280px] h-[280px]' size={80} /> </div>}
);

const page = () => {
    return (
        <React.Fragment>
            <DynamicComponentWithLoading />
        </React.Fragment>
    )
}

export default page