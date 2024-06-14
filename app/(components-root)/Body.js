"use client"
import React, { Suspense } from "react";
import { ConnectButton } from '@rainbow-me/rainbowkit';
import '@rainbow-me/rainbowkit/styles.css';
import { useAccount } from "wagmi";
import { useRouter } from "next/navigation";

export default function Body(){

    return(
        <Suspense>
            
        <div className="container mx-auto">
            <h1 className="mb-4 text-center text-2xl font-extrabold text-gray-900 md:text-3xl lg:text-3xl dark:text-white">Share and Store your expenses with your friends</h1>
            <p className="mb-3 py-5 text-center text-lg font-normal text-gray-500 dark:text-gray-400">
                Create a decentralized wallet to store and share expenses with your friends and families for different occasions.
            </p>
        </div>
        <div
            className="bg-white rounded-lg dark:bg-gray-800"
            id="stats"
            role="tabpanel"
            aria-labelledby="stats-tab"
            >
            <dl className="grid max-w-screen-xl grid-cols-2 gap-8 p-4 mx-auto text-gray-900 sm:grid-cols-3 dark:text-white sm:p-8">
                <div className="flex flex-col items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                </svg>

                <dt className="my-3 text-xl font-medium">Maintain your privacy</dt>
                <dd className="text-gray-500 text-center dark:text-gray-400">Create expenses visible for public or chose to keep it private.</dd>
                </div>
                <div className="flex flex-col items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a2.25 2.25 0 00-2.25-2.25H15a3 3 0 11-6 0H5.25A2.25 2.25 0 003 12m18 0v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 9m18 0V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v3" />
                </svg>

                <dt className="my-3 text-xl font-medium">Decentralized Wallet</dt>
                <dd className="text-gray-500 text-center dark:text-gray-400">Well secured wallet, Specially designed to spend your expenses.</dd>
                </div>
                <div className="flex flex-col items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                    <path d="M21.721 12.752a9.711 9.711 0 00-.945-5.003 12.754 12.754 0 01-4.339 2.708 18.991 18.991 0 01-.214 4.772 17.165 17.165 0 005.498-2.477zM14.634 15.55a17.324 17.324 0 00.332-4.647c-.952.227-1.945.347-2.966.347-1.021 0-2.014-.12-2.966-.347a17.515 17.515 0 00.332 4.647 17.385 17.385 0 005.268 0zM9.772 17.119a18.963 18.963 0 004.456 0A17.182 17.182 0 0112 21.724a17.18 17.18 0 01-2.228-4.605zM7.777 15.23a18.87 18.87 0 01-.214-4.774 12.753 12.753 0 01-4.34-2.708 9.711 9.711 0 00-.944 5.004 17.165 17.165 0 005.498 2.477zM21.356 14.752a9.765 9.765 0 01-7.478 6.817 18.64 18.64 0 001.988-4.718 18.627 18.627 0 005.49-2.098zM2.644 14.752c1.682.971 3.53 1.688 5.49 2.099a18.64 18.64 0 001.988 4.718 9.765 9.765 0 01-7.478-6.816zM13.878 2.43a9.755 9.755 0 016.116 3.986 11.267 11.267 0 01-3.746 2.504 18.63 18.63 0 00-2.37-6.49zM12 2.276a17.152 17.152 0 012.805 7.121c-.897.23-1.837.353-2.805.353-.968 0-1.908-.122-2.805-.353A17.151 17.151 0 0112 2.276zM10.122 2.43a18.629 18.629 0 00-2.37 6.49 11.266 11.266 0 01-3.746-2.504 9.754 9.754 0 016.116-3.985z" />
                </svg>
                
                <dt className="my-3 text-xl font-medium">Explore Web3</dt>
                <dd className="text-gray-500 text-center dark:text-gray-400">Experience the web3 technology by just connecting your wallet.</dd>
                </div>
            </dl>
        </div>
        <hr className="w-60 h-1 mx-auto my-4 bg-blue-100 border-0 rounded md:my-10 dark:bg-blue-700"></hr>
        <div className="container py-5 mx-auto">
            <h1 className="mb-4 text-center text-2xl font-extrabold text-gray-900 md:text-3xl lg:text-3xl dark:text-white">Get started by creating your first group</h1>
            <p className="mb-3 py-5 text-center text-lg font-normal text-gray-500 dark:text-gray-400">
            Create your first group to invite your friends and together share your expenses.
            </p>
            <div className="flex flex-col items-center">
            <ConnectButton></ConnectButton>
            </div>
        </div>
        </Suspense>

    );
}   