import React, {useEffect, useState} from 'react'
import axios from 'axios'

function Homescreen() {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:5000/api/rooms/getallrooms')
      .then(data => { setRooms(data.data);
    console.log(data.data)})
      .catch(err => console.log(err));
  }, []);

  return (
    <div className="App">
      <h1 className='text-center'>{rooms.length}</h1>
    </div>
  );
}

export default Homescreen