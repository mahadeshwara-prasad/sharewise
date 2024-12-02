"use client"
import React, { Suspense, useState } from "react";
import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid'
import Compressor from 'compressorjs';
import { create as ipfsHttpClient } from "ipfs-http-client";
import dotenv from "dotenv";
dotenv.config({ path: '../../.env' });
import { useContractWrite, useWaitForTransaction} from 'wagmi'
import factoryAbi from "../../../../ethereum/build/Factory.json"
import swal from 'sweetalert';

export default function Form(){
    
    const projectId = process.env.NEXT_PUBLIC_REACT_APP_PROJECT_ID;
    const projectSecretKey = process.env.NEXT_PUBLIC_REACT_APP_PROJECT_KEY;
    const authorization = "Basic " + Buffer.from(projectId + ':' + projectSecretKey).toString('base64');
    let photoUrl;
    const [photo,setPhoto] = useState(null);
    const [uploadedImages, setUploadedImages] = useState([]);
    const [name,setName]=useState("");
    const [description,setDescription]=useState("");
    const createGroup = useContractWrite({
        address: '0xA26cE4725195DA118f71E06E52761229E4cb9439',
        abi: factoryAbi.abi,
        functionName: 'createGroup',
      })

      const waitForTransaction = useWaitForTransaction({
        hash: createGroup.data?.hash,
        onSuccess(data){
            setPhoto(null);
            setName("");
            setDescription("");
            swal("Success!", "Group created successfully"+"\n"+"Check My group section to manage your group", "success");
        }
        
      })
    const ipfs = ipfsHttpClient({
        url: "https://infura-ipfs.io:5001/api/v0",
        headers: {
          authorization,
        },
      });

      function dataURItoBlob(dataURI) {
        // convert base64 to raw binary data held in a string
        // doesn't handle URLEncoded DataURIs - see SO answer #6850276 for code that does this
        var byteString = atob(dataURI.split(',')[1]);
      
        // separate out the mime component
        var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]
      
        // write the bytes of the string to an ArrayBuffer
        var ab = new ArrayBuffer(byteString.length);
      
        // create a view into the buffer
        var ia = new Uint8Array(ab);
      
        // set the bytes of the buffer to the correct values
        for (var i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }
      
        // write the ArrayBuffer to a blob, and you're done
        var blob = new Blob([ab], {type: mimeString});
        return blob;
      
      }

    const handleCompressedUpload = (e) => {
        const image = e.target.files[0];
        console.log("normal",URL.createObjectURL(image));
        var reader = new FileReader();
        reader.onload = function() {
          console.log(reader.result);
          // image editing
          // ...
          var blob = dataURItoBlob(reader.result);
          console.log(blob, new File([blob], "image.png", {
            type: "image/png"
          }));
        };
        reader.readAsDataURL(image);
        new Compressor(image, {
          quality: 0.5,
          success: (compressedResult) => {      
            setPhoto(compressedResult)
          },
        });
      };

      const onSubmitHandler = async (event) => {
        event.preventDefault();
        try{
            // if(photo){
            //     const file = photo;
            //     const result = await ipfs.add(file);
        
            //     setUploadedImages([
            //     ...uploadedImages,
            //     {
            //         cid: result.cid,
            //         path: result.path,
            //     },
            //     ]);
            //     photoUrl = `https://sharewise.infura-ipfs.io/ipfs/${result.path}`;
            // }
            // else{
            //     photoUrl = "https://sharewise.infura-ipfs.io/ipfs/QmVNytr6bn2kiYzDAN6wYthHRh4nBr5D7GpK8VESnY8gNJ";
            // }
            photoUrl = "https://sharewise.infura-ipfs.io/ipfs/QmVNytr6bn2kiYzDAN6wYthHRh4nBr5D7GpK8VESnY8gNJ";
            createGroup.write({
                args: [name,description,photoUrl],
            })
            
        } catch(err){
            console.log(err);
        }
    }
    // console.log(createGroup.isError||waitForTransaction.isError)
    // console.log( "uploaded",photo);

    return(
        <Suspense>
        
        <div className="container mx-auto space-y-12">
        <div className="flex flex-row">
            <div className="basis-1/2">
                <form id="create-group-form" onSubmit={onSubmitHandler}>
                <div className="border-b border-gray-900/10 pb-12">
                <h2 className="text-base font-semibold leading-7 text-gray-900">New Group</h2>
                <p className="mt-1 text-sm leading-6 text-gray-600">
                    This information will be displayed publicly so be careful what you share.
                </p>

                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 pb-8">
                        <div className="sm:col-span-4">
                        <label htmlFor="username" className="block text-sm-5 pb-2 font-medium leading-6 text-gray-900">
                            Group Name
                        </label>
                        <div className="mt-2">
                            <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                            <input
                                type="text"
                                required
                                name="username"
                                id="username"
                                autoComplete="username"
                                className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                placeholder="Group Name"
                                onChange={(event)=>{setName(event.target.value)}}
                                value={name}
                            />
                            </div>
                        </div>
                        </div>

                        <div className="col-span-full">
                        <label htmlFor="about" className="block text-sm-5 pb-2 font-medium leading-6 text-gray-900">
                            Group description
                        </label>
                        <div className="mt-2">
                            <textarea
                            id="about"
                            name="about"
                            rows={3}
                            required
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            placeholder="Group Bio"
                            onChange={(event)=>{setDescription(event.target.value)}}
                            value={description}
                            />
                        </div>
                        <p className="mt-3 text-sm leading-6 text-gray-600">Write a few sentences about your group.</p>
                        </div>

                        <div className="col-span-full">
                        <label htmlFor="photo" className="block text-sm font-medium leading-6 text-gray-900">
                            Group Profile Photo
                        </label>
                        <div className="mt-2 flex items-center gap-x-3">
                        <img
                            className="w-24 h-24 mb-3 rounded-full shadow-lg"
                            src={photo?URL.createObjectURL(photo):"https://sharewise.infura-ipfs.io/ipfs/QmVNytr6bn2kiYzDAN6wYthHRh4nBr5D7GpK8VESnY8gNJ"}
                            alt="https://sharewise.infura-ipfs.io/ipfs/QmVNytr6bn2kiYzDAN6wYthHRh4nBr5D7GpK8VESnY8gNJ"
                        />
                            
                        </div>
                        </div>

                        <div className="col-span-full">
                            <label htmlFor="cover-photo" className="block text-sm-5 pb-2 font-medium leading-6 text-gray-900">
                                {"Change photo (optional)"}
                            </label>
                            <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                            {photo?
                            <div>
                                <div className="flex felx-row py-3">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="green" className="w-5 h-5">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
                                </svg>
                                <p className="pl-1 text-green-500">Success</p>
                                </div>
                            <button className="mini ui blue basic button" onClick={()=>{setPhoto(null)}}>
                                Remove
                            </button>
                            </div>:
                            <div className="text-center">
                            <PhotoIcon className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />
                            
                            <div className="mt-4 flex text-sm leading-6 text-gray-600">
                                <label
                                htmlFor="file-upload"
                                className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 hover:text-indigo-500"
                                >
                                <span>Upload photo</span>
                                <input id="file-upload" name="file-upload" type="file" onChange={handleCompressedUpload} className="sr-only" accept="image/png, image/jpeg"/>
                                </label>
                                <p className="pl-1">or drag and drop</p>
                                
                            </div>
                            <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 5MB</p>
                            </div>
                            }
                            
                                
                                
                            </div>
                        </div>
                    </div>
                    {createGroup.isLoading||waitForTransaction.isLoading?<div role="status">
        <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/></svg>
        <span class="sr-only">Loading...</span>
    </div>:
    <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit
    </button>}
                    
                    {createGroup.isError&&
                    
                    <>
                    {/* Hello world */}
                    <div>
                      <div
                        className="flex rounded-md bg-red-50 p-4 text-sm text-red-500"
                        
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          className="mr-3 h-5 w-5 flex-shrink-0"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <div>
                          <h4 className="font-bold">
                            Group creation failed due to one of the following reason
                          </h4>
                          <div className="mt-1">
                            <ul className="list-inside list-disc">
                              <li>User denied transaction</li>
                              <li>Wallet is not connected.</li>
                              <li>Wallet connected to wrong network</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                  
                    }
                  
                </div>
                </form>
            </div>

            <div className="basis-1/2">

            </div>
        </div>
    </div>
    </Suspense>
    )
}
