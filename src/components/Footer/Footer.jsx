import React, { useContext } from 'react'
import style from './footer.module.css'
import LogoDOP from '../../assets/logodop.png'
import { NavLink, useLocation } from 'react-router-dom'
import { FaArrowsAlt,FaMapMarkedAlt,FaHistory, FaDiscord, FaInstagramSquare    } from "react-icons/fa";
import { IoLogoWhatsapp } from "react-icons/io";
import { AuthContext } from '../../context/AuthContext';


const Footer = () => {

    const location = useLocation();

    const {isAuthentication} = useContext(AuthContext)
    // Verifica se a rota atual é '/contact'
    if (location.pathname === '/dpanel') {
      return null; // Não renderiza o Header
    }

    return (
        <footer className={ !isAuthentication ? ` top-0 mt-0 ${style.Footer}`  : style.Footer}>
            <div className={style.Header}>
                <div className={style.midia}>
                    <img src={LogoDOP} alt="Logo da DOP" />
                    <ul>
                        <li><NavLink to={``}><FaDiscord /> </NavLink></li>
                        <li><NavLink to={``}><FaInstagramSquare /> </NavLink></li>
                        <li><NavLink to={``}><IoLogoWhatsapp /></NavLink></li>
                    </ul>
                </div>
                <div className={style.body}>
                    <div>
                        <h3><FaMapMarkedAlt/>Missão</h3>
                        <p>A nossa missão é fortalecer o ramo policial do Habbo Hotel, através da inovação e esforço de todos os policiais, além de transformá-los em bons militares e, consequentemente, bons jovens.</p>
                    </div>
                    <div>
                        <h3><FaArrowsAlt /> Visão</h3>
                        <p>Ser reconhecida como uma instituição moderna e diferenciada do ramo policial do Habbo Hotel, tendo como príncipio a filosofia de militarismo democrático e igualitário.</p>
                    </div>
                    <div>
                        <h3><FaHistory/> História</h3>
                        <p>O Departamento de Operações Policiais foi fundado dia 10 de agosto de 2010 e inaugurada 3 dias depois por DJMartan, --spy--wolf-- e Hantaro-Pixel. Hoje, depois de deixar a sua marca no ramo policial, continuamos a inovar.</p>
                    </div>
                </div>

            </div>
            <div className={style.End}>
                <p>Este site não é afiliado, patrocinado, apoiado ou aprovado de forma alguma pela Sulake Oy ou suas empresas afiliadas.</p>
                <p>Copyright © Polícia DOP 2010 ~ 2024. Todos os direitos reservados.</p>
            </div>
            <div className={style.dev}>
                <p>Criado e desenvolvido por <NavLink target='_blank' to="https://ivanreis.vercel.app/">Ivan Reis | .Disco.Master</NavLink> & Créditos do designer <NavLink>João Paulo | GuerreiroBR13</NavLink></p>

            </div>

        </footer>
    )
}

export default Footer