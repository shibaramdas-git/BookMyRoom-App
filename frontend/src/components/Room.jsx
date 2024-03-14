import React from 'react'
import { Button } from 'flowbite-react'

export const Room = ({ room }) => {
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
        <span className='float-right mx-3 mb-3'><button className='bg-gray-800 active:bg-white active:text-black active:border active:border-black text-white font-bold py-1 px-2 rounded'>View Details</button></span>
        <Button>hello</Button>
        
      </div>
    </div>
  )
}
