import React, { useState } from 'react'
import { FaPlus } from "react-icons/fa6";

import style from './Publication.module.css'
const Publication = () => {

    const [publication, setPublication] = useState(false);

    const sidebar = () => setPublication(!publication)




    return (
        <div className={publication ? `${style.Publication} ${style.activePublic}` : `${style.Publication}`}>
            <div className={style.PublicationTitle} onClick={sidebar}>
                <div>
                    <img src="https://www.habbo.com.br/habbo-imaging/avatarimage?img_format=png&user=Billl&direction=2&head_direction=2&size=m&action=std" alt="Avatar" />
                    <h2>Venha par ao Setor de RH</h2>
                </div>
                <button onClick={sidebar}> {publication ? "-" : <FaPlus />}   </button>
            </div>

            <div className={publication ? `${style.active} ${style.PublicationBody}` : style.PublicationBody} >
                <img src="https://dophabbo.systemhb.net/template/uploads/plugins/publicacao/bbbc4bb56707eaf7ef2279476430d944.jpg" alt="" />
                <h5>Teste</h5>
                <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Suscipit, illum non quia eveniet officiis ea ex explicabo ipsa accusantium nam laboriosam aperiam soluta fugiat minus nemo repellat modi beatae sunt?</p>
                <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Suscipit, illum non quia eveniet officiis ea ex explicabo ipsa accusantium nam laboriosam aperiam soluta fugiat minus nemo repellat modi beatae sunt?</p>
                <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Suscipit, illum non quia eveniet officiis ea ex explicabo ipsa accusantium nam laboriosam aperiam soluta fugiat minus nemo repellat modi beatae sunt?</p>
            </div>

        </div>
    )
}

export default Publication