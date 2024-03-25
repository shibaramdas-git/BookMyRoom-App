import React, { useState, useEffect } from "react";
import { Tabs } from "antd";
import axios from "axios";
import { Loading } from "../components/Loading";
import { Error } from "../components/Error";
import Swal from "sweetalert2";

export default function Adminscreen() {
  // First Check thar=t user is admin or not ..
  useEffect(() => {
    if (!JSON.parse(localStorage.getItem("currentUser")).isAdmin) {
      window.location.href = "/home";
    }
  }, []);
  return (
    <div className="bg-slate-50 bg-opacity-30">
      <h1 className="text-center font-bold pt-3 text-lg underline">
        Admin Panel
      </h1>
      <Tabs
        defaultActiveKey="1"
        centered
        items={[
          {
            label: <h1>Rooms</h1>,
            key: 1,
            children: <Rooms />,
          },
          {
            label: `Add Rooms`,
            key: 2,
            children: <Addrooms />,
          },
          {
            label: `Bookings`,
            key: 3,
            children: <Bookings />,
          },
          {
            label: `Users`,
            key: 4,
            children: <Users />,
          },
        ]}
      />
    </div>
  );
}
export const Rooms = () => {
  const [rooms, setRooms] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  useEffect(() => {
    (async function () {
      try {
        setLoading(true);
        const resData = (
          await axios.get("http://localhost:5000/api/rooms/getallrooms")
        ).data;
        console.log(resData);
        setRooms(resData);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
        setError(true);
      }
    })();
  }, []);
  return (
    <div>
      {loading && <Loading />}
      {rooms ? (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg mx-3">
          <table className="w-full text-sm text-left rtl:text-right text-gray-900 dark:text-gray-200">
            <thead className="text-xs uppercase bg-slate-500 text-white">
              <tr>
                <th scope="col" className="px-3 py-3">
                  No.
                </th>
                <th scope="col" className="px-2 py-3">
                  Room Details
                </th>
                <th scope="col" className="px-4 py-3">
                  Room ID
                </th>
                <th scope="col" className="px-4 py-3">
                  Type
                </th>
                <th scope="col" className="px-2 py-2">
                  Max. Allowed
                </th>
                <th scope="col" className="px-4 py-3">
                  Rent per day
                </th>
                <th scope="col" className="px-4 py-3">
                  Contact Number
                </th>
              </tr>
            </thead>
            <tbody>
              {rooms.map((room, i) => {
                return (
                  <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                    <td className="px-3 py-4">{i + 1}</td>
                    <td className="px-2 py-4">
                      <strong>{room.name}</strong> <br /> {room.address}{" "}
                    </td>
                    <td className="px-4 py-4">{room._id}</td>
                    <td className="px-4 py-4 text-center">{room.type}</td>
                    <td className="px-2 py-2 text-center">{room.maxAllowed}</td>
                    <td className="px-4 py-4">{room.rentPerDay}</td>
                    <td className="px-4 py-4">{room.contactNumber}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <Error message="Something went wrong!! Please try again." />
      )}
    </div>
  );
};
export const Bookings = () => {
  const [bookings, setBookings] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  useEffect(() => {
    (async function () {
      try {
        setLoading(true);
        const resData = (
          await axios.get("http://localhost:5000/api/bookings/getallbookings")
        ).data;
        console.log(resData);
        setBookings(resData);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
        setError(true);
      }
    })();
  }, []);
  return (
    <div>
      {loading && <Loading />}
      {bookings ? (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg mx-3">
          <table className="w-full text-sm text-left rtl:text-right text-gray-900 dark:text-gray-400">
            <thead className="text-xs uppercase bg-slate-500 text-white">
              <tr>
                <th scope="col" className="px-4 py-3">
                  No.
                </th>
                <th scope="col" className="px-4 py-3">
                  Booking ID
                </th>
                <th scope="col" className="px-4 py-3">
                  User ID
                </th>
                <th scope="col" className="px-4 py-3">
                  Room details
                </th>
                <th scope="col" className="px-4 py-3">
                  From
                </th>
                <th scope="col" className="px-4 py-3">
                  To
                </th>
                <th scope="col" className="px-4 py-3">
                  Amount
                </th>
                <th scope="col" className="px-4 py-3">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking, i) => {
                return (
                  <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                    <td className="px-4 py-4">{i + 1}</td>
                    <td className="px-4 py-4">{booking._id}</td>
                    <td className="px-4 py-4">{booking.userId}</td>
                    <td className="px-4 py-4">{booking.room}</td>
                    <td className="px-4 py-4">{booking.fromDate}</td>
                    <td className="px-4 py-4">{booking.toDate}</td>
                    <td className="px-4 py-4">{booking.totalAmount}</td>
                    <td className="px-4 py-4">{booking.status}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <Error message="Something went wrong!! Please try again." />
      )}
    </div>
  );
};
export const Users = () => {
  const [users, setUsers] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  useEffect(() => {
    (async function () {
      try {
        setLoading(true);
        const resData = (
          await axios.get("http://localhost:5000/api/users/getallusers")
        ).data;
        console.log(resData);
        setUsers(resData);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
        setError(true);
      }
    })();
  }, []);
  return (
    <div>
      {loading && <Loading />}
      {users ? (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg mx-3">
          <table className="w-full text-sm text-left rtl:text-right text-gray-900 dark:text-gray-200">
            <thead className="text-xs uppercase bg-slate-500 text-white">
              <tr>
                <th scope="col" className="px-3 py-4 text-center">
                  Serial No.
                </th>
                <th scope="col" className="px-6 py-4">
                  Name
                </th>
                <th scope="col" className="px-6 py-4">
                  Email id
                </th>
                <th scope="col" className="px-6 py-4">
                  User id
                </th>
                <th scope="col" className="px-6 py-4">
                  User type
                </th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, i) => {
                return (
                  <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                    <td className="px-3 py-4 text-center">{i + 1}</td>
                    <td className="px-6 py-4">
                      <strong>{user.name}</strong>
                    </td>
                    <td className="px-6 py-4">{user.email}</td>
                    <td className="px-6 py-4">{user._id}</td>
                    <td className="px-6 py-4">
                      {user.isAdmin ? "Admin" : "Normal"}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <Error message="Something went wrong!! Please try again." />
      )}
    </div>
  );
};
export const Addrooms = () => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState();
  const [contactNumber, setContactNumber] = useState();
  const [maxAllowed, setMaxAllowed] = useState();
  const [rentPerDay, setRentPerDay] = useState();
  const [type, setType] = useState();
  const [description, setDescription] = useState();
  const [imageUrl1, setImageUrl1] = useState();
  const [imageUrl2, setImageUrl2] = useState();
  const [imageUrl3, setImageUrl3] = useState();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  async function addRoom() {
    const newRoom = {
      name,
      address,
      contactNumber,
      maxAllowed,
      rentPerDay,
      type,
      description,
      imageUrls: [imageUrl1, imageUrl2, imageUrl3],
    };
    try {
      setLoading(true);
      const resData = (
        await axios.post("http://localhost:5000/api/rooms/addnewroom", newRoom)
      ).data;
      console.log(resData);
      Swal.fire(
        "Congratulation!",
        "Your new room added successfully.",
        "success"
      ).then(() => {
        window.location.href = "/home";
      });
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
      setError(true);
      Swal.fire("Oops.", "Something went wrong. Please try again.", "error");
    }
  }
  return (
    <div className=" bg-slate-50 mx-4 rounded-md p-4">
      {loading && <Loader />}
      {/* Input fields */}
      <div className="font-bold text-[16px] h-[30px] mb-2 text-center bg-slate-600 w-1/2 mx-auto rounded-sm text-white">Enter Room details</div>
      <div className="flex">
        <div className="flex flex-col w-1/2 p-6">
          Room name
          <input
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-primary-600 focus:border-primary-600 block w-full p-1 mb-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
            placeholder="Type Room name"
            required={true}
          />
          Address
          <input
            type="text"
            name="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-primary-600 focus:border-primary-600 block w-full p-1 mb-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
            placeholder="Type address"
            required={true}
          />
          Contact Number
          <input
            type="number"
            name="contactNumber"
            value={contactNumber}
            onChange={(e) => setContactNumber(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-primary-600 focus:border-primary-600 block w-full p-1 mb-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
            placeholder="Type number"
            required={true}
          />
          Max. persons allowed
          <input
            type="number"
            name="maxAllowed"
            value={maxAllowed}
            onChange={(e) => setMaxAllowed(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-primary-600 focus:border-primary-600 block w-full p-1 mb-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
            placeholder="Type max number of person"
            required={true}
          />
          Rent per day
          <input
            type="number"
            name="rentPerDay"
            value={rentPerDay}
            onChange={(e) => setRentPerDay(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-primary-600 focus:border-primary-600 block w-full p-1 mb-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
            placeholder="Type number"
            required={true}
          />
        </div>
        <div className="flex flex-col w-1/2 p-6 border-l-double border-l border-l-gray-400">
          Room type
          <select
            name="type"
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-primary-600 focus:border-primary-600 block w-full p-1 mb-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
            required={true}
          >
            <option value="Deluxe">Deluxe</option>
            <option value="Non deluxe">Non deluxe</option>
          </select>
          Description
          <textarea
            id="description"
            rows="3"
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
            placeholder="Your description here"
          ></textarea>
          Room image URLs
          <input
            type="text"
            value={imageUrl1}
            onChange={(e) => setImageUrl1(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-primary-600 focus:border-primary-600 block w-full p-1 mb-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
            placeholder="Type image URL 1"
            required={true}
          />
          <input
            type="text"
            value={imageUrl2}
            onChange={(e) => setImageUrl2(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-primary-600 focus:border-primary-600 block w-full p-1 mb-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
            placeholder="Type image URL 2"
            required={true}
          />
          <input
            type="text"
            value={imageUrl3}
            onChange={(e) => setImageUrl3(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-primary-600 focus:border-primary-600 block w-full p-1 mb-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
            placeholder="Type image URL 3"
            required={true}
          />
        </div>
      </div>
      {/* Submit button */}
      <div className="flex justify-center">
        <button
          onClick={addRoom}
          className="bg-slate-800 active:bg-white active:text-black active:border active:border-black text-white py-[5px] px-[16px] mb-3 rounded"
        >
          Add room
        </button>
      </div>
    </div>
  );
};
