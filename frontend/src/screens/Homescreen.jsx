/* eslint-disable react/jsx-key */
import { React, useEffect, useState } from "react";
import axios from "axios";
import { Room } from "../components/Room";
import { Loading } from "../components/Loading";
import { Error } from "../components/Error";
import { DatePicker } from "antd";
const { RangePicker } = DatePicker;
import moment from "moment";

function Homescreen() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState();
  const [error, setError] = useState();
  const [fromDate, setFromDate] = useState();
  const [toDate, setToDate] = useState();
  const [duplicateRooms, setDuplicateRooms] = useState();
  const [searchKey, setSearchKey] = useState("");
  const [type, setType] = useState();

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const data = (
          await axios.get("http://localhost:5000/api/rooms/getallrooms")
        ).data; //data? extracting data from res object
        setRooms(data);
        setDuplicateRooms(data);
        setLoading(false);
      } catch (error) {
        setError(true);
        console.log(error);
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  function filterByDate(dates) {
    //RangePicker returns[] of dates in a complicated format
    setFromDate(moment(dates[0].$d).format("DD-MM-YYYY")); //  moment simplifies to -'dd-mm-yyy format
    setToDate(moment(dates[1].$d).format("DD-MM-YYYY")); //  dates[1].$d -- to get only date "dd-mm-yyyy"

    var tempRooms = [];
    var availability = false;
    for (const room of duplicateRooms) {
      if (room.currentBookings.length > 0) {
        for (const booking of room.currentBookings) {
          if (
            !moment(moment(dates[0].$d).format("DD-MM-YYYY")).isBetween(
              booking.fromDate,
              booking.toDate
            ) &&
            !moment(moment(dates[1].$d).format("DD-MM-YYYY")).isBetween(
              booking.fromDate,
              booking.toDate
            )
          ) {
            if (
              moment(dates[0].$d).format("DD-MM-YYYY") !== booking.fromDate &&
              moment(dates[0].$d).format("DD-MM-YYYY") !== booking.toDate &&
              moment(dates[1].$d).format("DD-MM-YYYY") !== booking.fromDate &&
              moment(dates[1].$d).format("DD-MM-YYYY") !== booking.toDate
            ) {
              availability = true;
            }
          }
        }
      }
      if (availability == true || room.currentBookings.length == 0) {
        tempRooms.push(room);
      }
      setRooms(tempRooms);
    }
  }

  function filterBySearch() {
    const tempRooms = duplicateRooms.filter((room) =>
      room.name.toLowerCase().includes(searchKey.toLowerCase())
    );
    setRooms(tempRooms);
  }

  function filterByType(e) {
    setType(e);
    if (e.target.value !== "All") {
      const tempRooms = duplicateRooms.filter(
        (room) => room.type.toLowerCase() == e.target.value.toLowerCase()
      );
      setRooms(tempRooms);
    } else {
      setRooms(duplicateRooms);
    }
  }
  return (
    <div id="home-screen" className="flex justify-end w-full pb-4">
      {/* Search section */}
      <div id="searchBar" className="w-1/4 p-5 bg-white m-3 rounded-lg h-fit">
        &nbsp;Select booking date
        <RangePicker
          format="DD-MM-YYYY"
          className="my-2 p-[7px] bg-gray-50"
          onChange={filterByDate}
        />
        <div>
          &nbsp;Search here
          <input
            type="search"
            id="search"
            class="w-full p-2 my-2 ps-3 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search here"
            value={searchKey}
            onChange={(e) => setSearchKey(e.target.value)}
            onKeyUp={filterBySearch}
          />
        </div>
        <div>
          &nbsp;Room type
          <select
            onChange={filterByType}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 my-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option value="All">All</option>
            <option value="Deluxe">Deluxe</option>
            <option value="Non deluxe">Non-Deluxe</option>
          </select>
        </div>
      </div>
      {/* Rooms section */}
      <div
        id="room-container"
        className="flex flex-col content-evenly w-3/4 px-3 border-l"
      >
        {loading ? (
          <Loading />
        ) : (
          rooms.map((room) => {
            return <Room room={room} fromDate={fromDate} toDate={toDate} />;
          })
        )}
      </div>
    </div>
  );
}

export default Homescreen;
