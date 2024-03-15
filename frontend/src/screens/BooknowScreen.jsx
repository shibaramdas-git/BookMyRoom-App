import {React, useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

export const BooknowScreen = () => {
  const { roomid } = useParams();               //returns obj
  const [room, setRoom] = useState();
  const [loading, setLoading] = useState();
  const [error, setError] = useState();

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const data = (await axios.post('http://localhost:5000/api/rooms/getroombyid', roomid)).data;
        setRoom(data);
        setLoading(false);

      } catch (error) {
        setError(true);
        console.log(error);
        setLoading(false);

      }
    }
    fetchData();
  }, [roomid]);
  return (
    <div>Booknow Screen
      <h1>Room id </h1>
      
        




    </div>
  )
}
