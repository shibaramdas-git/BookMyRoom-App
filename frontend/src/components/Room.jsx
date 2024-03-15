import React from 'react'
import { Modal, Carousel } from 'flowbite-react'
import { useState } from 'react';
import { Link } from 'react-router-dom'


export const Room = ({ room }) => {
  const [openModal, setOpenModal] = useState(false);

  return (
    <div className='border mt-2 flex shadow-md'>
      <div className='w-[30%] p-2'>
        <img src={room.imageUrls[0]} alt="hotel image" className='h-[150px] w-full' />
      </div>
      <div className='ml-2 w-2/3 text-[15px]'>
        <h3 className='text-[20px] font-bold'>{room.name}</h3>
        <p>{room.address}</p>
        <p>Contact Number :- {room.contactNumber}</p>
        <p>Max Allowed    :- {room.maxAllowed} Person</p>
        <p>Rent Perday    :- {room.rentPerDay} Rs Only</p>
        <p>Type           :- {room.type} Rooms</p>

        <span className='float-right mb-3'>
          <Link to={`/book/${room._id}`}> 
            <button className='bg-gray-800 active:bg-white active:text-black active:border active:border-black text-white font-bold py-[6px] px-[10px] rounded mr-2'>Book Now</button>
          </Link>
          <button onClick={() => setOpenModal(true)} className='bg-gray-800 active:bg-white active:text-black active:border active:border-black text-white font-bold py-[6px] px-[10px] rounded'>View Details</button>
        </span>

        {/* Modal Box of "view detail" button*/}
        <Modal dismissible show={openModal} onClose={() => setOpenModal(false)} size="lg">
          <Modal.Header className='py-2.5'><h3 className='font-bold text-2xl'>{room.name}</h3></Modal.Header>
          <Modal.Body className='p-2.5'>
            <div className="space-y-6">
              <div className="h-[270px] sm:h-64 xl:h-80 2xl:h-96 shadow-lg">
                {/* Carousel image */}
                <Carousel>
                  {room.imageUrls.map((url) => <img src={url} alt="room image" className='h-[270px] w-full'/>)}
                </Carousel>
              </div>
              <p className="text-base dark:text-gray-400 p-0 text-justify">
                {room.description}
              </p>
              <div className='mx-auto my-[-2px] p-0 w-1/4'><button className='bg-gray-800 active:bg-white active:text-black active:border active:border-black text-white text-[15px] font-bold p-2 rounded'>Book Now</button></div>
            </div>
          </Modal.Body>
        </Modal>

      </div>
    </div>
  )
}