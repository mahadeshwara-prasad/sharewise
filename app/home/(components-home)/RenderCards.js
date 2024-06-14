"use client"
import React, { Suspense, useState } from "react"
import Card from "./Card";
import { useContractRead, useContractReads } from "wagmi";
import factory from "../../../ethereum/build/Factory.json";


export default function RenderCards(){

    const [searchField, setSearchField] = useState("");

    const getGroupAddress = useContractRead({
        address: '0xA26cE4725195DA118f71E06E52761229E4cb9439',
        abi: factory.abi,
        functionName: 'getDeployedGroupAddress',
        watch: true,
    });
    const getGroupDetails = useContractReads({
        contracts: getGroupAddress?.data?.map((address)=>({
            address: '0xA26cE4725195DA118f71E06E52761229E4cb9439',
            abi: factory.abi,
            functionName: 'groupDetails',
            args: [address],
            watch: true,
        })),
        suspense: true,
    });
    function getCards(){
        const details = getGroupDetails?.data?.map((group,index)=>(
            <Card key={index} detail={group}></Card>
        ))
        return(details);
    }

    const filteredPersons = getGroupDetails?.data?.filter(
        group => {
          return (
            group
            .result[2].toString()
            .toLowerCase()
            .includes(searchField.toLowerCase()) ||
            group
            .result[0].toString()
            .toLowerCase()
            .includes(searchField.toLowerCase()) ||
            group
            .result[1].toString()
            .toLowerCase()
            .includes(searchField.toLowerCase()) ||
            group
            .result[3].toString()
            .toLowerCase()
            .includes(searchField.toLowerCase()) ||
            group
            .result[4].toString()
            .toLowerCase()
            .includes(searchField.toLowerCase())
          );
        }
      );

      function searchList() {
        return (
          
            filteredPersons?.map((group,index)=>(
            <Card key={index} detail={group}></Card>
        ))
          
        );
      }


    return(
        <Suspense>

        <div className="container mx-auto py-6">
            <label
                htmlFor="default-search"
                className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
            >
                Search
            </label>
            <div className="relative">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg
                    className="w-4 h-4 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 20"
                >
                    <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                    />
                </svg>
                </div>
                <input
                type="search"
                id="default-search"
                className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search Groups name, address, owner..."
                required=""
                onChange={(event)=>{setSearchField(event.target.value)}}
                />
                <button
                type="submit"
                className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                Search
                </button>
            </div>
        </div>
        <div className="flex flex-wrap container mx-auto py-3">
            {searchList()}
        </div>    
            


        
        
        </Suspense>
    );
}