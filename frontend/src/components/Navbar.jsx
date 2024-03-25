import { Link } from "react-router-dom";
import { Dropdown } from "flowbite-react";

function Navbar() {
  const user = JSON.parse(localStorage.getItem("currentUser"));
  function logout() {
    localStorage.removeItem("currentUser");
    window.location.href = '/login';
  }
  return (
    <nav className="bg-gray-900">
      <div className="flex flex-wrap items-center justify-between p-3">
        <div>
        <a href="/" className="flex items-center">
          <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">
            BookMyRoom
          </span>
        </a>
        </div>
        <div id="navbar-default">
          <ul className="flex font-medium">
            {user ? (
              <>
                <li className="mr-2">
                  <Dropdown
                    label=""
                    className='bg-gray-950 text-white'
                    dismissOnClick={false}
                    renderTrigger={() => (
                      <div className="text-white hover:text-blue-600">
                        <span className="material-icons text-[25px]">
                          account_circle
                        </span>
                        <span className="align-top">{user.name}</span>
                      </div>
                    )}
                  >
                    <Dropdown.Item as="a" href='/home' className="text-white hover:text-black">Home</Dropdown.Item>
                    <Dropdown.Item as='a' href='/myaccount' className="text-white hover:text-black">My Account</Dropdown.Item>
                    <Dropdown.Item as="a" href='#' onClick={logout} className="text-white hover:text-black">Logout</Dropdown.Item>
                  </Dropdown>
                </li>
              </>
            ) : (
              <>
                <li>
                  <a
                    href="/home"
                    className="block py-2 px-3 text-white md:border-0 hover:text-blue-700"
                  >
                    Home
                  </a>
                </li>
                <li>
                  <a
                    href="/register"
                    className="block py-2 px-3 text-white md:border-0 hover:text-blue-700"
                  >
                    Register
                  </a>
                </li>
                <li>
                  <a
                    href="/login"
                    className="block py-2 px-3 text-white md:border-0 hover:text-blue-700"
                  >
                    Login
                  </a>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
export default Navbar;
