import { React, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Loading } from "../components/Loading";
import { Error } from "../components/Error";
import moment from "moment";

function Booknowscreen() {
  let { roomId, fromDate, toDate } = useParams(); //returns obj from the url
  const [room, setRoom] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  //calculating diff. using moment.js
  const fromDateInMoment = moment(fromDate, "DD-MM-YY");
  const toDateInMoment = moment(toDate, "DD-MM-YY");
  const totalDays =
    moment.duration(toDateInMoment.diff(fromDateInMoment)).asDays() + 1; //refer moment.js doc.

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const res = await axios.post(
          "http://localhost:5000/api/rooms/getroombyid",
          { roomId: roomId }
        );
        setRoom(res.data);
        console.log(room);
        setLoading(false);
      } catch (error) {
        setError(true);
        console.log(error);
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  async function bookingDetails() {
    const bookingDetails = {
      room,
      userId: JSON.parse(localStorage.getItem("currentUser"))._id,
      fromDate,
      toDate,
      totalAmount: totalDays * room.rentPerDay,
      totalDays
    }
    try {
      const resData = (await axios.post('http://localhost:5000/api/bookings/bookroom', bookingDetails)).data
    } catch (error) {
      console.error(error);
    }
    
  }
  return (
    <>
      <div className="w-9/10">
        {loading ? (
          <Loading />
        ) : room ? (
          <div>
            {" "}
            {/*if loading is false => Check response(room) from apicall got or not??*/}
            <div id="booknowScreen" className="text-sm">
              <header>
                <p className="text-lg font-bold text-center">Booking details</p>
                <hr className="border-black border-[0.4px] h-[2px]" />
              </header>
              <div className="flex justify-around">
                <div className="w-2/5">
                  <p>
                    <strong>Name : </strong>
                    {JSON.parse(localStorage.getItem("currentUser")).name}
                  </p>
                  <p>
                    <strong>From date : </strong>
                    {fromDate}
                  </p>
                  <p>
                    <strong>To date : </strong>
                    {toDate}
                  </p>
                  <p>
                    <strong>Max. person allowed : </strong>
                    {room.maxAllowed}
                  </p>
                  <br />
                  <p>
                    <strong>Pricing </strong>
                  </p>
                  <hr className="w-1/2" />
                  <p>
                    <strong>Rent per day : </strong>
                    {room.rentPerDay} Rs
                  </p>
                  <p>
                    <strong>Total days : </strong>
                    {totalDays} Days
                  </p>
                  <p>
                    <strong>Total amount : </strong>
                    {totalDays * room.rentPerDay} Rs only
                  </p>
                  <button onClick={bookingDetails} className="bg-gray-800 active:bg-white active:text-black active:border active:border-black text-white font-bold py-[4px] px-[10px] rounded mr-2">
                    Pay Now
                  </button>
                </div>
                <div className="w-3/5">
                  <h3 className="text-[18px] font-bold">{room.name}</h3>
                  <p>{room.address}</p>
                  <div className="p-2">
                    <img
                      src={room.imageUrls[0]}
                      alt="hotel image"
                      className="h-[150px] w-full"
                    />
                  </div>
                  <p>
                    <strong>Facilities</strong>
                  </p>
                  <ul className="grid grid-cols-3 w-full">
                    <li>Free Wifi</li>
                    <li>Daily housekeeping</li>
                    <li>Air conditioning</li>
                    <li>Safety deposit box</li>
                    <li>Non-smoking rooms</li>
                    <li>24-hour front desk</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <Error />
        )}
      </div>
    </>
  );
}

export default Booknowscreen;
