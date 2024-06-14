'use client'
import { Button, Checkbox, FileInput, Label, Modal, TextInput, Textarea } from 'flowbite-react';
import { useState } from 'react';
import { useContractWrite, useWaitForTransaction } from 'wagmi';
import factoryAbi from "../../../../ethereum/build/Factory.json"
import LoadingRound from '../(components-address)/LoadingRound';
import Swal from 'sweetalert2';
import Compressor from 'compressorjs';
import { create as ipfsHttpClient } from "ipfs-http-client";
import dotenv from "dotenv";
dotenv.config({ path: '../../.env' });

export default function NewRequestModal(props) {
  const [openModal, setOpenModal] = useState(false);
  const [name, setName] = useState(props?.groupName);
  const [details, setDetails] = useState(props?.groupDesc);
  const [photo,setPhoto] = useState();
  const [uploadedImages, setUploadedImages] = useState([]);
  let photoUrl;
  const projectId = process.env.NEXT_PUBLIC_REACT_APP_PROJECT_ID;
  const projectSecretKey = process.env.NEXT_PUBLIC_REACT_APP_PROJECT_KEY;
  const authorization = "Basic " + Buffer.from(projectId + ':' + projectSecretKey).toString('base64');
  const ipfs = ipfsHttpClient({
    url: "https://infura-ipfs.io:5001/api/v0",
    headers: {
      authorization,
    },
  });

  function onCloseModal() {
    setOpenModal(false);
    setName(props?.groupName);
    setDetails(props?.groupDesc);
    setPhoto();
  }

  const editGroup = useContractWrite({
    address: "0xA26cE4725195DA118f71E06E52761229E4cb9439",
    abi: factoryAbi.abi,
    functionName: "updateGroupDetails",
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
    hash: editGroup?.data?.hash,
    onSettled(data,err){
      if(data){
        Swal.fire({
          title: "Success",
          text: "Group details edited successfully",
          icon: "success",
          timer: 1500,
        })
        setOpenModal(false);
        setPhoto();
        props?.det?.refetch();
      }
      if(err){
        Swal.fire({
          title: "Failed",
          text: "Failed to edit Group details",
          icon: "error",
          timer: 1500,
        })
      }
    }
  })
  const handleCompressedUpload = (e) => {
    const image = e.target.files[0];
    new Compressor(image, {
      quality: 0.5,
      success: (compressedResult) => {      
        setPhoto(compressedResult)
      },
    });
  };

  async function handleForm(event){
    event.preventDefault();
    if(photo){
      const file = photo;
      const result = await ipfs.add(file);

      setUploadedImages([
      ...uploadedImages,
      {
          cid: result.cid,
          path: result.path,
      },
      ]);
      photoUrl = `https://sharewise.infura-ipfs.io/ipfs/${result.path}`;
  }
  else{
      photoUrl = props?.profilePic;
  }
  editGroup.write({
      args: [props?.groupAdd,name,details,photoUrl],
  })
  }

  return (
    <>
    <button type="button" className="px-4 py-1.5 text-xs font-medium text-center text-black bg-gray-200 rounded-lg hover:bg-gray-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={()=>{setOpenModal(true)}}>Edit Group</button> 
      <Modal show={openModal} size="xl" onClose={onCloseModal} popup>
        <Modal.Header />
        <Modal.Body>
          <div className="space-y-6">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white" >Edit Group Details</h3>
            <form className="flex max-w-md flex-col gap-4" onSubmit={handleForm}>
                <div>
                  <div className="">
                    <div className="py-2 flex items-center justify-center">
                    <img
                        className="w-24 h-24 mb-3 rounded-full shadow-lg"
                        src={photo?URL.createObjectURL(photo):props?.profilePic}
                        alt="https://sharewise.infura-ipfs.io/ipfs/QmVNytr6bn2kiYzDAN6wYthHRh4nBr5D7GpK8VESnY8gNJ"
                    />
                        
                    </div>
                  </div>
                  <FileInput id="dropzone-file" className="" onChange={handleCompressedUpload} accept="image/png, image/jpeg"/>
                </div>
            <div>
            
              <div className="mb-2 block">
                <Label value="Group Name" />
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
                <Label value="Group Details"/>
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
            <div className="w-full">
              {waitCreate?.isLoading||editGroup?.isLoading?<LoadingRound></LoadingRound>:<Button type='submit'>Submit</Button>}
            </div>
            </form>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
