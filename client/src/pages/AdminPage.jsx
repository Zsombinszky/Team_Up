import {Link} from "react-router-dom";
import {tasks} from "../data/Tasks.js";
import {CgArrowRightO} from "react-icons/cg";
import React from "react";
import Bullets from '../assets/bullets3.jpg';

const AdminPage = () => {
    return (
        <div className="w-full h-screen relative">
            <img
                src={Bullets}
                alt="newsbg"
                className="absolute inset-0 w-full h-full object-cover z-0"
            />
            <div className="flex justify-center items-center relative z-10">
                <div className="w-1/3 flex flex-col items-center justify-center bg-gray-200 rounded-lg shadow-lg">
                    <h1 className="pb-8 pt-16 text-[#3f37c9] text-[3rem] font-bold">ADMIN TOOLS</h1>
                    <div className="flex gap-5 items-center justify-center w-full pb-20">
                        <Link to="/admin/feedbacks">
                            <button
                                className="relative inline-flex items-center justify-center px-8 py-6 text-base leading-relaxed text-center text-white transition duration-200 ease-in-out bg-gray-700 hover:bg-[#3f37c9] transform hover:scale-110 rounded-md shadow-lg shadow-black">
                                <span className="flex-shrink-0 overflow-hidden">Feedbacks</span>
                            </button>
                        </Link>
                        <Link to="/admin/guilds">
                            <button
                                className="relative inline-flex items-center justify-center px-8 py-6 text-base leading-relaxed text-center text-white transition duration-200 ease-in-out bg-gray-700 hover:bg-[#3f37c9] transform hover:scale-110 rounded-md shadow-lg shadow-black">
                                <span className="flex-shrink-0 overflow-hidden">Guilds</span>
                            </button>
                        </Link>
                        <Link to="/admin/users">
                            <button
                                className="relative inline-flex items-center justify-center px-8 py-6 text-base leading-relaxed text-center text-white transition duration-200 ease-in-out bg-gray-700 hover:bg-[#3f37c9] transform hover:scale-110 rounded-md shadow-lg shadow-black">
                                <span className="flex-shrink-0 overflow-hidden">Users</span>
                            </button>
                        </Link>
                        <Link to="/admin/weapons">
                            <button
                                className="relative inline-flex items-center justify-center px-8 py-6 text-base leading-relaxed text-center text-white transition duration-200 ease-in-out bg-gray-700 hover:bg-[#3f37c9] transform hover:scale-110 rounded-md shadow-lg shadow-black">
                                <span className="flex-shrink-0 overflow-hidden">Weapons</span>
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
            <div className="absolute bottom-40 left-0 w-1/2 border-8 border-[#3f37c9] bg-gray-200 rounded-2xl p-4">
                <h1 className="ml-14 text-[2.5rem] text-[#3f37c9] font-semibold">TASKS</h1>
                <ul>
                    {tasks.map((task, index) => (
                        <li className="py-2 flex px-2 items-center" key={index}>
                            <CgArrowRightO className="text-[2rem] text-[#3f37c9]"/>
                            <span className="ml-4 font-semibold text-[1.2rem]">{task.task}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default AdminPage;
