import style from "./profile.module.css"

import React from 'react'
const Profile = () => {
    const infoProfileUser = JSON.parse(localStorage.getItem("@Auth:ProfileUser"))
  return (
    <div>
        <div className={style.profile}>
            <div className='contentBodyElementTitle'>
                <h2>Buscar</h2>
                
            </div>
            <div className={style.profileBody}>
                <div className={`${style.functions} ${style.divs}`}>
                <div className={style.img}>
                        <img src={`https://www.habbo.com.br/habbo-imaging/avatarimage?img_format=png&user=${infoProfileUser.nickname}&direction=2&head_direction=3&size=m&gesture=sml&action=std`} alt="" />
                    
                    </div>
                    <div>
                        <h3>{infoProfileUser.nickname}</h3>
                        <p><span>Patente: </span>{infoProfileUser.patent}</p>
                        <p><span>TAG: </span>[ {infoProfileUser.tag}]</p>
                        <p><span>Status: </span>{infoProfileUser.status}</p>
                        <p><span>Admissão: </span>12/11/2010</p>
                        <p><span>Advertências: </span>{infoProfileUser.warning}</p>
                        <p><span>Missão: </span> [DOP] Dono </p>
                    </div>


                </div>
                <div className={`${style.line} ${style.divs}`}>

                </div>
            </div>
        </div>
    </div>
  )
}

export default Profile