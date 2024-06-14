"use client"
import { Button, Label, Modal, TextInput } from 'flowbite-react';
import { useState } from 'react';
import {Timeline } from 'flowbite-react';
import { HiArrowNarrowRight, HiCalendar } from 'react-icons/hi';
import { useAccount, useContractRead, useContractWrite, useWaitForTransaction } from 'wagmi';
import tokenAbi from "../../../../ethereum/build/Token.json"
import groupAbi from "../../../../ethereum/build/Group.json"
import { formatEther, parseEther } from 'viem';
import LoadingRound from '../(components-address)/LoadingRound';
import Swal from 'sweetalert2';

export default function FormModel(props) {
  const [openModal, setOpenModal] = useState(false);
  const [value, setValue] = useState('');
  const [steps, setStep] = useState({
    stepsItems: ["Approve", "Pay", "Completed"],
    currentStep: 1
})
    const {address} = useAccount();

    
    //console.log(formatEther(usdtBalance?.data))
    const approvePayment = useContractWrite({
        address: "0x5917EaA193F1E5c77eF955fa6b643772d411437a",
        abi: tokenAbi,
        functionName: "approve",
        onSettled(data,err){
            if(err){
                Swal.fire({
                    title: "Failed",
                    text: "Approve Failed",
                    icon: "error",
                    timer: 1500,
                })
            }
        }
    })

    const waitForApprove = useWaitForTransaction({
        hash: approvePayment?.data?.hash,
        onSettled(data,err){
            if(data){
                if(value==="0"){
                    Swal.fire({
                        title: "Approve canceled Successfully",
                        text: "",
                        icon: "success",
                        timer: 1500,
                    })
                    setStep({
                        stepsItems: ["Approve", "Pay", "Completed"],
                        currentStep: 1,
                    })
                }
                else{
                    Swal.fire({
                        title: "Approved",
                        text: "Approve Successful",
                        icon: "success",
                        timer: 1500,
                    })
                    setStep({
                        stepsItems: ["Approve", "Pay", "Completed"],
                        currentStep: 2,
                    })
                }
                
            }
            if(err){
                Swal.fire({
                    title: "Failed",
                    text: "Approve Failed",
                    icon: "error",
                    timer: 1500,
                })
            }
        }
    })

    const payment = useContractWrite({
        address: props.address,
        abi: groupAbi.abi,
        functionName: "approveRequest",
        args: [props?.index,parseEther(value)],
        onSettled(data,err){
            if(err){
                Swal.fire({
                    title: "Payment Failed",
                    text: "Amount is higher than the approved amount",
                    icon: "error",
                    timer: 1500,
                })
            }
        }
    })

    const waitForPayment = useWaitForTransaction({
        hash: payment?.data?.hash,
        onSettled(data,err){
            if(data){
                
                
                    Swal.fire({
                        title: "Payment Successful",
                        text: "",
                        icon: "success",
                        timer: 1500,
                    })
                    setStep({
                        stepsItems: ["Approve", "Pay", "Completed"],
                        currentStep: 4,
                    })
                    props.request1.refetch()
                    props.request2.refetch()
                     props.balance.refetch()
                
                
            }
            if(err){
                Swal.fire({
                    title: "Payment Failed",
                    text: "There was error in the transaction",
                    icon: "error",
                    timer: 1500,
                })
            }
        }
    })

  function onCloseModal() {
    setOpenModal(false);
    setValue('');
  }

  return (
    <>
      <Button pill className='h-9 w-15' color='light' onClick={()=>{setOpenModal(true)}}>Contribute</Button>
      <Modal show={openModal} size="md" onClose={onCloseModal} popup>
        <Modal.Header />
        <Modal.Body>
        <div className="space-y-6">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">Be a contributor to this group</h3>
            <div>
              
              { steps.currentStep===1&&
              <>
                <div className="mb-2 block">
                    <Label htmlFor="email" value="Amount" />
                </div>
                <TextInput
                id="email"
                placeholder="Amount (USDT)"
                type='number'
                value={value}
                onChange={(event) => setValue(event.target.value)}
                required
                />
              </>
              }

            { steps.currentStep===2&&
              <>
                <div className="flex items-center justify-center">
                    <span className='font-normal text-md'>Do you want to pay {value} USDT?</span>
                </div>
              </>
            }

            { steps.currentStep===4&&
              <>
                <div className="flex items-center justify-center">
                    <span className='font-normal text-md text-green-500'>Payment Successfull</span>
                </div>
              </>
            }
              
            </div>
            
            <div className="flex justify-center">
                {steps.currentStep===1&&((waitForApprove?.isLoading||approvePayment?.isLoading)?<LoadingRound></LoadingRound>:<Button className='h-9 w-15' color='light' onClick={()=>{
                    approvePayment.write({args: [props?.address,parseEther(value)]})
                }}>Approve</Button>)}

                {steps.currentStep===2&&((waitForPayment?.isLoading||payment?.isLoading||waitForApprove?.isLoading||approvePayment?.isLoading)?<LoadingRound></LoadingRound>:
                <div className='flex flex-row gap-4'>
                <button type="button" className="text-white bg-green-400 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800" onClick={()=>{
                    payment.write()
                }}>Pay</button>
                <button type="button" className="text-white bg-red-500 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2 text-center me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800" onClick={()=>{
                    setValue("0")
                    approvePayment.write({args: [props?.address,parseEther("0")]})
                    
                }}>Cancel approve</button>
                </div>)}
                {steps.currentStep===4&&<Button className='h-9 w-15' color='green' onClick={()=>{setStep({
                    stepsItems: ["Approve", "Pay", "Completed"],
                    currentStep: 1,
                })}}>Contribute more</Button>}
                
            </div>
            <div className="w-full">
                    <div className="max-w-2xl mx-auto px-4 md:px-0">
                    <ul aria-label="Steps" className="items-center text-gray-600 font-medium md:flex">
                        {steps.stepsItems.map((item, idx) => (
                            <li key={idx} aria-current={steps.currentStep == idx + 1 ? "step" : false} className="flex gap-x-3 md:flex-col md:flex-1 md:gap-x-0">
                                <div className="flex flex-col items-center md:flex-row md:flex-1">
                                    <hr className={`w-full border hidden md:block ${idx == 0 ? "border-none" : "" || steps.currentStep >= idx + 1 ? item==="Completed"?"border-green-300": "border-indigo-600" : ""}`} />
                                    <div className={`w-8 h-8 rounded-full border-2 flex-none flex items-center justify-center ${steps.currentStep > idx + 1 ? item==="Completed"?"bg-green-400 border-green-400": "bg-blue-500 border-blue-500"  : "" || steps.currentStep == idx + 1 ? "border-indigo-600" : ""}`}>
                                        <span className={`w-2.5 h-2.5 rounded-full bg-indigo-600 ${steps.currentStep != idx + 1 ? "hidden" : ""}`}></span>
                                        {
                                            steps.currentStep > idx + 1 ? (
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-white">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                                </svg>
                                            ) : ""
                                        }
                                    </div>
                                    <hr className={`h-12 border md:w-full md:h-auto ${idx + 1 == steps.stepsItems.length ? "border-none" : "" || steps.currentStep > idx + 1 ? "border-indigo-600" : ""}`} />
                                </div>
                                <div className="h-8 flex justify-center items-center md:mt-3 md:h-auto">
                                    <h3 className={`text-sm ${steps.currentStep == idx + 1 ? "text-indigo-600" : ""}`}>
                                        {item}
                                    </h3>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
