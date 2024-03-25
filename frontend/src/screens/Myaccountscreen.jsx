import React, { useEffect, useState } from "react";
import axios from "axios";
import { Loading } from "../components/Loading";
import { Error } from "../components/Error";

export default function Myaccountscreen() {
  const user = JSON.parse(localStorage.getItem("currentUser"));

  useEffect(() => {
    if (!user) {
      window.location.href = "/login";
    }
  }, []);

  return (
    <div className="flex-col justify-center">
      {/* Headings -1.profile 2.bookings */}
      <div className="flex justify-center mb-4 border-b-2 border-gray-200 dark:border-gray-700">
        <ul
          className="flex flex-wrap -mb-px text-sm font-medium text-center"
          id="default-tab"
          data-tabs-toggle="#default-tab-content"
          role="tablist"
        >
          <li className="me-2" role="presentation">
            <button
              className="inline-block p-4 border-b-[4px] rounded-t-lg hover:text-gray-600 hover:border-gray-400 dark:hover:text-gray-300"
              id="profile-tab"
              data-tabs-target="#profile"
              type="button"
              role="tab"
              aria-controls="profile"
              aria-selected="false"
            >
              My Account
            </button>
          </li>
          <li className="me-2" role="presentation">
            <button
              className="inline-block p-4 border-b-[4px] rounded-t-lg hover:text-gray-600 hover:border-gray-400 dark:hover:text-gray-300"
              id="dashboard-tab"
              data-tabs-target="#dashboard"
              type="button"
              role="tab"
              aria-controls="dashboard"
              aria-selected="false"
            >
              My Bookings
            </button>
          </li>
        </ul>
      </div>
      {/* Tab content */}
      <div id="default-tab-content">
        <div
          className="hidden mx-auto w-[400px] rounded-md dark:bg-gray-800 border border-black shadow-lg"
          id="profile"
          role="tabpanel"
          aria-labelledby="profile-tab"
        >
          <div className="h-[36px] w-full bg-slate-600 text-white font-bold m-0 text-center py-2 align-middle">
            Account details
          </div>
          <div className="py-4 pl-6">
            <p>
              <strong>
                Name&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;{" "}
              </strong>
              {user.name}
            </p>
            <p>
              <strong>
                Email&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;{" "}
              </strong>
              {user.email}
            </p>
            {user.isAdmin ? (
              <p>
                <strong>User type &nbsp;&nbsp;:&nbsp; </strong>Admin
              </p>
            ) : (
              <p>
                <strong>User type &nbsp;&nbsp;:&nbsp; </strong> Normal
              </p>
            )}
          </div>
        </div>
        <div
          className="hidden mx-auto w-[400px] min-w-[250px]"
          id="dashboard"
          role="tabpanel"
          aria-labelledby="dashboard-tab"
        >
          <Mybookings />
        </div>
      </div>
    </div>
  );
};

export const Mybookings = () => {
  const user = JSON.parse(localStorage.getItem("currentUser"));
  const [bookedRooms, setBookedRooms] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  useEffect(() => {
    (async function () {
      try {
        setLoading(true);
        const resData = (
          await axios.post(
            "http://localhost:5000/api/bookings/getbookingsbyuserid",
            { userId: user._id }
          )
        ).data;
        console.log(resData);
        setBookedRooms(resData);
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
      {bookedRooms &&
        bookedRooms.map((bookings) => {
          return (
            <div className="border border-gray-800 shadow-lg mb-4 mx-auto w-full rounded-md">
              <div className="h-[36px] w-full bg-slate-600 text-white font-bold m-0 text-center py-2 align-middle">
                {bookings.room}
              </div>
              <div className="p-3">
                <p>
                  <strong>
                    Check-in
                    date&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;
                  </strong>
                  {bookings.fromDate}
                </p>
                <p>
                  <strong>
                    Check-out
                    date&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;
                  </strong>
                  {bookings.toDate}
                </p>
                <p>
                  <strong>
                    Total days
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;
                  </strong>
                  {bookings.totalDays}
                </p>
                <p>
                  <strong>
                    Total
                    amount&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;
                  </strong>
                  {bookings.totalAmount}
                </p>
                <p>
                  <strong>
                    Booking
                    date&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;
                  </strong>
                  {bookings.createdAt}
                </p>
                <p>
                  <strong>
                    BookingId&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;
                  </strong>
                  {bookings._id}
                </p>
                <p>
                  <strong>
                    Booking
                    status&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;
                  </strong>
                  {bookings.status == "Booked" ? "Confirmed" : "Cancelled"}
                </p>
              </div>
              <div className='flex justify-center '>
              <button className="bg-slate-800 active:bg-white active:text-black active:border active:border-black text-white py-[4px] px-[6px] mb-3 rounded">
                Cancel booking
              </button>
              </div>
            </div>
          );
        })}
    </div>
  );
};
