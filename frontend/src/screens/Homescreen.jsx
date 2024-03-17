/* eslint-disable react/jsx-key */
import { React, useEffect, useState } from 'react'
import axios from 'axios'
import { Room } from '../components/Room';
import { Loading } from '../components/Loading';
import { Error } from '../components/Error';

function Homescreen() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState();
  const [error, setError] = useState();

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const data = (await axios.get('http://localhost:5000/api/rooms/getallrooms')).data; //data? extracting data from res object
        setRooms(data);
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
    <div id='home-screen' className='flex justify-end w-full  '>
      <div id='room-container' className='flex flex-col content-evenly w-2/3 px-3 border-l'>
        {loading ?
          (<Loading />)
          : (rooms.length > 0) ?                //if loading is false => Check response from apicall got or not??
              (rooms.map(room => {
              return <Room room={room} />
              }))
            : (<Error />)    
        }
      </div>
    </div>
  );
}

export default Homescreen