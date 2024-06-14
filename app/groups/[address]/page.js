
import React, { Suspense} from "react";
import ProfileCard from "./(components-address)/ProfileCard";
import RequestList from "./(components-address)/RequestList";
import { useAccount, useContractRead, useContractReads } from "wagmi";
import groupAbi from "../../../ethereum/build/Group.json";
import SendFRequest from "./(components-address)/SendFRequest";
import TabList from "./(components-body)/TabList";

export async function generateStaticParams(){
    
}

export default function Page({params}){



    const { address } = useAccount() ; 

    const getGroupDetails = useContractRead({
        address: params.address,
        abi: groupAbi.abi,
        functionName: 'getDetails',
        watch: true,
      })

    const checkFriend = useContractRead({
        address: params.address,
        abi: groupAbi.abi,
        functionName: 'friends',
        args:[address],
        watch: true,
      })
    // const friendsList = getGroupDetails?.data?.[1];
    
    const verifyFriend = useContractReads({
        contracts: getGroupDetails?.data?.[1]?.map((address)=>({
            address: params.address,
            abi: groupAbi.abi,
            functionName: 'friends',
            args:[address],
        })),
        watch: true,
      })

      const currentFriends = getGroupDetails?.data?.[1]?.map((address,index)=>(
            verifyFriend?.data?.[index]?.result ?{name: address, status: "Active"}:""
      ));
      //console.log(currentFriends);
    //   console.log(getGroupDetails?.data?.[1]);
    //   console.log(verifyFriend?.data);

    //   console.log(getGroupDetails?.data);

    return(
        <Suspense>
            
           {isClient?
           <div>
           <div className="container mx-auto flex items-center justify-center">
                <ProfileCard details={getGroupDetails?.data} det={getGroupDetails} address={params.address}></ProfileCard>
                
                
            </div>
            
            <div className="container mx-auto py-10">
                {checkFriend?.data ?
                <div className="w-full">
                    <TabList rqCount={parseInt(getGroupDetails?.data?.[7])} frCount={parseInt(getGroupDetails?.data?.[6])} address={params.address} currentFriends={currentFriends}/>
                </div>
                :
                    <div>
                        <div className="" style={{zIndex:1, position:"absolute", top:"70%", left:"50%",right:"auto",button:"auto", transform: "translate(-50%, -50%)",marginRight: "-50%"}}>
                            <section className="max-w-md p-4 mx-auto bg-white border border-gray-200 dark:bg-gray-800  dark:border-gray-700 rounded-2xl">

                                <p className="mt-4 text-sm text-gray-600 dark:text-gray-300">You need to be friend of this group to view the content</p>

                                <div className="flex items-center justify-center mt-4 gap-x-4 shrink-0">
                                    <SendFRequest address={params.address} classN=" text-xs bg-blue-500 font-medium rounded-lg hover:bg-gray-700 text-white px-4 py-2.5 focus:outline-none"></SendFRequest>
                                </div>
                            </section>
                        </div>
                        <div className=" blur-lg" style={{zIndex:-1}}>
                            <RequestList></RequestList>
                        </div>
                </div>
                }
                
            </div>
            </div>:<p>Loading</p>}
            
        </Suspense>
    );
}