import logo from '../../img/logo.png';
import React from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch } from '../../redux/store';
import { logout } from '../../redux/AuthSlice';

const Navbar: React.FC = () => {
    const dispatch = useAppDispatch();
    const isMobile = window.innerWidth <= 767;

    return (
        <nav className="border-b-4 border-gray-200 p-4 w-full font-[Vollkorn]">
            <div className="container space-x-4 mx-auto flex md:justify-between md:items-center">
                <div className="text-white w-16 h-6 text-lg font-bold ml-6 md:w-32 md:h-14">
                    <Link to="/student/dashboard">
                        <img src={logo} alt="Logo" />
                    </Link>
                </div>

                <div className="space-x-4  font-semibold md:mr-20 md:pr-16 md:font-extrabold md:space-x-16">
                    <Link
                        to="/student/courses"
                        className={`text-black pr-2 border-r-2 border-black md:border-none hover:text-gray-400 ${isMobile ? 'mobile-link' : ''}`}
                    >
                        Kurslarım
                    </Link>
                    <Link
                        to="/student/dashboard"
                        className={`text-black pr-2 border-r-2 border-black md:border-none hover:text-gray-400 ${isMobile ? 'mobile-link' : ''}`}
                    >
                        Anasayfa
                    </Link>

                    <Link
                        to="/login"
                        className={`text-black hover:text-gray-400 ${isMobile ? 'mobile-link' : ''}`}
                        onClick={() => dispatch(logout())}
                    >
                        Oturumu Kapat
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
