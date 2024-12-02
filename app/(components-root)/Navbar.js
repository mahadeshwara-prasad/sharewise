"use client"
import { ConnectButton } from '@rainbow-me/rainbowkit';
import '@rainbow-me/rainbowkit/styles.css';
import Link from 'next/link';
import Notification from './Notification';
import { useEffect, useState } from 'react';
import { useAccount } from 'wagmi';

export default function Nav(){

    const {address} = useAccount();
    const [verified,setVerified] = useState(false);
    const fetchData = async () => {
        if(address){
            try {
                const response = await fetch("/api?address="+address);
                const result = await response.json();
                setData(result);
                if(result.length>0){
                    setVerified(true);
                }else{
                    setVerified(false);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
    };

    const [data, setData] = useState([]);


    useEffect(() => {
        
        if(verifyUser?.isSuccess){
            putData();
            verifyUser?.reset();
        }
        fetchData();
      }, [verifyUser?.isSuccess,address]);
      //console.log(data);
      
      async function putData(){
        try {
            const response = await fetch(`/api`,{
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                  },
                body: JSON.stringify({ address: address,messageData: verifyUser?.data}),
            });
            const result = await response.json();
            console.log(result);
            fetchData();
          } catch (error) {
            console.error('Error fetching data:', error);
          }
      }
    return(
        <nav className="bg-white border-gray-200 dark:bg-gray-900">
            <div className="container mx-auto flex flex-wrap items-center justify-between mx-auto p-4">
            <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                <svg className = "fill-blue-500" width="70" height="70" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500">
                        <path d="M234.4 115.4c-54 8.9-92.6 48.1-87.5 88.7 1 7.6 3.9 16.9 6.5 20.4 1.2 1.6 1.4 1 2.1-6.1 3.6-39.9 44.3-68.4 97.6-68.4 16 0 36.6 3.9 48.5 9.1l4.6 2.1-4.6 4.7c-2.5 2.6-4.6 5.1-4.6 5.6 0 .9 55.9 1 56.7.1.2-.2-2.2-11.4-5.4-25-3.8-15.9-6.2-24.6-7-24.6-.7 0-1.3.3-1.3.7 0 .5-1.9 3-4.3 5.6l-4.2 4.8-8.5-4c-10.7-5-24.8-9.8-36.5-12.3s-40.4-3.3-52.1-1.4z"/>
                        <path d="M210.5 192.7c-6.8.9-13.5 2.5-13.5 3.3 0 .4 2 2.5 4.4 4.6 2.5 2.2 9.7 8.8 16 14.7l11.4 10.8 11.4-1.7c27.2-4 52.8 1.4 73.9 15.6 6.9 4.7 23.6 21.1 26.6 26 3.3 5.6 4.2 3.3 2.2-6.2-.6-2.9-3-9.4-5.5-14.5-12.2-25.4-43-45.3-80.3-51.8-7.7-1.4-38.2-1.9-46.6-.8zm-53.7 39.8c-.8.9 1.1 11.2 3.2 16.8 11.1 29.7 45.4 52.9 87 58.7 15.2 2.2 52.9.4 55.9-2.5.6-.6-18.6-19.4-27.6-27.1-4.1-3.5-4.2-3.5-9.6-2.5-2.9.5-10.3 1.3-16.3 1.7-34 2.1-62.4-10.3-85-37.3-7.4-8.9-7-8.4-7.6-7.8z"/>
                        <path d="M345.7 275.6c-.4.4-.7 3.2-.7 6.3-.1 26-23.9 52.4-57 63-24.8 8-55.2 8-80.1.1-5.2-1.7-10.4-3.6-11.7-4.3-2.2-1.3-2.2-1.3 2.8-6.2 2.7-2.7 5-5.2 5-5.5 0-.3-13.1-.4-29.1-.2-27 .2-29 .4-28.4 2 .3.9 2.7 10.5 5.2 21.2 6.2 26.9 6 26.1 6.8 26.8.4.4 1.4-.2 2.3-1.3 1-1.2 3.1-3.8 4.9-6l3.2-3.8 9.8 4.5c11.8 5.6 22.6 9.2 35.3 12.1 13.1 2.9 44.2 3.1 57 .3 22.5-4.9 40.3-13.4 56.1-26.9 24.1-20.6 32.9-49.8 22.7-75.7-2.4-6.2-3.1-7.3-4.1-6.4z"/>
                </svg>
                <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">ShareWise</span>
            </a>
            <div className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
                <Link href="">
                    <Notification></Notification>
                </Link>
            </div>
            <button data-collapse-toggle="navbar-default" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
                <span className="sr-only">Open main menu</span>
                <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h15M1 7h15M1 13h15" />
                </svg>
            </button>
            <div className="hidden w-full md:block md:w-auto" id="navbar-default">
                <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                    <li className='pt-3'>
                    <a href="/home" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Home</a>
                    </li>
                    <li className='pt-3'>
                        <a href="#" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent" aria-current="true">My Groups</a>
                    </li>
                    <li className='pt-3'>
                        <a href="#" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">About</a>
                    </li>
                    <li className='pt-3'>
                        <a href="#" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Contact us</a>
                    </li>
                    <li className='hidden pt-3 md:flex'>
                        <Link href="">
                            <Notification></Notification>
                        </Link>
                      
                    </li>
                    <li className='pt-2'>
                        <Link href="/groups/create-group">
                        <button type="button" className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        <svg className="w-4 h-4 me-2 text-white-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.546.5a9.5 9.5 0 1 0 9.5 9.5 9.51 9.51 0 0 0-9.5-9.5ZM13.788 11h-3.242v3.242a1 1 0 1 1-2 0V11H5.304a1 1 0 0 1 0-2h3.242V5.758a1 1 0 0 1 2 0V9h3.242a1 1 0 1 1 0 2Z"/>
                        </svg>
                        New Group
                        </button>
                        </Link>
                    
                    </li>
                    <li className='pt-2'>
                        <ConnectButton></ConnectButton>
                    </li>
                </ul>
            </div>
            </div>
        </nav>
    );
}
