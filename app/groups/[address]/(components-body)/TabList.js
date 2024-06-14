import React from 'react'
import * as Tabs from "@radix-ui/react-tabs";
import FriendsList from './FriendsList';
import RequestList from './RequestList';
import RequestHistory from "./RequestHistory";
import { Button } from 'flowbite-react';
import tokenAbi from "../../../../ethereum/build/Token.json"
import { useContractRead } from 'wagmi';
import { formatEther } from 'viem';

function TabList(props) {

  const usdtBalance = useContractRead({
    address: "0x5917EaA193F1E5c77eF955fa6b643772d411437a",
    abi: tokenAbi,
    functionName: "balanceOf",
    args: [props?.address],
    watch: true,
  })

    const tabItems = [
      {
        icon: (
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
          </svg>

        ),
        name: "Friends",

        content: <FriendsList frCount={props?.frCount} address={props?.address} currentFriends={props?.currentFriends}/>
      },
        {
          
          icon: (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 6.878V6a2.25 2.25 0 012.25-2.25h7.5A2.25 2.25 0 0118 6v.878m-12 0c.235-.083.487-.128.75-.128h10.5c.263 0 .515.045.75.128m-12 0A2.25 2.25 0 004.5 9v.878m13.5-3A2.25 2.25 0 0119.5 9v.878m0 0a2.246 2.246 0 00-.75-.128H5.25c-.263 0-.515.045-.75.128m15 0A2.25 2.25 0 0121 12v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6c0-.98.626-1.813 1.5-2.122"
              />
            </svg>
          ),
          name: "Requests",
          content: <RequestList balance={usdtBalance} address={props?.address} rqCount={props?.rqCount}/>
        },
        {
          icon: (
            <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6.429 9.75L2.25 12l4.179 2.25m0-4.5l5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L21.75 12l-4.179 2.25m0 0l4.179 2.25L12 21.75 2.25 16.5l4.179-2.25m11.142 0l-5.571 3-5.571-3"
            />
          </svg>
          ),
          name: "Requests History",
          content: <RequestHistory address={props?.address} rqCount={props?.rqCount}></RequestHistory>
        },
        
      ];
      const bal = formatEther(parseFloat(usdtBalance?.data))



  return (
    <Tabs.Root
      className="w-full"
      defaultValue="Friends"
    >
      <Tabs.List className='w-full max-w-screen-xl mx-auto flex items-center justify-center md:justify-end gap-x-10 overflow-x-auto text-sm'>
      <div className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium text-lg rounded-lg px-5 py-2 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">Group Balance: {bal} USDT</div>
      </Tabs.List>
      <Tabs.List
        className="w-full border-b flex items-center justify-center gap-x-10 overflow-x-auto text-sm"
        aria-label="Manage your account"
      >
        {tabItems?.map((item, idx) => (
          <Tabs.Trigger
            key={idx}
            className="group outline-none py-1.5 border-b-2 border-white text-gray-500 data-[state=active]:border-indigo-600 data-[state=active]:text-indigo-600"
            value={item.name}
          >
            <div className="flex items-center gap-x-2 py-1.5 px-3 rounded-lg duration-150 group-hover:text-indigo-600 group-hover:bg-gray-50 group-active:bg-gray-100 font-medium">
              {item.icon}
              {item.name}
            </div>
          </Tabs.Trigger>
        ))}
      </Tabs.List>
      {tabItems?.map((item, idx) => (
        <Tabs.Content key={idx} className="w-full py-6" value={item.name}>
          {item.content}
        </Tabs.Content>
      ))}
    </Tabs.Root>
  )
}

export default TabList