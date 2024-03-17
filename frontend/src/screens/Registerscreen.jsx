import React, { useState } from "react";
import axios from "axios";
import { Loading } from "../components/Loading";
import { Error } from "../components/Error";
import { Success } from "../components/Success";

function Registerscreen() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const [success, setSuccess] = useState();

  async function register() {
    if (password === cpassword) {
      const user = {
        name,
        email,
        password,
        cpassword,
      };
      try {
        setLoading(true);
        const resData = (
          await axios.post("http://localhost:5000/api/users/register", user)
        ).data; //Extracting data from res object
        setLoading(false);
        setSuccess(true);

        setName('');
        setEmail('');
        setPassword('');
        setCpassword('');

      } catch (error) {
        console.log(error);
        setLoading(false);
        setError(true);
      }
    } else {
      alert("Password not matched.");
    }
  }

  return (
    <div className="mt-8">
      {loading && <Loading />}
      {error && <Error />}
      <form className="relative space-y-2 rounded-md bg-white shadow-xl py-6 px-3 lg:p-8 border border-gray-100 mx-auto w-[400px]">
        {success && <Success message='Registeration successful!!' />}
        <h1 className="text-lg font-semibold lg:text-xl ">Register</h1>
        <p className=" text-gray-500">Register here to create a account</p>
        <div>
          <label className=""> Name </label>
          <input
            type="text"
            placeholder="Name"
            className="mt-1 h-8 w-full rounded-md bg-gray-100 px-3 outline-none focus:ring-blue-400"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </div>
        <div>
          <label className=""> Email Address </label>
          <input
            type="email"
            placeholder="Info@example.com"
            className="mt-1 h-8 w-full rounded-md bg-gray-100 px-3 outline-none focus:ring-blue-400"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>
        <div>
          <label className=""> Password </label>
          <input
            type="password"
            placeholder="******"
            className="mt-1 h-8 w-full rounded-md bg-gray-100 px-3 outline-none focus:ring-blue-400"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
        <div>
          <label className=""> Confirm Password </label>
          <input
            type="password"
            placeholder="******"
            className="mt-1 h-8 w-full rounded-md bg-gray-100 px-3 outline-none focus:ring-blue-400"
            value={cpassword}
            onChange={(e) => {
              setCpassword(e.target.value);
            }}
          />
        </div>
        <div>
          <button
            type="button"
            className="my-2 w-full rounded-md bg-blue-900 p-2 text-center font-semibold text-white outline-none focus:ring"
            onClick={register}
          >
            Create your account
          </button>
        </div>
      </form>
    </div>
  );
}
export default Registerscreen;
