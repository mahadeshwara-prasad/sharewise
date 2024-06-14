
'use client';

import { Button, Modal } from 'flowbite-react';
import { useState } from 'react';
import { HiOutlineExclamationCircle } from 'react-icons/hi';

export default function Model(props) {
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <button className={props.cN} onClick={() => setOpenModal(true)}>
                                      {props.children}
      </button>
      
      <Modal show={openModal} size="md" onClose={() => setOpenModal(false)} popup>
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="break-all mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              {props.title}
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={() => {
                                                        setOpenModal(false);
                                                        props.action();
                                                    }}>
                {"Yes, I'm sure"}
              </Button>
              <Button color="gray" onClick={() => setOpenModal(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
