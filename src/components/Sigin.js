import React, { useState, useEffect } from 'react';
import Base from '../assests/seo-performance-graphic-in-a-circle_icon-icons.com_53778.png';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';
import { GoogleLogin, useGoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import Vector from '../assests/Vector 7.png';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Sigin() {
    const navigate = useNavigate();
    const [user, setUser] = useState([]);
    const [profile, setProfile] = useState([]);
    const login = useGoogleLogin({
        onSuccess: (codeResponse) => setUser(codeResponse),
        onError: (error) => console.log('Login Failed:', error)
    });
    useEffect(
        () => {
            if (user) {
                axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
                    headers: {
                        Authorization: `Bearer ${user.access_token}`,
                        Accept: 'application/json'
                    }
                })
                    .then((res) => {
                        console.log(res)
                        setProfile(res.data);
                        navigate('/home', {state: res.data})
                    })
                    .catch((err) => console.log(err));
            }
        },
        [user]
    );
    return (
        <div>
            <div className="App" class='flex justify-center items-center lg-flex'>
                <div class='sideTrap'>
                    <div class='h-1/6 flex p-6'>
                        <div class='w-24 h-24 bg-white rounded-full flex items-center'>
                            <img class='w-28' src={Vector} alt='Vector' />
                        </div>
                    </div>

                    <div class='h-4/6 flex items-center justify-center pr-44 pb-16'>
                        <h1 class='text-8xl text-white font-bold'>BASE</h1>
                    </div>

                    <div class='h-1/6 flex items-center justify-center pr-48 space-x-16'>
                        <GitHubIcon style={{ color: 'white', width: '2em', height: '2em' }} />
                        <LinkedInIcon style={{ color: 'white', width: '2em', height: '2em' }} />
                        <TwitterIcon style={{ color: 'white', width: '2em', height: '2em' }} />
                        <img style={{ width: '3em', height: '3em' }} src="https://img.icons8.com/material/24/FFFFFF/discord-logo--v1.png" alt="discord-logo--v1" />
                    </div>
                </div>

                <div class='lg:w-ful xl:max-w-screen-lg' style={{ background: 'white', width: '50%', height: '100vh' }}>
                    <div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
                        <div class="sm:mx-auto sm:w-full sm:max-w-sm">
                            <h1 class="mt-10 text-left text-4xl font-bold leading-9 tracking-tight text-gray-900">Sign in</h1>
                            <h2 class="mt-2 mb-2 text-left text-1xl font-medium leading-9 tracking-tight text-gray-900">Sign in to your account</h2>
                        </div>

                        <div class='flex items-center justify-center'>
                            <button onClick={login} type="button" class="text-white bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#4285F4]/55 me-2 mb-2">
                                <svg class="w-4 h-4 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 19">
                                    <path fill-rule="evenodd" d="M8.842 18.083a8.8 8.8 0 0 1-8.65-8.948 8.841 8.841 0 0 1 8.8-8.652h.153a8.464 8.464 0 0 1 5.7 2.257l-2.193 2.038A5.27 5.27 0 0 0 9.09 3.4a5.882 5.882 0 0 0-.2 11.76h.124a5.091 5.091 0 0 0 5.248-4.057L14.3 11H9V8h8.34c.066.543.095 1.09.088 1.636-.086 5.053-3.463 8.449-8.4 8.449l-.186-.002Z" clip-rule="evenodd" />
                                </svg>
                                Sign in with Google
                            </button>
                            <button type="button" class="text-white bg-[#050708] hover:bg-[#050708]/90 focus:ring-4 focus:outline-none focus:ring-[#050708]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#050708]/50 dark:hover:bg-[#050708]/30 me-2 mb-2">
                                <svg class="w-4 h-4 me-2" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="apple" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" >
                                    <path fill="currentColor" d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" />
                                </svg>
                                Sign in with Apple
                            </button>
                        </div>


                        <div class="mt-6 sm:mx-auto sm:w-full sm:max-w-sm border-solid border-2 rounded-md shadow-md border-aqua-500 p-8">
                            <form class="space-y-6" action="#" method="POST">
                                <div>
                                    <div class="flex items-center justify-between">
                                        <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Email address</label>
                                    </div>
                                    <div class="mt-2">
                                        <input id="email" name="email" type="email" autocomplete="email" required class="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1" placeholder="you@example.com" />
                                    </div>
                                </div>

                                <div>
                                    <div class="flex items-center justify-between">
                                        <label for="password" class="block text-sm font-medium leading-6 text-gray-900">Password</label>
                                    </div>
                                    <div class="mt-2">
                                        <input id="password" name="password" type="password" autocomplete="current-password" required class="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1" placeholder="**********" />
                                    </div>
                                    <div class="flex items-center justify-between">
                                        <a href="#" class="font-semibold text-indigo-600 hover:text-indigo-500">Forgot password?</a>
                                    </div>
                                </div>

                                <div>
                                    <button type="submit" class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign in</button>
                                </div>
                            </form>

                            <p class="mt-10 text-center text-sm text-gray-500">
                                Don't have an account?
                                <a href="#" class="ml-1 font-semibold leading-6 text-indigo-600 hover:text-indigo-500">Register here</a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
