import React, { useState } from 'react'
import FriendRequestList from '../(components-address)/FriendRequestList'
import groupAbi from "../../../../ethereum/build/Group.json"
import { useAccount, useContractRead, useContractReads, useContractWrite, useWaitForTransaction } from 'wagmi'
import LoadingRound from "../(components-address)/LoadingRound"
import Model from '../(components-address)/Model'
import swal from 'sweetalert'
import Swal from 'sweetalert2'

function FriendsList(props) {

    const {address} = useAccount();
    const addressMy = address;
    const makeAdmin = useContractWrite({
        address: props.address,
        abi: groupAbi.abi,
        functionName: 'appointAdmin',
      })

      const verifyAdmin = useContractRead({
        address: props.address,
        abi: groupAbi.abi,
        functionName: 'admin',
        args: [address],
        watch: true,
        suspense: true,
      })
      const waitAdmin = useWaitForTransaction({
        hash: makeAdmin?.data?.hash,
      })

      const removeAdmin = useContractWrite({
        address: props.address,
        abi: groupAbi.abi,
        functionName: 'removeAdmin',
        onSettled(data,error){
            if(error){
                Swal.fire({
                    title: "Failed to remove admin",
                    text: "You cannot remove owner as admin",
                    icon: "error"
                })
            }
        }
      })
      
      const waitRemoveAdmin = useWaitForTransaction({
        hash: removeAdmin?.data?.hash,
        onSettled(data,error){
            if(data){
                Swal.fire({
                    title: "Success",
                    text: "Admin removed successfully!",
                    icon: "success"
                })
            }
            if(error){
                Swal.fire({
                    title: "Failed to remove admin",
                    text: "There was an error in remov",
                    icon: "error"
                })
            }
        }
      })

      const checkAdmin = useContractReads({
        contracts: props?.currentFriends?.map((address,index)=>(
            {address: props.address,
            abi: groupAbi.abi,
            functionName: 'admin',
            args: [address.name],}
        )),
        watch: true,
      })

      const admin = props?.currentFriends?.map((address,index)=>(
        checkAdmin?.data?.[index]?.result ? address.name===addressMy? {name: address.name, status: "Admin", admin: true}: {name: address.name, status: "Admin", admin: true} : address.name===addressMy? {name: address.name+" (you)", status: "Member", admin: false} : {name: address.name, status: "Member", admin: false}
      ));


    const tableItems = 
        admin
    
  return (
    <div className="max-w-screen-xl mx-auto px-4 md:px-8">
    <div className="items-start justify-between md:flex">
        <div className="max-w-lg">
            <h3 className="text-gray-800 text-xl font-bold sm:text-2xl">
                Group Members
            </h3>
            <p className="text-gray-600 mt-2">
                All the members of the groups will appear here.
            </p>
        </div>
        <div className="mt-3 md:mt-0">
            {verifyAdmin?.data ?<FriendRequestList frCount={props.frCount} address={props.address}></FriendRequestList>:""}
        </div>
    </div>
    <div className="mt-12 relative" style={{height:"500px",overflow:"auto",}}>
        <table className="w-full table-auto text-sm text-left">
            <thead className="text-gray-600 font-medium border-b">
                <tr className=''>
                    <th className="py-3 pr-6">Address</th>
                    <th className="py-3 pr-6 text-center">Role</th>
                    <th className="py-3 pr-6 text-right">Action</th>
                </tr>
            </thead>
            <tbody className="text-gray-600 divide-y" >
                {
                    tableItems.map((item, idx) => (
                        <tr key={idx}>
                            <td className="pr-6 py-4 whitespace-nowrap">{item.name===addressMy?item.name+" (you)":item.name}</td>
                            <td className="pr-6 py-4 text-center whitespace-nowrap">
                                <span className={`px-3 py-2 rounded-full font-semibold text-xs ${item.status == "Admin" ? "text-green-600 bg-green-50" : "text-blue-600 bg-blue-50"}`}>
                                    {item.status}
                                </span>
                            </td>
                            <td className="text-right whitespace-nowrap">
                            {verifyAdmin?.data ? (item.admin? (removeAdmin.isLoading||waitRemoveAdmin.isLoading||makeAdmin.isLoading||waitAdmin.isLoading)? 
                            <div className='flex justify-center'>
                                <LoadingRound></LoadingRound>
                            </div>
                            :<div>
                                    
                                <a className='px-2'>
                                    <Model cN="py-1.5 px-3 bg-white text-gray-900 border-gray-900 hover:text-gray-500 duration-150 hover:bg-gray-50 border rounded-lg" title={`Are you sure to remove ${item.name} as admin`}
                                        action={()=>{
                                                removeAdmin.write({
                                                args: [item.name]
                                            });
                                        }}
                                    >Remove Admin</Model>
                                </a>
                                
                                <button className="py-1.5 bg-red-500 text-white px-3 hover:text-gray-500 duration-150 hover:bg-gray-50 border rounded-lg" onClick={()=>{
                                    
                                }}>
                                    Remove
                                </button>
                                </div>: (makeAdmin.isLoading||waitAdmin.isLoading||removeAdmin.isLoading||waitRemoveAdmin.isLoading) ? <div className='flex justify-center'>
                                                <LoadingRound></LoadingRound>
                                            </div> :
                                <div>
                                <button className="py-1.5 px-3 bg-green-400 text-white hover:text-gray-500 duration-150 hover:bg-gray-50 border rounded-lg" onClick={()=>{
                                    makeAdmin.write({
                                        args: [item.name],
                                    })
                                }}>
                                    Make Admin
                                </button>
                                
                                <a className='px-2'></a>
                                
                                <button className="py-1.5 bg-red-500 text-white px-3 hover:text-gray-500 duration-150 hover:bg-gray-50 border rounded-lg" onClick={()=>{
                                    
                                }}>
                                    Remove
                                </button>
                                </div>):""}
                                
                                
                            </td>
                        </tr>
                        
                    ))
                }
            </tbody>
        </table>
    </div>
</div>
  )
}

export default FriendsList