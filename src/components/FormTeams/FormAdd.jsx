import React, { useContext, useState } from 'react'
import style from "./form.module.css"
import { TeamsContext } from '../../context/TeamsContext'

export const FormAdd = ({ team }) => {
  // idUser, nickMember, idTeams
  const [nickname, setNickname] = useState("")
  const [office, setOffice] = useState("")
  const { addMember } = useContext(TeamsContext);
  const user = JSON.parse(localStorage.getItem("@Auth:ProfileUser"))

  const handleSubmit = (e) => {
    e.preventDefault()
    const data = {
      idUser: user._id,
      nickMember: nickname,
      office,
      idTeams: team._id
    }
    addMember(data, team);

  }

  return (
    <form className={style.Form} onSubmit={handleSubmit}>
      <label>
        * Nickname
        <input
          type="text"
          onChange={(e) => setNickname(e.target.value)}
          placeholder='Nickname de quem deseja adicionar'
        />
      </label>

      <label>
        * Cargo

        <select onChange={(e) => setOffice(e.target.value)} defaultValue="">
          <option value="" disabled hidden>Selecione</option>
          <option value="Membro">Membro</option>
          <option value="Coordenador">Coordenador</option>
          {team.nameTeams === "Ensino" && <option value="Docente">Docente</option>}
        </select>

      </label>
      <button type='submit'>Adicionar</button>
    </form>
  )
}
