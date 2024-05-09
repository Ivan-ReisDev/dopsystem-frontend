import React, { useState } from 'react'
import { RxHamburgerMenu } from "react-icons/rx";
import { GoBellFill } from "react-icons/go";
import { IoMdClose } from "react-icons/io";
import Sidebar from './Sidebar';
import LogoDOP from '../assets/DOP Padrão (com borda).png'
const Navbar = () => {

    const [showSidebar, setShowSidebar] = useState(false);

    const activeSidebar = () => setShowSidebar(!showSidebar);


    return (
        <div className='h-[61px] w-[100vw] bg-[#000340] positionFixed z-1' >
            <header className='nabBarNew  w-full h-full flex flex-row items-center justify-between'>
                <div className=' ml-12 flex flex-row items-center justify-center'>
                    <img src={LogoDOP} alt="logo da DOP" className='w-[40px] m-0' />
                    <h1 className='text-[25px] font-semibold ml-4  text-[#ffffff]'> <span className='text-[#0084FF]'>DOP</span>System</h1>
                </div>
                <div className='text-[#FFFFFF] h-full flex items-center text-[28px] mr-5'>
                     <button className='mr-4'>
                        <GoBellFill />
                    </button>
                    <button className='mr-2' onClick={activeSidebar}>
                        { showSidebar ? <IoMdClose />
                        : <RxHamburgerMenu /> }
                    </button>
                </div>

            <Sidebar 
            showSidebar={showSidebar}
            setShowSidebar={setShowSidebar}
            />

            </header>

        </div>
    )
}

export default Navbar