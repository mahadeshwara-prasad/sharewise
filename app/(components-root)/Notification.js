import { Button, Dropdown } from 'flowbite-react'
import React from 'react'
import NotificationItems from './NotificationItems'

function Notification() {

    

  return (
    <div className=''>
        <Dropdown className='bg-slate-50' label="" dismissOnClick={false} renderTrigger={() => 
            <span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 hover:text-blue-500">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
                </svg>
            </span>}>
            
            <div className='h-80 w-80 bg-white' style={{overflow: "auto"}}>
                
                <li className='w-full bg-slate-50' style={{position: "fixed"}}>
                    
                        <div className=''>
                            <h3 className='text-md text-gray-900 text-center py-2'>Notifications</h3>
                        </div>
                      
                </li> 
                <div className='pt-9'>
                    <Dropdown.Item><NotificationItems></NotificationItems></Dropdown.Item>
                    <Dropdown.Item><NotificationItems></NotificationItems></Dropdown.Item>
                    <Dropdown.Item><NotificationItems></NotificationItems></Dropdown.Item>
                    <Dropdown.Item><NotificationItems></NotificationItems></Dropdown.Item>
                    <Dropdown.Item><NotificationItems></NotificationItems></Dropdown.Item>
                    <Dropdown.Item><NotificationItems></NotificationItems></Dropdown.Item>
                </div>
                <div className='group fixed bottom-0 right-5 p-2  flex items-end justify-end w-24 h-24'>
                    <div className = "text-white shadow-xl flex items-center justify-center p-3 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 z-50 absolute  ">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 group-hover:rotate-90 transition  transition-all duration-[0.6s]">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    </div>
                </div>
            </div>
        </Dropdown></div>
  )
}

export default Notification