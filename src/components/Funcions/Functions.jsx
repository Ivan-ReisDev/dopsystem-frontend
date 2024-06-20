import React from 'react'
import { RiFunctionFill } from "react-icons/ri";

const Functions = () => {

  const user = JSON.parse(localStorage.getItem("@Auth:ProfileUser"));

  return (
    <div className='contentBodyElement'>
      <div className='contentBodyElementTitle'>
        <h3 className="flex flex-row"><span className='mr-2'><RiFunctionFill /></span> Departamentos</h3>
      </div>
      <ul className='w-full flex items-center justify-center p-2 text-wrap'>
        <div className='flex items-center justify-center p-2 flex-col min-w-[100px]'>
          <img src="https://www.habbo.com.br/habbo-imaging/badge/b22114s36114s43114s41114s17014918c4eddbc8d68d87dbe984f329372a2.gif" alt="Ensino" />
          <h3 className='font-medium text-[11px]'>Ensino</h3>
        </div>

        <div className='flex items-center justify-center p-2 flex-col min-w-[100px]'>
        <img className='mr-2' src="https://www.habbo.com.br/habbo-imaging/badge/b22044s36114s41114s43114s170144deacce5a7e858428d0abc0cca0b3cc7.gif" alt="Supervisores" />
          <h3 className='font-medium text-[11px]'>Supervisores</h3>
        </div>

        <div className='flex items-center justify-center p-2 flex-col min-w-[100px]'>
        <img className='mr-2' src="https://www.habbo.com.br/habbo-imaging/badge/b08244s01104s36134s33114s3811457643edbbc372f94343984f7b0269095.gif" alt="Toca do Lobo" />
          <h3 className='font-medium text-[11px]'>Toca do Lobo</h3>
        </div>
          
      </ul>
    </div>
  )
}

export default Functions