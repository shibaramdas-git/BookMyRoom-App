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
  const [duplicateRooms, setDuplicateRooms] = useState([]);

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

  return (
    <div id="home-screen" className="flex justify-end w-full ">
      <div id="searchBar mx-auto w-4/5 p-0">
        Select booking date
        <RangePicker
          format="DD-MM-YYYY"
          className="bg-white"
          onChange={filterByDate}
        />
      </div>
      <div
        id="room-container"
        className="flex flex-col content-evenly w-2/3 px-3 border-l"
      >
        {loading ? (
          <Loading />
        ) : rooms.length > 0 ? ( //if loading is false => Check response from apicall got or not??
          rooms.map((room) => {
            return <Room room={room} fromDate={fromDate} toDate={toDate} />;
          })
        ) : (
          <Error />
        )}
      </div>
    </div>
  );
}

export default Homescreen;
