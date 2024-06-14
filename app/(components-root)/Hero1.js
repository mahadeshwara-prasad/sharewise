import React, { Suspense } from "react";
import { ConnectButton } from '@rainbow-me/rainbowkit';
import '@rainbow-me/rainbowkit/styles.css';

export default function Hero1(){

    return(
        <Suspense>

            <div className="container mx-auto grid grid-cols-2 gap-4">
  
                <div className="w-full p-6 bg-transparent">
                
                <h1 className="mb-4 text-2xl font-extrabold leading-none tracking-tight text-gray-900 md:text-3xl lg:text-4xl dark:text-white">Your Expenses are safe inside the <span className="underline underline-offset-3 decoration-8 decoration-green-200 dark:decoration-blue-600">Blockchain</span></h1>
                    
                    <p className="mb-3 py-5 font-normal text-gray-500 dark:text-gray-400">
                        Add and manage your expenses in the best secure way possible. Ask your friends to join your group.
                    </p>
                    <ConnectButton></ConnectButton>

                </div>
                <div className="flex flex-col items-end">
                <svg className = "fill-blue-500" width="300" height="300" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500">
                    <path d="M234.4 115.4c-54 8.9-92.6 48.1-87.5 88.7 1 7.6 3.9 16.9 6.5 20.4 1.2 1.6 1.4 1 2.1-6.1 3.6-39.9 44.3-68.4 97.6-68.4 16 0 36.6 3.9 48.5 9.1l4.6 2.1-4.6 4.7c-2.5 2.6-4.6 5.1-4.6 5.6 0 .9 55.9 1 56.7.1.2-.2-2.2-11.4-5.4-25-3.8-15.9-6.2-24.6-7-24.6-.7 0-1.3.3-1.3.7 0 .5-1.9 3-4.3 5.6l-4.2 4.8-8.5-4c-10.7-5-24.8-9.8-36.5-12.3s-40.4-3.3-52.1-1.4z"/>
                    <path d="M210.5 192.7c-6.8.9-13.5 2.5-13.5 3.3 0 .4 2 2.5 4.4 4.6 2.5 2.2 9.7 8.8 16 14.7l11.4 10.8 11.4-1.7c27.2-4 52.8 1.4 73.9 15.6 6.9 4.7 23.6 21.1 26.6 26 3.3 5.6 4.2 3.3 2.2-6.2-.6-2.9-3-9.4-5.5-14.5-12.2-25.4-43-45.3-80.3-51.8-7.7-1.4-38.2-1.9-46.6-.8zm-53.7 39.8c-.8.9 1.1 11.2 3.2 16.8 11.1 29.7 45.4 52.9 87 58.7 15.2 2.2 52.9.4 55.9-2.5.6-.6-18.6-19.4-27.6-27.1-4.1-3.5-4.2-3.5-9.6-2.5-2.9.5-10.3 1.3-16.3 1.7-34 2.1-62.4-10.3-85-37.3-7.4-8.9-7-8.4-7.6-7.8z"/>
                    <path d="M345.7 275.6c-.4.4-.7 3.2-.7 6.3-.1 26-23.9 52.4-57 63-24.8 8-55.2 8-80.1.1-5.2-1.7-10.4-3.6-11.7-4.3-2.2-1.3-2.2-1.3 2.8-6.2 2.7-2.7 5-5.2 5-5.5 0-.3-13.1-.4-29.1-.2-27 .2-29 .4-28.4 2 .3.9 2.7 10.5 5.2 21.2 6.2 26.9 6 26.1 6.8 26.8.4.4 1.4-.2 2.3-1.3 1-1.2 3.1-3.8 4.9-6l3.2-3.8 9.8 4.5c11.8 5.6 22.6 9.2 35.3 12.1 13.1 2.9 44.2 3.1 57 .3 22.5-4.9 40.3-13.4 56.1-26.9 24.1-20.6 32.9-49.8 22.7-75.7-2.4-6.2-3.1-7.3-4.1-6.4z"/>
                </svg>
                </div>
            </div>

        </Suspense>


    );
}