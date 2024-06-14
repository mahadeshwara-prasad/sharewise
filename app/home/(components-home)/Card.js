"use client"
import React from "react";
import Link from "next/link";
import moment from "moment";

import "../../../public/styles/globals.css"
import SendFRequest from "../../groups/[address]/(components-address)/SendFRequest";

export default function Card(props){
    

    return(
        <div className="basis-1/4 px-3 py-5">
            <div className="w-full max-w-sm card-color border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <div className="flex flex-col items-center py-5">
                    <img
                    className="w-24 h-24 mb-3 rounded-full shadow-lg"
                    src={props?.detail?.result[3]}
                    alt="https://sharewise.infura-ipfs.io/ipfs/QmVNytr6bn2kiYzDAN6wYthHRh4nBr5D7GpK8VESnY8gNJ"
                    />
                    
                    <h5 className="mb-1 py-5 text-3xl font-bold text-gray-900 dark:text-white">
                    {props?.detail?.result[2]}
                    </h5>
                    <span className="text-sm text-gray-700 dark:text-gray-400 pb-3">
                    {props?.detail?.result[0]}
                    </span>
                      
                <div className="flex flex-col items-center">
                    <span className="text-sm text-center text-gray-500 dark:text-gray-400 pr-2 pt-4">
                        Created on {(moment.unix(parseInt(props?.detail?.result[4]))._d).toString()}
                    </span>
                    <span className="text-sm text-center text-gray-500 dark:text-gray-400 pr-2 pt-4">
                        By
                    </span>
                    <span className="text-sm text-center text-blue-500 dark:text-gray-400 pb-4 pr-2">
                        <Link href={`https://mumbai.polygonscan.com/address/${props.detail?.result[1]}`} target='_blank'> {props.detail?.result[1]}</Link>
                    </span>
                </div>
              
                <div className="flex md:pt-6">
                    <SendFRequest address={props?.detail?.result[0]} classN="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-[17px] hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"></SendFRequest>
                    <Link href={`/groups/${props?.detail?.result[0]}`}>
                        <button className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-[17px] hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700 ms-3">
                            View Group
                        </button>
                    </Link>
                </div>
                </div>
            </div>
        </div>
    );
}