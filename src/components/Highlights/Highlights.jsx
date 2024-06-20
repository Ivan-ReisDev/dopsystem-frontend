import React, { useContext, useState } from 'react'
import {
    FaStar,

} from "react-icons/fa6";
import style from './Highlights.module.css'
import { Link } from 'react-router-dom';


const Highlights = () => {


    return (
        <div className='contentBodyElement'>
            <div className='contentBodyElementTitle'>
                <h3 className={style.title}><span><FaStar /></span> Destaques Semanais</h3>
            </div>
            <div className={style.cards}>
                <div className={style.card}>
                    <Link className={style.Link}>
                        <img src="https://www.habbo.com.br/habbo-imaging/avatarimage?img_format=png&user=Tony77&direction=2&head_direction=3&size=m&gesture=sml&action=wlk&frame=2" alt="" />
                        <h3>Tony77</h3>
                    </Link>
                </div>
                <div className={style.card}>
                    <Link className={style.Link}>
                        <img src="https://www.habbo.com.br/habbo-imaging/avatarimage?img_format=png&user=souzah2015&direction=2&head_direction=3&size=m&gesture=sml&action=wlk&frame=2" alt="" />
                        <h3>souzah2015</h3>
                    </Link>
                </div>
                <div className={style.card}>
                    <Link className={style.Link}>
                        <img src="https://www.habbo.com.br/habbo-imaging/avatarimage?img_format=png&user=Cristyanlcs&direction=2&head_direction=3&size=m&gesture=sml&action=wlk&frame=2" alt="" />
                        <h3>Cristyanlcs</h3>
                    </Link>
                </div>
                <div className={style.card}>
                    <Link className={style.Link}>
                        <img src="https://www.habbo.com.br/habbo-imaging/avatarimage?img_format=png&user=:1854&direction=2&head_direction=3&size=m&gesture=sml&action=wlk&frame=2" alt="" />
                        <h3>:1854</h3>
                    </Link>
                </div>
            </div>



        </div>
    )
}

export default Highlights;