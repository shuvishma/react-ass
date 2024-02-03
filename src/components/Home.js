import React, { useEffect, useState } from 'react';
import Vector from '../assests/Vector 8.png';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AssessmentSharpIcon from '@mui/icons-material/AssessmentSharp';
import DescriptionIcon from '@mui/icons-material/Description';
import EventNoteIcon from '@mui/icons-material/EventNote';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SettingsIcon from '@mui/icons-material/Settings';
import { FileUploadOutlined } from '@mui/icons-material';
import { readFile } from 'xlsx';
import Papa from 'papaparse';
import './Home.css';
import { useLocation } from 'react-router-dom';

export default function Home() {
    const location = useLocation();
    const [data, setData] = useState([]);
    const [temp, setTemp] = useState([]);
    const [column, setColumn] = useState(['id', 'links', 'prefix', 'select tags', 'selected tags']);
    const [values, setValues] = useState([]);
    const [hs, seths] = useState([]);
    const readExcel = (e) => {
        Papa.parse(e.target.files[0], {
            header: true,
            skipEmptyLines: true,
            complete: function (res) {
                const column = [];
                const valuesArr = [];
                res.data.map(d => {
                    column.push(Object.keys(d));
                    valuesArr.push(Object.values(d));
                })
                setData(res.data);
                setColumn(column[0]);
                setValues(valuesArr);
                console.log(column[0]);
                console.log(valuesArr);
            }
        })
    }
    useEffect(() => {
        console.log(values);
        console.log(hs)
    }, [values])
    const selectTags = (e, row) => {
        //seths(hs.map(item => item[row] === row ? {...item, value: [value, e.target.value]}:item))

        const updated = values.map((val, index) => {
            if (index === row) {
                val[4] = e.target.value;
                return val
            }
            return val;
        })
        setValues(updated)
    }
    return (
        <div>
            <button data-drawer-target="default-sidebar" data-drawer-toggle="default-sidebar" aria-controls="default-sidebar" type="button" class="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
                <span class="sr-only">Open sidebar</span>
                <svg class="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path clip-rule="evenodd" fill-rule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
                </svg>
            </button>

            <aside id="default-sidebar" class="fixed top-0 left-0 z-40 w-72 h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
                <div class="h-full px-3 py-4 overflow-y-auto bg-slate-50">
                    <div class='flex items-center justify-center p-4 pb-8'>
                        <div class='w-16 h-16 bg-[#4285F4] rounded-full flex items-center'>
                            <img class='w-18' src={Vector} alt='Vector' />
                        </div>
                    </div>
                    <ul class="space-y-2 p-4 font-large">
                        <li class='active:text-blue-500'>
                            <a href="#" class="flex items-center p-2 text-gray-900 rounded-lg hover:bg-[#4285F4]/90">
                                <DashboardIcon />
                                <span class="ms-3 text-lg text-gray-500">Dashboard</span>
                            </a>
                        </li>
                        <li>
                            <a href="#" class="flex items-center p-2 text-gray-900 rounded-lg hover:bg-[#4285F4]/90">
                                <AssessmentSharpIcon />
                                <span class="flex-1 text-lg ms-3 text-gray-500">Upoad</span>
                            </a>
                        </li>
                        <li>
                            <a href="#" class="flex items-center p-2 text-gray-900 rounded-lg hover:bg-[#4285F4]/90">
                                <DescriptionIcon />
                                <span class="flex-1 text-lg ms-3 text-gray-500">Invoice</span>
                            </a>
                        </li>
                        <li>
                            <a href="#" class="flex items-center p-2 text-gray-900 rounded-lg hover:bg-[#4285F4]/90">
                                <EventNoteIcon />
                                <span class="flex-1 text-lg ms-3 text-gray-500">Schedule</span>
                            </a>
                        </li>
                        <li>
                            <a href="#" class="flex items-center p-2 text-gray-900 rounded-lg hover:bg-[#4285F4]/90">
                                <CalendarMonthIcon />
                                <span class="flex-1 text-lg ms-3 text-gray-500">Calender</span>
                            </a>
                        </li>
                        <li>
                            <a href="#" class="flex items-center p-2 text-gray-900 rounded-lg hover:bg-[#4285F4]/90">
                                <NotificationsIcon />
                                <span class="flex-1 text-lg ms-3 text-gray-500">Notification</span>
                            </a>
                        </li>
                        <li>
                            <a href="#" class="flex items-center p-2 text-gray-900 rounded-lg hover:bg-[#4285F4]/90">
                                <SettingsIcon />
                                <span class="flex-1 text-lg ms-3 text-gray-500">Settings</span>
                            </a>
                        </li>
                    </ul>
                </div>
            </aside>


            <div class="p-12 sm:ml-64">
                <div class='w-full h-1/6 flex justify-between'>
                    <label class='text-4xl font-bold'>Upload CSV</label>
                    <div class='w-24 flex justify-between'>
                        <NotificationsIcon class='w-8' />
                        <div class="relative w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
                            <img src={location.state.picture} />
                            {/* <svg class="absolute w-10 h-10 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"></path></svg> */}
                        </div>
                    </div>
                </div>
                <div class="w-1/2 h-5/6 shadow-md border p-8 rounded-md mt-36 ml-96">
                    <label for="dropzone-file" class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer">
                        <div class="flex flex-col items-center justify-center pt-5 pb-6">
                            <img width="48" height="48" src="https://img.icons8.com/color/48/microsoft-excel-2019--v1.png" alt="microsoft-excel-2019--v1" />
                            <p class="mb-2 text-sm text-gray-500 dark:text-gray-400"><span class="font-semibold">Drop you excel sheet here or</span><a href="#" class="ml-1 font-semibold leading-6 text-indigo-600 hover:text-indigo-500">browse</a></p>
                        </div>
                        <input id="dropzone-file" type="file" accept='.csv' class="hidden" onChange={readExcel} />
                    </label>
                    <button type="button" class="text-white bg-[#4285F4] hover:bg-blue-800 focus:ring-4 focus:[#4285F4] font-medium rounded-lg w-full text-sm px-5 mt-4 py-2.5 dark:bg-[#4285F4] dark:hover:bg-[#4285F4] focus:outline-none dark:focus:ring-blue-800"><FileUploadOutlined />Upoad</button>
                </div>

                <div class='m-2 mb-3'>
                    <label class='text-2xl font-bold'>Upload</label>
                </div>



                <div class="relative overflow-x-auto shadow-md m-2 sm:rounded-lg">
                    <table class='table-auto overflow-scroll md:overflow-auto w-full text-left font-inter border '>
                        <thead class="text-xs text-gray-700 uppercase">
                            <tr>
                                {
                                    column.map((col, i) => (<th key={i} scope="col" class="px-6 py-3">{col}</th>))
                                }
                            </tr>
                        </thead>
                        <tbody>
                            {
                                values.map((val, i) => (
                                    <tr class="border-b" key={i} >
                                        {val.map((vl, j) => (
                                            j == 1 ? (<td key={j} class="px-6 py-4" ><a class='underline text-blue-600 hover:text-blue-800 visited:text-purple-600' href={vl}>{vl}</a></td>) :
                                                j == 3 ? <td key={j}>
                                                    <select onChange={(e) => selectTags(e, i)} id="tags" class="border border-gray-100 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                                        {
                                                            vl.split(',').map((vt, i) => <option key={i} value={vt}>{vt}</option>)
                                                        }
                                                    </select>
                                                </td> :
                                                    <td key={j} class="px-6 py-4" >{vl}</td>
                                        ))}
                                    </tr>
                                )
                                )
                            }
                        </tbody>
                    </table>
                    {/* <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead class="text-xs text-gray-700 uppercase">
                            <tr>
                                <th scope="col" class="px-6 py-3">
                                    S.No.
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Link
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Prefix
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Add Tags
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Selected Tags
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr class="border-b">
                                <td class="px-6 py-4">
                                    1
                                </td>
                                <th scope="row" class="px-6 py-4 font-medium text-[#403FFF] whitespace-nowrap dark:text-back">
                                    <a href="#" class='font-medium text-blue-600 dark:text-blue-500 underline underline-offset-2'>Apple MacBook Pro 17"</a>
                                </th>
                                <td class="px-6 py-4">
                                    Silver
                                </td>
                                <td class="px-6 py-4">
                                    <select id="tags" class="border border-gray-100 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                        <option selected>Select Tags</option>
                                        <option value="tag1">Tag 1</option>
                                        <option value="tag2">Tag 2</option>
                                        <option value="tag3">Tag 3</option>
                                        <option value="tag4">Tag 4</option>
                                    </select>
                                </td>
                                <td class="px-6 py-4">
                                    <span id="badge-dismiss-red" class="inline-flex items-center px-2 py-1 me-2 text-sm font-medium text-red-800 bg-red-100 rounded dark:bg-red-900 dark:text-red-300">
                                        Red
                                        <button type="button" class="inline-flex items-center p-1  ms-2 text-sm text-red-400 bg-transparent rounded-sm hover:bg-red-200 hover:text-red-900 dark:hover:bg-red-800 dark:hover:text-red-300" data-dismiss-target="#badge-dismiss-red" aria-label="Remove">
                                            <svg class="w-2 h-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                            </svg>
                                            <span class="sr-only">Remove badge</span>
                                        </button>
                                    </span>
                                    <span id="badge-dismiss-green" class="inline-flex items-center px-2 py-1 me-2 text-sm font-medium text-green-800 bg-green-100 rounded dark:bg-green-900 dark:text-green-300">
                                        Green
                                        <button type="button" class="inline-flex items-center p-1 ms-2 text-sm text-green-400 bg-transparent rounded-sm hover:bg-green-200 hover:text-green-900 dark:hover:bg-green-800 dark:hover:text-green-300" data-dismiss-target="#badge-dismiss-green" aria-label="Remove">
                                            <svg class="w-2 h-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                            </svg>
                                            <span class="sr-only">Remove badge</span>
                                        </button>
                                    </span>
                                    <span id="badge-dismiss-yellow" class="inline-flex items-center px-2 py-1 me-2 text-sm font-medium text-yellow-800 bg-yellow-100 rounded dark:bg-yellow-900 dark:text-yellow-300">
                                        Yellow
                                        <button type="button" class="inline-flex items-center p-1 ms-2 text-sm text-yellow-400 bg-transparent rounded-sm hover:bg-yellow-200 hover:text-yellow-900 dark:hover:bg-yellow-800 dark:hover:text-yellow-300" data-dismiss-target="#badge-dismiss-yellow" aria-label="Remove">
                                            <svg class="w-2 h-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                            </svg>
                                            <span class="sr-only">Remove badge</span>
                                        </button>
                                    </span>
                                    <span id="badge-dismiss-indigo" class="inline-flex items-center px-2 py-1 me-2 text-sm font-medium text-indigo-800 bg-indigo-100 rounded dark:bg-indigo-900 dark:text-indigo-300">
                                        Indigo
                                        <button type="button" class="inline-flex items-center p-1 ms-2 text-sm text-indigo-400 bg-transparent rounded-sm hover:bg-indigo-200 hover:text-indigo-900 dark:hover:bg-indigo-800 dark:hover:text-indigo-300" data-dismiss-target="#badge-dismiss-indigo" aria-label="Remove">
                                            <svg class="w-2 h-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                            </svg>
                                            <span class="sr-only">Remove badge</span>
                                        </button>
                                    </span>
                                    <span id="badge-dismiss-purple" class="inline-flex items-center px-2 py-1 me-2 text-sm font-medium text-purple-800 bg-purple-100 rounded dark:bg-purple-900 dark:text-purple-300">
                                        Purple
                                        <button type="button" class="inline-flex items-center p-1 ms-2 text-sm text-purple-400 bg-transparent rounded-sm hover:bg-purple-200 hover:text-purple-900 dark:hover:bg-purple-800 dark:hover:text-purple-300" data-dismiss-target="#badge-dismiss-purple" aria-label="Remove">
                                            <svg class="w-2 h-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                            </svg>
                                            <span class="sr-only">Remove badge</span>
                                        </button>
                                    </span>
                                    <span id="badge-dismiss-pink" class="inline-flex items-center px-2 py-1 me-2 text-sm font-medium text-pink-800 bg-pink-100 rounded dark:bg-pink-900 dark:text-pink-300">
                                        Pink
                                        <button type="button" class="inline-flex items-center p-1 ms-2 text-sm text-pink-400 bg-transparent rounded-sm hover:bg-pink-200 hover:text-pink-900 dark:hover:bg-pink-800 dark:hover:text-pink-300" data-dismiss-target="#badge-dismiss-pink" aria-label="Remove">
                                            <svg class="w-2 h-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                            </svg>
                                            <span class="sr-only">Remove badge</span>
                                        </button>
                                    </span>

                                </td>
                            </tr>
                            <tr class="border-b">
                                <td class="px-6 py-4">
                                    2
                                </td>
                                <th scope="row" class="px-6 py-4 font-medium text-[#403FFF] whitespace-nowrap dark:text-back">
                                    <a href='#' class='font-medium text-blue-600 dark:text-blue-500 underline underline-offset-2'>Microsoft Surface Pro</a>
                                </th>
                                <td class="px-6 py-4">
                                    White
                                </td>
                                <td class="px-6 py-4">
                                    <select id="tags" class="border border-gray-100 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                        <option selected>Select Tags</option>
                                        <option value="tag1">Tag 1</option>
                                        <option value="tag2">Tag 2</option>
                                        <option value="tag3">Tag 3</option>
                                        <option value="tag4">Tag 4</option>
                                    </select>
                                </td>
                                <td class="px-6 py-4">
                                    <span id="badge-dismiss-green" class="inline-flex items-center px-2 py-1 me-2 text-sm font-medium text-green-800 bg-green-100 rounded dark:bg-green-900 dark:text-green-300">
                                        Green
                                        <button type="button" class="inline-flex items-center p-1 ms-2 text-sm text-green-400 bg-transparent rounded-sm hover:bg-green-200 hover:text-green-900 dark:hover:bg-green-800 dark:hover:text-green-300" data-dismiss-target="#badge-dismiss-green" aria-label="Remove">
                                            <svg class="w-2 h-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                            </svg>
                                            <span class="sr-only">Remove badge</span>
                                        </button>
                                    </span>
                                    <span id="badge-dismiss-yellow" class="inline-flex items-center px-2 py-1 me-2 text-sm font-medium text-yellow-800 bg-yellow-100 rounded dark:bg-yellow-900 dark:text-yellow-300">
                                        Yellow
                                        <button type="button" class="inline-flex items-center p-1 ms-2 text-sm text-yellow-400 bg-transparent rounded-sm hover:bg-yellow-200 hover:text-yellow-900 dark:hover:bg-yellow-800 dark:hover:text-yellow-300" data-dismiss-target="#badge-dismiss-yellow" aria-label="Remove">
                                            <svg class="w-2 h-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                            </svg>
                                            <span class="sr-only">Remove badge</span>
                                        </button>
                                    </span>
                                    <span id="badge-dismiss-indigo" class="inline-flex items-center px-2 py-1 me-2 text-sm font-medium text-indigo-800 bg-indigo-100 rounded dark:bg-indigo-900 dark:text-indigo-300">
                                        Indigo
                                        <button type="button" class="inline-flex items-center p-1 ms-2 text-sm text-indigo-400 bg-transparent rounded-sm hover:bg-indigo-200 hover:text-indigo-900 dark:hover:bg-indigo-800 dark:hover:text-indigo-300" data-dismiss-target="#badge-dismiss-indigo" aria-label="Remove">
                                            <svg class="w-2 h-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                            </svg>
                                            <span class="sr-only">Remove badge</span>
                                        </button>
                                    </span>
                                    <span id="badge-dismiss-purple" class="inline-flex items-center px-2 py-1 me-2 text-sm font-medium text-purple-800 bg-purple-100 rounded dark:bg-purple-900 dark:text-purple-300">
                                        Purple
                                        <button type="button" class="inline-flex items-center p-1 ms-2 text-sm text-purple-400 bg-transparent rounded-sm hover:bg-purple-200 hover:text-purple-900 dark:hover:bg-purple-800 dark:hover:text-purple-300" data-dismiss-target="#badge-dismiss-purple" aria-label="Remove">
                                            <svg class="w-2 h-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                            </svg>
                                            <span class="sr-only">Remove badge</span>
                                        </button>
                                    </span>
                                    <span id="badge-dismiss-pink" class="inline-flex items-center px-2 py-1 me-2 text-sm font-medium text-pink-800 bg-pink-100 rounded dark:bg-pink-900 dark:text-pink-300">
                                        Pink
                                        <button type="button" class="inline-flex items-center p-1 ms-2 text-sm text-pink-400 bg-transparent rounded-sm hover:bg-pink-200 hover:text-pink-900 dark:hover:bg-pink-800 dark:hover:text-pink-300" data-dismiss-target="#badge-dismiss-pink" aria-label="Remove">
                                            <svg class="w-2 h-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                            </svg>
                                            <span class="sr-only">Remove badge</span>
                                        </button>
                                    </span>

                                </td>
                            </tr>
                            <tr class="border-b">
                                <td class="px-6 py-4">
                                    3
                                </td>
                                <th scope="row" class="px-6 py-4 font-medium text-[#403FFF] whitespace-nowrap dark:text-back">
                                    <a href='#' class='font-medium text-blue-600 dark:text-blue-500 underline underline-offset-2'>Magic Mouse 2</a>
                                </th>
                                <td class="px-6 py-4">
                                    Black
                                </td>
                                <td class="px-6 py-4">
                                    <select id="tags" class="border border-gray-100 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                        <option selected>Select Tags</option>
                                        <option value="tag1">Tag 1</option>
                                        <option value="tag2">Tag 2</option>
                                        <option value="tag3">Tag 3</option>
                                        <option value="tag4">Tag 4</option>
                                    </select>
                                </td>
                                <td class="px-6 py-4">
                                    <span id="badge-dismiss-dark" class="inline-flex items-center px-2 py-1 me-2 text-sm font-medium text-gray-800 bg-gray-100 rounded dark:bg-gray-700 dark:text-gray-300">
                                        Dark
                                        <button type="button" class="inline-flex items-center p-1 ms-2 text-sm text-gray-400 bg-transparent rounded-sm hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-gray-300" data-dismiss-target="#badge-dismiss-dark" aria-label="Remove">
                                            <svg class="w-2 h-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                            </svg>
                                            <span class="sr-only">Remove badge</span>
                                        </button>
                                    </span>
                                    <span id="badge-dismiss-red" class="inline-flex items-center px-2 py-1 me-2 text-sm font-medium text-red-800 bg-red-100 rounded dark:bg-red-900 dark:text-red-300">
                                        Red
                                        <button type="button" class="inline-flex items-center p-1  ms-2 text-sm text-red-400 bg-transparent rounded-sm hover:bg-red-200 hover:text-red-900 dark:hover:bg-red-800 dark:hover:text-red-300" data-dismiss-target="#badge-dismiss-red" aria-label="Remove">
                                            <svg class="w-2 h-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                            </svg>
                                            <span class="sr-only">Remove badge</span>
                                        </button>
                                    </span>
                                    <span id="badge-dismiss-green" class="inline-flex items-center px-2 py-1 me-2 text-sm font-medium text-green-800 bg-green-100 rounded dark:bg-green-900 dark:text-green-300">
                                        Green
                                        <button type="button" class="inline-flex items-center p-1 ms-2 text-sm text-green-400 bg-transparent rounded-sm hover:bg-green-200 hover:text-green-900 dark:hover:bg-green-800 dark:hover:text-green-300" data-dismiss-target="#badge-dismiss-green" aria-label="Remove">
                                            <svg class="w-2 h-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                            </svg>
                                            <span class="sr-only">Remove badge</span>
                                        </button>
                                    </span>
                                    <span id="badge-dismiss-yellow" class="inline-flex items-center px-2 py-1 me-2 text-sm font-medium text-yellow-800 bg-yellow-100 rounded dark:bg-yellow-900 dark:text-yellow-300">
                                        Yellow
                                        <button type="button" class="inline-flex items-center p-1 ms-2 text-sm text-yellow-400 bg-transparent rounded-sm hover:bg-yellow-200 hover:text-yellow-900 dark:hover:bg-yellow-800 dark:hover:text-yellow-300" data-dismiss-target="#badge-dismiss-yellow" aria-label="Remove">
                                            <svg class="w-2 h-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                            </svg>
                                            <span class="sr-only">Remove badge</span>
                                        </button>
                                    </span>
                                    <span id="badge-dismiss-indigo" class="inline-flex items-center px-2 py-1 me-2 text-sm font-medium text-indigo-800 bg-indigo-100 rounded dark:bg-indigo-900 dark:text-indigo-300">
                                        Indigo
                                        <button type="button" class="inline-flex items-center p-1 ms-2 text-sm text-indigo-400 bg-transparent rounded-sm hover:bg-indigo-200 hover:text-indigo-900 dark:hover:bg-indigo-800 dark:hover:text-indigo-300" data-dismiss-target="#badge-dismiss-indigo" aria-label="Remove">
                                            <svg class="w-2 h-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                            </svg>
                                            <span class="sr-only">Remove badge</span>
                                        </button>
                                    </span>
                                    <span id="badge-dismiss-purple" class="inline-flex items-center px-2 py-1 me-2 text-sm font-medium text-purple-800 bg-purple-100 rounded dark:bg-purple-900 dark:text-purple-300">
                                        Purple
                                        <button type="button" class="inline-flex items-center p-1 ms-2 text-sm text-purple-400 bg-transparent rounded-sm hover:bg-purple-200 hover:text-purple-900 dark:hover:bg-purple-800 dark:hover:text-purple-300" data-dismiss-target="#badge-dismiss-purple" aria-label="Remove">
                                            <svg class="w-2 h-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                            </svg>
                                            <span class="sr-only">Remove badge</span>
                                        </button>
                                    </span>
                                    <span id="badge-dismiss-pink" class="inline-flex items-center px-2 py-1 me-2 text-sm font-medium text-pink-800 bg-pink-100 rounded dark:bg-pink-900 dark:text-pink-300">
                                        Pink
                                        <button type="button" class="inline-flex items-center p-1 ms-2 text-sm text-pink-400 bg-transparent rounded-sm hover:bg-pink-200 hover:text-pink-900 dark:hover:bg-pink-800 dark:hover:text-pink-300" data-dismiss-target="#badge-dismiss-pink" aria-label="Remove">
                                            <svg class="w-2 h-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                            </svg>
                                            <span class="sr-only">Remove badge</span>
                                        </button>
                                    </span>

                                </td>
                            </tr>
                        </tbody>
                    </table> */}
                </div>
            </div>
        </div>
    )
}
