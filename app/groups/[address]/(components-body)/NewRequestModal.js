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
  const [name, setName] = useState('');
  const [details, setDetails] = useState('');
  const [tar, setTar] = useState('');
  const [min, setMin] = useState('');
  const [recp, setRecp] = useState('');

  function onCloseModal() {
    setOpenModal(false);
    setName('');
    setDetails('');
    setTar('');
    setMin('');
    setRecp('');
  }

  const createReq = useContractWrite({
    address: props?.address,
    abi: groupAbi.abi,
    functionName: "createRequest",
    onError(err){
      Swal.fire({
        title: "Failed",
        text: "Failed to create request",
        icon: "error",
        timer: 1500,
      })
    }
  })

  const waitCreate = useWaitForTransaction({
    hash: createReq?.data?.hash,
    onSettled(data,err){
      if(data){
        Swal.fire({
          title: "Success",
          text: "Request created successfully",
          icon: "success",
          timer: 1500,
        })
        setName('');
        setDetails('');
        setTar('');
        setMin('');
        setRecp('');
        props?.reqDet?.refetch()
        props?.reqDet2?.refetch()
      }
      if(err){
        Swal.fire({
          title: "Failed",
          text: "Failed to create request",
          icon: "error",
          timer: 1500,
        })
      }
    }
  })

  return (
    <>
    <Button pill outline gradientDuoTone="cyanToBlue" onClick={() => setOpenModal(true)}><svg className="w-4 h-4 me-2 text-white-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20" >
        <path d="M9.546.5a9.5 9.5 0 1 0 9.5 9.5 9.51 9.51 0 0 0-9.5-9.5ZM13.788 11h-3.242v3.242a1 1 0 1 1-2 0V11H5.304a1 1 0 0 1 0-2h3.242V5.758a1 1 0 0 1 2 0V9h3.242a1 1 0 1 1 0 2Z"/>
        </svg>
        New Request
    </Button>
      <Modal show={openModal} size="xl" onClose={onCloseModal} popup>
        <Modal.Header />
        <Modal.Body>
          <div className="space-y-6">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white" >Create New Request</h3>
            <form className="flex max-w-md flex-col gap-4" onSubmit={(event)=>{ 
              event.preventDefault();
              if(parseFloat(min)>0&&parseFloat(tar)>0){
                createReq?.write({args: [name,details,parseEther(min),parseEther(tar),recp]})
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
                required
              />
            </div>
            <div className="w-full">
              {waitCreate?.isLoading||createReq?.isLoading?<LoadingRound></LoadingRound>:<Button type='submit'>Submit</Button>}
            </div>
            </form>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
