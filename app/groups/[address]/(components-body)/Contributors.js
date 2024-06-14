"use client"
import React, { useState } from 'react'
import DropDown from './DropDown';

function Contributors(props) {

    const [col,setCol] = useState("hidden");
    //console.log(props?.target)
  return (
    <div
        id="accordion-flush"
        data-accordion="collapse"
        data-active-classes="bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
        data-inactive-classes="text-gray-500 dark:text-gray-400"
    >
            <h2 id="accordion-flush-heading-1">
                <button
                type="button"
                className="flex items-center justify-center w-full py-2 font-medium rtl:text-right text-gray-500 dark:border-gray-700 dark:text-gray-400 gap-3"
                data-accordion-target="#accordion-flush-body-1"
                aria-expanded="true"
                aria-controls="accordion-flush-body-1"
                onClick={()=>{col==="hidden"?setCol(""):setCol("hidden")}}
                >
                <span className=''>Contributors</span>
                <svg
                    data-accordion-icon=""
                    className={`w-3 h-3 rotate-${col==="hidden"?"0":"180"} shrink-0`}
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 10 6"
                >
                    <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5 5 1 1 5"
                    />
                </svg>
                </button>
            </h2>
            <div
                id="accordion-flush-body-1"
                className={col}
                aria-labelledby="accordion-flush-heading-1"
            >
                <div className="py-5 border-b border-gray-200 dark:border-gray-700">
                    <div className='flex flex-row justify-between'>
                        <div className='basis-1/4 text-center font-bold'>
                            <p>Address</p>
                        </div>
                        <div className='basis-1/4 text-center font-bold'>
                            <p>Amount</p>
                        </div>
                        <div className='basis-1/4 text-center font-bold'>
                            <p>Contribution</p>
                        </div>
                    </div>
                    {
                        <DropDown approvers={props?.approvers} address={props?.address} index={props?.index} target={props?.target}></DropDown>
                    }
                </div>
            </div>
        </div>
  )
}

export default Contributors