"use client";

import Link from 'next/link';
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/states/store'; 
import { logout } from '@/features/auth';
import { useRouter } from 'next/navigation';

function Navbar() {
    const dispatch = useDispatch();
    const user = useSelector((state: RootState) => state.user);
    const router = useRouter();

    useEffect(() => {
        if (!user.isAuthenticated) {
            router.push('/sign-up');
        }
    }, [user.isAuthenticated, router]); 

    const handleLogout = () => {
        dispatch(logout());
    };

    return (
        <nav className='p-4 md:p-6 shadow-md'>
            <div className='container mx-auto flex sm:flex-col md:flex-row justify-between items-center'>
                <Link  className='text-xl font-bold mb-4 md:mb-0' href={"/"}>Quadb Tech</Link>
                {user?.isAuthenticated ? (
                    <>
                        <span className='mr-4'>Welcome, {user.name || user.email}</span>
                        <button 
                            className='sm:w-full md:w-auto bg-cyan-500 px-4 py-2 rounded-2xl cursor-pointer text-white dark:text-black' 
                            onClick={handleLogout}
                        >
                            Logout
                        </button>
                    </>
                ) : (
                    <Link href={'/sign-up'}>
                        <button className='w-full md:w-auto bg-cyan-500 px-4 py-2 rounded-2xl cursor-pointer text-white dark:text-black'>
                            Login
                        </button>
                    </Link>
                )}
            </div>
        </nav>
    );
}

export default Navbar;
