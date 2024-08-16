
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {MdSearch}  from "react-icons/md";
import { VscSettings } from "react-icons/vsc";

const Opportunities: React.FC = () => {
    const [activeTab, setActiveTab] = useState("stage");
    const [todos, setTodos] = useState<any[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('');
    const [sortOrder, setSortOrder] = useState('');

    useEffect(() => {
        axios("https://jsonplaceholder.typicode.com/todos")
        .then((res) => {
            setTodos(res.data.slice(1,15))
        })
        .catch((err) => {
            console.log(err);
        })
    }, [])

    const filteredTodos = todos
        .filter(todo => 
            todo.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
            (filterStatus === '' || todo.completed.toString() === filterStatus)
        )
        .sort((a, b) => {
            if (sortOrder === 'az') {
                return a.title.localeCompare(b.title);
            } else if (sortOrder === 'za') {
                return b.title.localeCompare(a.title);
            }
            return 0;
        });

    
  
  return <div className="p-4">
    <div className='bg-white text-black py-3 px-2 md:px-4 border drop-shadow-md rounded-md shadow-lg'>
        <h2 className='text-xl font-medium'>Ameritas</h2>
    </div>

    <div className='px-2 md:px-4 py-4'>
        <h1 className='font-bold text-3xl'>Opportunities</h1>
        {/* Tab component  */}
        <div className='py-4'>
            {/* tab header  */}
            <div className='flex items-center justify-start gap-2 md:gap-8'>
                <div onClick={() => setActiveTab("stage")} className={`text-xl p-1  ${activeTab === "stage" ? "text-black font-bold border-b-2 border-b-red-800" : "text-gray-600"}`}>Stages</div>
                <div onClick={() => setActiveTab("archive")}  className={`text-xl p-1  ${activeTab==="archive" ? "text-black font-bold border-b-2 border-b-red-800" : "text-gray-600"}`}>Archived/Closed</div>
            </div>
            {/* Tab Body  */}
            {
                activeTab === "stage" ? <StagesBody/> : <div>
                    <h4>Archived tab body</h4>
                </div>
            }

        </div>

        {/* Search & Data sort, Filter */}
        <div className='flex items-center justify-between'>
                <div className='flex items-center justify-start gap-2 border-2 rounded-lg shadow-sm px-2 py-[5px]'>
                    <MdSearch className='text-2xl' />
                    <input 
                        type="text" 
                        name="search" 
                        id="search" 
                        placeholder='Search by name or ID...' 
                        className='text-lg outline-none' 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                <div className='flex items-center justify-end gap-2 md:gap-6'>
                    {/* Filter */}
                    <div className='border-2 px-2 py-1 text-lg rounded-md shadow-sm flex items-center justify-start gap-2'>
                        <span>Filter</span>
                        <select 
                            name="filter" 
                            id="filter" 
                            className='outline-none' 
                            value={filterStatus}
                            onChange={(e) => setFilterStatus(e.target.value)}
                        >
                            <option value="">All</option>
                            <option value="true">Completed</option>
                            <option value="false">Not Completed</option>
                        </select>
                    </div>

                    {/* Sort */}
                    <div className='flex items-center justify-start gap-2'>
                        <h4>Sort By</h4>
                        <select 
                            name="Sort" 
                            id="Sort" 
                            className='border-2 px-2 py-1 text-lg rounded-md shadow-sm outline-none' 
                            value={sortOrder}
                            onChange={(e) => setSortOrder(e.target.value)}
                        >
                            <option value="">Select</option>
                            <option value="az">Alphabetical A-Z</option>
                            <option value="za">Alphabetical Z-A</option>
                        </select>
                    </div>
                </div>
            </div>

        {/* Todos Data */}
        <div>
                {filteredTodos.map((todo, index) => (
                    <div key={index} className="border-b p-2">
                        <h4>{todo.title}</h4>
                        <p>Status: {todo.completed ? 'Completed' : 'Not Completed'}</p>
                    </div>
                ))}
            </div>

        {/* Horizontal titles  */}
        <div className='flex items-center justify-between gap-2 md:gap-5 uppercase text-md flex-wrap pt-20'>
            <div className='flex flex-col justify-between gap-2 h-[140px]'>
                <h4 className='text-gray-500 font-medium'>Opportunity info</h4>
                <div className='border px-2 py-3 rounded-md shadow-md'>
                    <p className='text-sm text-gray-400'>ID: (24234324)</p>
                    <h4 className='text-blue-500 text-md py-2 font-medium capitalize'>Atlas global logistics 01</h4>
                    <p className='text-sm text-gray-400'>401 (k). Single Employer</p>
                </div>
            </div>
            <div className='flex flex-col justify-between gap-2 h-[140px]'>
                <h4 className='text-gray-500 font-medium'>Regional</h4>
                <div className='border px-2 py-5 rounded-md shadow-md'>
                    <p className='text-lg font-medium text-black'>Brad Andelt</p>
                </div>
            </div>
            <div  className='flex flex-col justify-between gap-2 h-[140px]'>
                <h4 className='text-gray-500 font-medium'>financial professional</h4>
                <div className='border px-2 py-10 rounded-md shadow-md'>
                    <p className='text-base text-black'>Ky Johnson</p>
                </div>
            </div>
            <div className='flex flex-col justify-between gap-2 h-[140px]'>
                <h4 className='text-gray-500 font-medium'>Progress</h4>
                <div className='border px-2 py-10 rounded-md shadow-md'>
                    <p className='text-md text-black'>60% Complete</p>
                </div>
            </div>
            <div className='flex flex-col justify-between gap-2 h-[140px]'>
                <h4 className='text-gray-500 font-medium'>what's happening</h4>
                <div className='border px-2 py-3 rounded-md shadow-md'>
                    <p className='text-md text-black'>Sales Review</p>
                </div>
            </div>
        </div>
    </div>
    </div>;
};

export default Opportunities;



const StagesBody = () => {
  return (
    <div>
        <div className='flex items-center justify-end gap-4'>
            <h4>Import Quote/Opportunity</h4>
            <input type="text" name="import" id="import" placeholder='QO-xxxx' className='border-2 border-black max-w-28 px-2 py-1 rounded-sm'  />
        </div>
        <h4>Data Collection</h4>
    </div>
  )
}
