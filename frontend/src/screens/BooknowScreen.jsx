import { React, useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { Loading } from '../components/Loading';
import { Error } from '../components/Error';

function Booknowscreen() {
  let { roomid } = useParams();               //returns obj
  const [room, setRoom] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const res = await axios.post('http://localhost:5000/api/rooms/getroombyid', { roomid: roomid });
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


  return (
    <>
      <div className='w-9/10'>
        {loading? (<Loading />) : room ? (<div>         {/*if loading is false = Check response room from apicall got or not??*/}
          <div id='booknowScreen' className='text-sm'>
            <header>
              <p className='text-lg font-bold text-center'>Booking details</p>
              <hr className='border-black border-[0.4px] h-[2px]' />
            </header>
            <div className='flex justify-around'>
              <div className='w-2/5'>
                <p><strong>Name : </strong></p>
                <p><strong>From date : </strong></p>
                <p><strong>To date : </strong></p>
                <p><strong>Max. person allowed : </strong></p>
                <br />
                <p><strong>Pricing </strong></p>
                <hr className='w-1/2' />
                <p><strong>Rent per day : </strong>{room.rentPerDay} Rs</p>
                <p><strong>Total days : </strong></p>
                <p><strong>Total amount : </strong></p>
                <button className='bg-gray-800 active:bg-white active:text-black active:border active:border-black text-white font-bold py-[4px] px-[10px] rounded mr-2'>Pay Now</button>

              </div>
              <div className='w-3/5'>
                <h3 className='text-[18px] font-bold'>{room.name}</h3>
                <p>{room.address}</p>
                <div className='p-2'>
                  <img src={room.imageUrls[0]} alt="hotel image" className='h-[150px] w-full' />
                </div>
                <p><strong>Facilities</strong></p>
                <ul className='grid grid-cols-3 w-full'>
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
        </div>) : <Error /> }
      </div>
    </>
  )
}

export default Booknowscreen;