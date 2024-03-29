import { React, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Loading } from "../components/Loading";
import { Error } from "../components/Error";
import moment from "moment";
import StripeCheckout from "react-stripe-checkout";
import Swal from "sweetalert2";
import { server_url } from '../assets/envVariables'


function Booknowscreen() {
  let { roomId, fromDate, toDate } = useParams(); //returns obj from the url
  const [room, setRoom] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  const [totalAmount, setTotalAmount] = useState();

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
          `${server_url}/api/rooms/getroombyid`,
          { roomId: roomId }
        );
        setRoom(res.data);
        setTotalAmount(res.data.rentPerDay * totalDays);
        setLoading(false);
      } catch (error) {
        setError(true);
        console.log(error);
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  async function onToken(token) {
    const bookingDetails = {
      room,
      userId: JSON.parse(localStorage.getItem("currentUser"))._id,
      fromDate,
      toDate,
      totalAmount,
      totalDays,
      token,
    };
    try {
      setLoading(true);
      const result = await axios.post(
        `${server_url}/api/bookings/bookroom`,
        bookingDetails
      );
      Swal.fire(
        "Congratulations!",
        "Your room booked successfully",
        "success"
      ).then((result) => {
        window.location.href = "/myaccount";
      });
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
      Swal.fire("Oops!!!", "Something went wrong...", "error");
    }
  }
  return (
    <>
      <div className="w-full m-3 px-8 py-4 bg-slate-50 shadow-lg">
        {loading ? (
          <Loading />
        ) : room ? (
          <div>
            <div id="booknowScreen" className="text-sm">
              <header>
                <p className="text-xl font-bold text-center">Booking details</p>
                <hr className="border-black border-[0.4px] h-[2px] m-3" />
              </header>
              <div className="flex justify-evenly m-4">
                <div className="w-2/5 px-4">
                  <p>
                    <strong>Details </strong>
                  </p>
                  <hr className="w-4/5 mb-2" />
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
                  <hr className="w-4/5 mb-2" />
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
                    {totalAmount} Rs only
                  </p>
                  <StripeCheckout
                    currency="INR"
                    amount={totalAmount * 100}
                    token={onToken}
                    stripeKey="pk_test_51OwDqpSD77LA0xvVGhF9yv6NO6c0zr24ByvCrRTAzseUDfpCwvMwUtsDJB7n5xrvGv1Y9ktuuiTxGaGPlLMj4fLL006OVhFWdU"
                  >
                    <button className="my-6 bg-gray-800 active:bg-white active:text-black active:border active:border-black text-white font-bold py-[4px] px-[10px] rounded">
                      Pay Now
                    </button>
                  </StripeCheckout>
                </div>
                <div className="w-3/5 px-4 border-l border-gray-300">
                  <h3 className="text-[16px] font-bold">{room.name}</h3>
                  <p> {room.address}</p>
                  <div className="flex">
                    <div>
                      <div className="p-2">
                        <img
                          src={room.imageUrls[0]}
                          alt="hotel image"
                          className="h-[220px] w-[280px] shadow-md border border-gray-400"
                        />
                      </div>
                    </div>
                    <div className="ps-10 pt-4">
                      <p>
                        <strong>Facilities </strong>
                      </p>
                      <hr className="w-4/5 mb-3" />
                      <ul className="grid grid-cols-1 gap-3 w-full list-disc">
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
