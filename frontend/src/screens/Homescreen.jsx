import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Room } from '../components/Room';

function Homescreen() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState();
  const [error, setError] = useState();

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const data = (await axios.get('http://localhost:5000/api/rooms/getallrooms')).data;
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
    <div id='home-screen' className='flex justify-end w-full'>
      <div id='room-container' className='flex flex-col content-evenly w-2/3 px-3 border-l'>
        {loading ?
          (<h1>Loading...</h1>)
          : error ?
            (<h1>Error...</h1>)
            : (rooms.map(room => {
              return <Room room={room} />
            }))
        }
      </div>
    </div>
  );
}

export default Homescreen