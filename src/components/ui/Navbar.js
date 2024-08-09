import {
    Menu,
    MenuButton,
    MenuItems,
    MenuItem,
} from "@headlessui/react";
import stickyNoteIcon from "../../utils/icons/sticky-note.svg";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import userProfile from "../../utils/icons/user-profile.svg";

export default function Navbar() {
    // const [loggedIn, setLoggedIn] = useState(localStorage.getItem('loggedIn')==='true');

    // useEffect(() => {
    //     setLoggedIn(localStorage.getItem("loggedIn")==='true');
    // }, [setLoggedIn])
    const loggedIn = 'true';

    return (
        <nav className="bg-gray-800 max-h-[64px]">
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                <div className="relative flex h-16 items-center justify-between">
                    {/* Left side: Sticky Note Icon */}
                    <div className="flex items-center">
                        <Link to="/dashboard">
                            <img
                                alt="Your Company"
                                src={stickyNoteIcon}
                                className="h-12 w-auto"
                            />
                        </Link>
                    </div>

                    {/* Center: Dashboard Link */}
                    <div className="flex flex-1 items-center justify-center">
                        <Link
                            to="/dashboard"
                            aria-current="page"
                            className="bg-gray-900 text-white rounded-md px-3 py-2 text-lg font-medium">
                            Dashboard
                        </Link>
                    </div>

                    {/* Right side: Profile Dropdown */}
                    <div className="flex items-center space-x-4">
                        <Menu as="div" className="relative">
                            <div>
                                <MenuButton className="relative flex rounded-full bg-gray-800 text-sm">
                                    <span className="sr-only">Open user menu</span>
                                    <img
                                        src={
                                            loggedIn
                                                ? "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                                : userProfile
                                        }
                                        alt={
                                            loggedIn
                                                ? ""
                                                : "user-profile"
                                        }
                                        className="h-10 w-10 rounded-full"
                                    />
                                </MenuButton>
                            </div>
                            {loggedIn ? (
                                <MenuItems
                                transition
                                className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-gray-700 py-1 shadow-lg ring-1 ring-black ring-opacity-5 transition-transform transform-gpu duration-200 ease-out">
                                <MenuItem>
                                    <Link
                                        to="/dashboard"
                                        className="block px-4 py-2 text-lg text-gray-100 hover:bg-gray-600 border-b border-gray-600 last:border-b-0">
                                        Your Profile
                                    </Link>
                                </MenuItem>
                                <MenuItem>
                                    <Link
                                        to="/dashboard"
                                        className="block px-4 py-2 text-lg text-gray-100 hover:bg-gray-600 border-b border-gray-600 last:border-b-0">
                                        Settings
                                    </Link>
                                </MenuItem>
                                <MenuItem onClick={() => localStorage.setItem('loggedIn', 'false')}>
                                    <Link
                                        to="/"
                                        className="block px-4 py-2 text-lg text-gray-100 hover:bg-gray-600 border-b border-gray-600 last:border-b-0">
                                        Sign out
                                    </Link>
                                </MenuItem>
                            </MenuItems>
                            ) : (
                            <MenuItems
                                transition
                                className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-gray-700 py-1 shadow-lg ring-1 ring-black ring-opacity-5 transition-transform transform-gpu duration-200 ease-out">
                                <MenuItem>
                                    <Link
                                        to="/Signin"
                                        className="block px-2 py-2 text-lg text-gray-100 hover:bg-gray-600 border-b border-gray-600 last:border-b-0">
                                        Sign in
                                    </Link>
                                </MenuItem>
                                <MenuItem>
                                    <Link
                                        to="/signup"
                                        className="block px-2 py-2 text-lg text-gray-100 hover:bg-gray-600 border-b border-gray-600 last:border-b-0">
                                        Sign up
                                    </Link>
                                </MenuItem>
                            </MenuItems>
                            
                            )}
                        </Menu>
                    </div>
                </div>
            </div>
        </nav>
    );
}
