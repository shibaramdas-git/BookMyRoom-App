import React, {useState} from "react";
import axios from 'axios'
import { Loading } from "../components/Loading";
import { Error } from "../components/Error";

function Loginscreen() {
  const[email, setEmail] = useState('');
  const[password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  async function login() {
      const user = {
        email,
        password
      }
      try {
        setLoading(true);
        const resData = (await axios.post('http://localhost:5000/api/users/login', user)).data   //data? extracting data from res object
        setLoading(false);

        localStorage.setItem('currentUser', JSON.stringify(resData));   //In localStorage we can't store - Arrays, Object.
        window.location.href = '/home'; 

      } catch (error) {
        console.log(error);
        setLoading(false);
        setError(true);
      }
  }
  
  return (
    <div>
      {loading && <Loading />}
      <form className="relative space-y-2 rounded-md bg-white p-4 shadow-xl lg:p-10 border border-gray-100 mt-8 mx-auto w-[400px]">
        {error && <Error message='Invalid Credentials! Try again.' />}
        <h1 className="text-xl font-semibold lg:text-2xl">Login</h1>
        <p className="pb-4 text-gray-500">login here to access your account</p>
        <div className="">
          <label className=""> Email Address </label>
          <input
            type="email"
            placeholder="Info@example.com"
            className="mt-1 h-10 w-full rounded-md bg-gray-100 px-3 outline-none focus:ring-blue-400"
            value={email} onChange={(e) => {setEmail(e.target.value)}}
          />
        </div>
        <div>
          <label className=""> Password </label>
          <input
            type="password"
            placeholder="******"
            className="mt-1 h-10 w-full rounded-md bg-gray-100 px-3 outline-none focus:ring-blue-400"
            value={password} onChange={(e) => {setPassword(e.target.value)}}
          />
        </div>
        <div>
          <button
            type="button"
            className="my-2 w-full rounded-md bg-blue-900 p-2 text-center font-semibold text-white outline-none focus:ring"
              onClick={login}
          >
            Login
          </button>
        </div>
        <div className="text-center">Not registered yet ? <a href="/register" className="hover:text-blue-500">Click here to register</a></div>
      </form>
    </div>
  );
}
export default Loginscreen;
