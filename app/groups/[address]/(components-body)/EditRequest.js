'use client';
import { Button, Checkbox, Label, Modal, TextInput, Textarea } from 'flowbite-react';
import { useState } from 'react';
import { useContractWrite, useWaitForTransaction } from 'wagmi';
import groupAbi from "../../../../ethereum/build/Group.json"
import LoadingRound from '../(components-address)/LoadingRound';
import Swal from 'sweetalert2';
import { parseEther } from 'viem';

export default function NewRequestModal(props) {
  const [openModal, setOpenModal] = useState(false);
  const [name, setName] = useState(props?.name);
  const [details, setDetails] = useState(props?.description);
  const [tar, setTar] = useState(props?.target);
  const [min, setMin] = useState(props?.minCont);
  const [recp, setRecp] = useState(props?.recipient);

  function onCloseModal() {
    setOpenModal(false);
    setName(props?.name);
    setDetails(props?.description);
    setTar(props?.target);
    setMin(props?.minCont);
    setRecp(props?.recipient);
  }

  const editReq = useContractWrite({
    address: props?.address,
    abi: groupAbi.abi,
    functionName: "editRequest",
    onError(err){
      Swal.fire({
        title: "Failed",
        text: "Failed to edit request details",
        icon: "error",
        timer: 1500,
      })
    }
  })

  const waitCreate = useWaitForTransaction({
    hash: editReq?.data?.hash,
    onSettled(data,err){
      if(data){
        Swal.fire({
          title: "Success",
          text: "Request edited successfully",
          icon: "success",
          timer: 1500,
        })
        setOpenModal(false);
        props?.reqDet?.refetch()
        props?.reqDet2?.refetch()
      }
      if(err){
        Swal.fire({
          title: "Failed",
          text: "Failed to edit request details",
          icon: "error",
          timer: 1500,
        })
      }
    }
  })

  return (
    <>
    <button className='bg-white' onClick={() => setOpenModal(true)}>
            <span className="flex items-center text-gray-500 hover:text-blue-500">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
            </svg>
                Edit Request 
            </span>
    </button>
      <Modal show={openModal} size="xl" onClose={onCloseModal} popup>
        <Modal.Header />
        <Modal.Body>
          <div className="space-y-6">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white" >Create New Request</h3>
            <form className="flex max-w-md flex-col gap-4" onSubmit={(event)=>{ 
              event.preventDefault();
              if(parseFloat(min)>0&&parseFloat(tar)>0){
                editReq?.write({args: [props?.index,name,details,parseEther(tar),parseEther(min)]})
              }
              else{
                Swal.fire({
                  title: "Failed",
                  text: "Minimum contribution or target amount should be greater 0",
                  icon: "error",
                  timer: 1500,
                })
              }
              }}>
            <div>
              <div className="mb-2 block">
                <Label value="Request Name" />
              </div>
              <TextInput
                id="text"
                placeholder="Enter your Request Name"
                value={name}
                onChange={(event) => setName(event.target.value)}
                required
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label value="Request Details"/>
              </div>
              <Textarea
                id="text"
                placeholder="Enter your Request Details"
                value={details}
                onChange={(event) => setDetails(event.target.value)}
                required
                rows={3}
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label value="Target Amount" />
              </div>
              <TextInput
                id="text"
                type='number'
                placeholder="Enter your target amount in USDT"
                value={tar}
                onChange={(event) => setTar(event.target.value)}
                color={parseFloat(tar)<=0?"failure":""}
                helperText={
                  parseFloat(tar)<=0?
                  <>
                    <span className="font-medium text-red-500">*Target amount should be greater that zero</span>
                  </>:""
                }
                addon="USDT"
                required
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label value="Minimum Contribution" />
              </div>
              <TextInput
                id="text"
                type='number'
                placeholder="Enter the minimum contribution"
                value={min}
                onChange={(event) => setMin(event.target.value)}
                color={parseFloat(min)<=0?"failure":""}
                helperText={
                  parseFloat(min)<=0?
                  <>
                    <span className="font-medium text-red-500">*Minimum contribution should be greater that zero</span>
                  </>:""
                }
                addon="USDT"
                required
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label value="Recipient Address" />
              </div>
              <TextInput
                id="text"
                placeholder="Enter the address of recipient"
                value={recp}
                onChange={(event) => setRecp(event.target.value)}
                disabled
              />
            </div>
            <div className="w-full">
              {waitCreate?.isLoading||editReq?.isLoading?<LoadingRound></LoadingRound>:<Button type='submit'>Submit</Button>}
            </div>
            </form>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
