import React, { Suspense } from 'react'
import { useContractReads } from 'wagmi'
import groupAbi from "../../../../ethereum/build/Group.json";
import { formatEther } from 'viem';

function DropDown(props) {

    const getApprovers = useContractReads({
        contracts: props?.approvers?.map((app)=>({
            address: props?.address,
            abi: groupAbi.abi,
            functionName: "getApproverAmount",
            args: [props?.index,app],
        })),
        watch: true,
    });
    const setApprovers = ()=>{
        const set = props?.approvers?.map((app,index)=>(
            <div key={index} className='flex flex-row justify-between py-2'>
                <div className='break-all basis-1/4 text-center'>
                    <p>{app}</p>
                </div>
                <div className='basis-1/4 text-center'>
                    <p>{formatEther(parseFloat(getApprovers?.data?.[index]?.result))} USDT</p>
                </div>
                <div className='basis-1/4 text-center'>
                    <p>{((parseFloat(formatEther(parseFloat(getApprovers?.data?.[index]?.result)))/parseFloat(props?.target))*100).toFixed()}%</p>
                </div>
            </div>
        ));
        return set;
    }
     

    //console.log(setApprovers);

  return (
    <Suspense>
    {
        setApprovers()
    }
    </Suspense>
  )
}

export default DropDown