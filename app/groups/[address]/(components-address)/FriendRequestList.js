"use client"
import React, { useState } from 'react'
import Modal from "react-modal";
import FrCard from './FrCard';
import { useContractReads} from 'wagmi';
import groupAbi from "../../../../ethereum/build/Group.json"


function FriendRequestList(props) {
    const [modalOpen, setModalOpen] = useState(false);

    const customStyles = {
        content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "white",
            width: 400,
            padding: 0,
        },
    };
    const n = props?.frCount;
    const frRequest = [];
    for(let i=0;i<n;i++){
        frRequest.push(i);
    }

    const friendRequest = useContractReads({
        contracts: frRequest?.map((address)=>({
          address: props.address,
          abi: groupAbi.abi,
          functionName: 'getFriendRequest',
          args: [address],
          watch: true,
      }))
            
    }) 
    // console.log("obj",frRequest);
     //console.log("Test",friendRequest?.data);

    function putRequest(){
        const details = friendRequest?.data?.map((group,index)=>(
          
          <FrCard key={index} detail={group} index={index} data={friendRequest} address={props.address}></FrCard>
      ))
      return(details);
    }


  return (
    <>
    <div className="App">
      <button className="inline-block px-4 py-2 text-white duration-150 font-medium bg-indigo-600 rounded-lg hover:bg-indigo-500 active:bg-indigo-700 md:text-sm" onClick={setModalOpen}>Friend Requests</button>
      <Modal
        isOpen={modalOpen}
        onRequestClose={() => setModalOpen(false)}
        style={customStyles}
        ariaHideApp={false}
      >
        <div className="relative w-full max-w max-h-full">
  {/* Modal content */}
  <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
    {/* Modal header */}
    <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
        Friend Request
      </h3>
      <button
        type="button"
        className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm h-8 w-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
        data-modal-toggle="crypto-modal"
        onClick={()=>{setModalOpen(false)}}
      >
        <svg
          className="w-3 h-3"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 14 14"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
          />
        </svg>
        <span className="sr-only">Close modal</span>
      </button>
    </div>
    {/* Modal body */}
    <div className="p-4 md:p-2" style={{height:"400px",overflowY:"auto"}}>
      <ul className="my-4 space-y-3">
        {putRequest()}
      </ul>
    </div>
  </div>
</div>


        
      </Modal>
    </div>
</>

  )
}

export default FriendRequestList