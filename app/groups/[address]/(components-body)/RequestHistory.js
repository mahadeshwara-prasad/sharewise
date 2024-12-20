import { Flowbite, Progress, Tooltip } from 'flowbite-react'
import React from 'react'
import { useContractReads } from 'wagmi'
import groupAbi from "../../../../ethereum/build/Group.json"
import moment from "moment";
import { formatEther } from 'viem';
import Link from 'next/link';
import Contributors from './Contributors';


function RequestList(props) {

    const n = props?.rqCount;
    const rqLn = [];
    for(let i=0;i<n;i++){
        rqLn.push(i);
    }

    const rq2Ln = [];
    for(let i=0;i<n;i++){
        rq2Ln.push(i);
    }


    const getRequest = useContractReads({
        contracts: rqLn?.map((address)=>({
            address: props?.address,
            abi: groupAbi.abi,
            functionName: 'getRequest1',
            args: [address],
        })),
        watch: true,
      })

     const requestDetails1 = getRequest?.data?.map((data)=>({
        title: data?.result[0],
        desc: data?.result[1],
        creator: data?.result[2],
        date: moment.unix(parseInt(data?.result[3]))._d.toDateString(),
        endDate: moment.unix(parseInt(data?.result[4]))._d.toLocaleString(),
        target: formatEther(data?.result[5]) ,
     })) 

    const getRequest2 = useContractReads({
        contracts: rq2Ln?.map((address)=>({
            address: props?.address,
            abi: groupAbi.abi,
            functionName: 'getRequest2',
            args: [address],
        })),
        watch: true,
      })

      const requestDetails2 = getRequest2?.data?.map((data,index)=>(
        Object.assign({},requestDetails1?.[index],{
            
            minCont: formatEther(data?.result[0]),
            recipient: data?.result[1],
            amtRecived: formatEther(data?.result[2]),
            approvers: data?.result[3],
            approversCount: parseInt(data?.result[4]),
            completed: data?.result[5],
            canceled: data?.result[6],
        })
        
     ))
    //console.log(requestDetails2);
    
    const jobs = requestDetails2;

    const customTheme = {
        progress: {
            label: "mb-1 py-2 flex justify-between font-medium dark:text-white",
            bar: "rounded-full flex justify-center items-center font-medium text-xs leading-none text-white dark:text-cyan-100 space-x-2",
            color: {
                primary: "bg-blue-500 dark:bg-red-500"
            }
        }
      }
      const customThemeAcc = {
        root: {
            base: "divide-y divide-gray-200 border-gray-200 dark:divide-gray-700 dark:border-gray-700",
            flush: {
              off: "rounded-lg border",
              on: "border-b"
            }
        }
        
      }

  return (
    <>

        <section className="mt-12 max-w-screen-xl mx-auto px-4 md:px-8">
                    <div className='flex flex-row'>
                        <div className='basis-1/2'>
                            <h1 className="text-gray-800 text-3xl font-semibold">
                                Requests History
                            </h1>
                        </div>
                        
                    </div>

                    <ul className="mt-12 space-y-6">
                        {
                            jobs?.map((item, idx) => (
                                (item.completed===true)?
                                <li key={idx} className="p-5 bg-gray-50 rounded-md shadow-lg">
                                    
                                <div>
                                    <div className='flex items-center justify-center pb-5'>
                                        <h2 className='text-gray-500 text-lg'>Request completed on: {item.endDate}</h2>
                                    </div>
                                    <div className="justify-between sm:flex">
                                        
                                        <div className="flex-1">
                                            <h3 className="text-xl font-medium">
                                                {item.title} <span className='text-green-600 text-sm'>{`(Minimum Contribution: ${item.minCont})`}</span>
                                            </h3>
                                            <p className="text-gray-500 mt-2 pr-2">
                                                {item.desc}
                                            </p>
                                            <p className="break-all text-red-400 text-sm pt-1 pr-2 hover:text-blue-500">
                                                <span className='break-all text-gray-900'>Payment to: </span><Link href={`https://polygonscan.com/address/${item.recipient}`} target='_blank'>{" "+item.recipient}</Link>
                                            </p>
                                        </div>
                                        <div className="mt-5 space-y-4 text-sm sm:mt-0 sm:space-y-2">
                                            
                                            <Tooltip content="Created on" placement='right'>
                                                <span className="flex items-center text-gray-500">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                                        <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                                                    </svg>
                                                    {item.date}
                                                </span>
                                            </Tooltip>
                                            <Tooltip content="Target Amount" placement='bottom'>
                                                <span className="flex items-center text-gray-500">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                                        <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" />
                                                    </svg>
                                                    {`${item.target} USDT`} 
                                                </span>
                                            </Tooltip>
                                        </div>
                                    </div>
                                    <div className='w-full'>
                                        <div className='py-2'>
                                            <Flowbite theme={{ theme: customTheme }}>
                                                <Progress
                                                    progress={((parseFloat(item.amtRecived)/parseFloat(item.target))*100).toFixed()}
                                                    color="primary"
                                                    progressLabelPosition="inside"
                                                    textLabel={`Total Contribution: ${item.amtRecived}/${item.target} USDT`}
                                                    textLabelPosition="outside"
                                                    size="lg"
                                                    labelProgress
                                                    labelText
                                                />
                                            </Flowbite>
                                        </div>
                                        <div className=''>
                                            <div className='grid grid-cols-2 gap-4 content-center'>
                                                <div className="flex items-end">
                                                    <div className='flex text-sm text-gray-500'>
                                                        <span className='break-all flex items-center text-sm text-gray-500'> {"Created by: "+item.creator}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='py-4'>
                                            <Contributors approvers={item?.approvers} address={props?.address} index={idx} target={item?.target}></Contributors>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                        
                        </li>:""
                                
                            ))
                        }
                    </ul>
                </section>
    </>
  )
}

export default RequestList