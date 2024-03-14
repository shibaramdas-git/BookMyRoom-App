export const Navbar = () => {
    return (
        <nav className="bg-gray-900 border-gray-200">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                    <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">BookMyRoom</span>
                </a>
                <div className="hidden w-full md:block md:w-auto" id="navbar-default">
                    <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg md:flex-row md:space-x-8 md:mt-0 md:border-0">
                        <li>
                            <a href="#" className="block py-2 px-3 text-white md:border-0 hover:text-blue-700 md:p-0">About</a>
                        </li>
                        <li>
                            <a href="#" className="block py-2 px-3 text-white md:border-0 hover:text-blue-700 md:p-0">Register</a>
                        </li>
                        <li>
                            <a href="#" className="block py-2 px-3 text-white md:border-0 hover:text-blue-700 md:p-0">Login</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}
