import React from 'react'
import SendFRequest from './SendFRequest';
import EditGroup from "./EditGroup";

function ProfileCard(props) {
  return (
    <div className='flex'>
            <div className='grid grid-cols-2 gap-5 content-center pt-5'>
                <div className='pl-10 md:pl-20 flex items-center'>
                    <div className='profile-pic'>
                    <img className="shadow-lg" src={props?.details?.[4]} alt="https://cdn.pixabay.com/photo/2017/11/10/05/46/group-2935521_1280.png"/>
                    </div>
                </div>
                <div>
                <div className="flex flex-col">
                    <div>
                        <div className="flex flex-col md:flex-row items-center">
                            <div>
                                <h1 className="text-xl py-1 font-semibold text-gray-700 capitalize dark:text-white">{props?.details?.[2]}</h1>
                            </div>
                            <div className='pl-5'>
                            <p className="break-all text-justify text-sm text-black dark:text-gray-400">{`(${props?.details?.[0]})`}</p>
                            </div>
                    </div>
                    <div className='pt-5'>
                    <div className="flex flex-row ...">
                        <div className=''><SendFRequest address={props.address} classN="disabled text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-xs px-5 py-1.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"></SendFRequest></div>
                        <div className='pl-8'><EditGroup profilePic={props?.details?.[4]} groupName={props?.details?.[2]} groupDesc={props?.details?.[3]} groupAdd={props.address} det={props?.det}/>
                            </div></div>
                        <div></div>
                     </div>
                        
                    </div>
                    <div className='pt-5'>
                    <div className="flex flex-row ...">
                        <div className=''><p className=" text-sm text-black font-semibold dark:text-gray-400">{parseInt(props?.details?.[7])} Requests</p></div>
                        <div className='pl-8'><p className=" text-sm text-black font-semibold dark:text-gray-400">{parseInt(props?.details?.[5])} Friends</p></div>
                        <div></div>
                     </div>
                        
                    </div>
                    <div className='py-4'>
                        <p className="text-justify text-gray-500 break-words dark:text-gray-400">{props.address}</p>
                    </div>
                    <div>
                        <p className="text-sm text-black dark:text-gray-400">{props?.details?.[3]}</p>
                    </div>
                </div>
                    
                    
                </div>
            </div>
        
    </div>
  )
}

export default ProfileCard;