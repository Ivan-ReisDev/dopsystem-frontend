import React, { useContext } from 'react'
import style from '../TableTeamsMembers/TableTeamsMembers.module.css';
import { TeamsContext } from '../../context/TeamsContext';

const Confirmation = ({ dataUser , setIsRemove, team, userOk}) => {

    const { removeMember } = useContext(TeamsContext);

    const user = JSON.parse(localStorage.getItem("@Auth:ProfileUser"))

    const handleRemove = () => {
        const data = {
            idUser: user._id, 
            nickMember:dataUser.user.nickname, 
            idTeams: team._id
        }
        removeMember(data)
        setIsRemove(false)
        console.log()
    }

  return (
    <div className={style.Confirmation}>
        <p>Você tem certeza que deseja remover o usuário <span>{dataUser.user.nickname}</span> </p>
        <div>
            <button onClick={() => handleRemove()} className={style.buttonEdit}>Sim</button>
            <button onClick={() => setIsRemove(false)} className={style.buttonExcluir}>Não</button>
        </div>
    </div>
  )
}

export default Confirmation