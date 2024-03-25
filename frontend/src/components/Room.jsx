import React from "react";
import { Modal, Carousel } from "flowbite-react";
import { useState } from "react";
import { Link } from "react-router-dom";

export const Room = ({ room, fromDate, toDate }) => {
  const [openModal, setOpenModal] = useState(false);

  function isLoggedIn () {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    if(!user) {
      window.location.href = '/login';
    }
  }

  return (
    <div className="border mt-2 flex shadow-md bg-white rounded-sm" >
      <div className="w-[30%] p-2">
        <img
          src={room.imageUrls[0]}
          alt="hotel image"
          className="h-[150px] w-full"
        />
      </div>
      <div className="ml-2 w-2/3 text-[15px]">
        <h3 className="text-[20px] font-bold pt-2">{room.name}</h3>
        <p>{room.address}</p>
        <p>Contact Number :- {room.contactNumber}</p>
        <p>Max Allowed :- {room.maxAllowed} Person</p>
        <p>Rent Perday :- {room.rentPerDay} Rs Only</p>
        <p>Type :- {room.type} Rooms</p>

        <span className="float-right mb-3">
          {fromDate && toDate && (
            <Link to={`/book/${room._id}/${fromDate}/${toDate}`}>
              <button onClick={isLoggedIn} className="bg-gray-800 active:bg-white active:text-black active:border active:border-black text-white font-bold py-[6px] px-[10px] rounded mr-2">
                Book Now
              </button>
            </Link>
          )}

          <button
            onClick={() => setOpenModal(true)}
            className="bg-gray-800 active:bg-white active:text-black active:border active:border-black text-white font-bold py-[6px] px-[10px] rounded"
          >
            View Details
          </button>
        </span>

        {/* Modal Box of "view detail" button*/}
        <Modal
          dismissible
          show={openModal}
          onClose={() => setOpenModal(false)}
          size="lg"
        >
          <Modal.Header className="py-3">
            <h3 className="font-bold text-2xl">{room.name}</h3>
          </Modal.Header>
          <Modal.Body className="p-4">
            <div className="space-y-6">
              <div className="h-[270px] sm:h-64 xl:h-80 2xl:h-96 shadow-lg">
                {/* Carousel image */}
                <Carousel>
                  {room.imageUrls.map((url) => (
                    <img
                      src={url}
                      alt="room image"
                      className="h-[270px] w-full"
                    />
                  ))}
                </Carousel>
              </div>
              <p className="text-base dark:text-gray-400 p-0 text-justify">
                {room.description}
              </p>
            </div>
          </Modal.Body>
        </Modal>
      </div>
    </div>
  );
};
