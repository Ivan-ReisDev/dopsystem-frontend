import React, { useEffect, useState } from 'react'
import { RiFunctionFill } from "react-icons/ri";

const Functions = ({ teams, profile }) => {
  const [teamsProfile, setTeamsProfile] = useState([]);
  const { users } = profile
  const userProfile = users[0];


  useEffect(() => {
    const userFilter = teams.filter(team => userProfile.teans.includes(team.nameTeams))
    setTeamsProfile(userFilter)
  }, []);



  return (<>
   <div className='contentBodyElement'>
      <div className='contentBodyElementTitle'>
        <h3 className="flex flex-row"><span className='mr-2'><RiFunctionFill /></span> Departamentos</h3>
      </div>
      <ul className='w-full flex items-center justify-center p-2 text-wrap'>

        {teamsProfile.length > 0 ?
         teamsProfile.map((team) => (
          <>
            <div key={team.nameTeams} className='flex items-center justify-center p-2 flex-col min-w-[100px]'>
            <img src={team.emblema} alt={team.nameTeams} />
            <h3 className='font-medium text-[11px]'>{team.nameTeams}</h3>
          </div>
          </>
        )) :
        <>
        <p>O militar ainda não faz parte de nenhuma equipe.</p>
        </>

        }

      </ul>
    </div>  </>
  )
}

export default Functions