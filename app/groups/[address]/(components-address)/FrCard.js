import React, { Suspense } from 'react'
import moment from "moment";
import { useContractWrite, useWaitForTransaction } from 'wagmi';
import groupAbi from "../../../../ethereum/build/Group.json"

function FrCard(props) {

  const acceptRequest = useContractWrite({
    address: props?.address,
    abi: groupAbi.abi,
    functionName: 'acceptRequest',
    args: [props?.index],
  })

  const waitForAccept = useWaitForTransaction({
    hash: acceptRequest?.data?.hash,
    onSuccess(data){
      props?.data?.refetch()
    }
  })

  const rejectRequest = useContractWrite({
    address: props?.address,
    abi: groupAbi.abi,
    functionName: 'rejectRequest',
    args: [props?.index],
  })

  const waitForReject = useWaitForTransaction({
    hash: rejectRequest?.data?.hash,
    onSuccess(data){
      props?.data?.refetch()
    }
    
  })

  return (
    <Suspense>
      {props?.detail?.result[1]?"":<li>
          <div
            className="flex items-center p-3 text-xs text-justify font-normal text-gray-900 rounded-lg bg-gray-50 hover:bg-gray-100 group hover:shadow dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white"
          >
            <div className='flex flex-col'>
                <div className='flex flex-row'>
            <span className="break-all">From:</span>
                <span className="flex-1 ms-3 break-all">{props?.detail?.result[0]}</span>
                {waitForAccept.isLoading||waitForReject.isLoading||acceptRequest.isLoading||rejectRequest.isLoading?<div role="status">
        <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/></svg>
        <span class="sr-only">Loading...</span>
        </div>:<div><button className="inline-flex items-center justify-center px-2 py-1 ms-3 text-xs font-medium text-white bg-green-400 rounded dark:bg-gray-700 dark:text-gray-400" onClick={()=>{acceptRequest.write()}}>
                Accept
                </button>
                <button className="inline-flex items-center justify-center px-2 py-1 ms-3 text-xs font-medium text-white bg-red-400 rounded dark:bg-gray-700 dark:text-gray-400" onClick={()=>{rejectRequest.write()}}>
                Reject
                </button>
                </div>}
                
                </div>
                <div className='flex flex-row pt-4'>
                <span className="flex-1 break-all text-gray-500">{(moment.unix(parseInt(props?.detail?.result[3]))._d).toString()}</span>
                </div>
                </div>
          </div>
        </li>}
        
    </Suspense>
  )
}

export default FrCard