import React, { useContext, useEffect, useState } from 'react';
import { FaStar } from "react-icons/fa6";
import style from './Highlights.module.css';
import { Link } from 'react-router-dom';
import { SystemContext } from '../../context/SystemContext';
import Preloader from '../../assets/preloader.gif';

const Highlights = () => {
    const { loading, getSystemDpanel, infoSystemDpanel } = useContext(SystemContext);
    const [loadingInfo, setLoadingInfo] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            await getSystemDpanel();
            setLoadingInfo(false);
        };
        fetchData();
    }, []);

    // Verifica se está carregando ou se os dados ainda não foram carregados
    if (loading || loadingInfo || infoSystemDpanel.length === 0) {
        return <div className='flex items-center justify-center'> <img className='w-[50px]' src={Preloader} alt="Loading..." /></div>;
    }

    // Renderiza os destaques apenas se os dados estiverem carregados
    return (
        <div className='contentBodyElement'>
            <div className='contentBodyElementTitle'>
                <h3 className={style.title}><span><FaStar /></span> Destaques Semanais</h3>
            </div>
            <div className={style.cards}>
                <div className={style.card}>
                    <Link className={style.Link} to={`/search/${infoSystemDpanel[0].destaques1}`}>
                        <img src={`https://www.habbo.com.br/habbo-imaging/avatarimage?img_format=png&user=${infoSystemDpanel[0].destaques1}&direction=2&head_direction=3&size=m&gesture=sml&action=wlk&frame=2`} alt="" />
                        <h3>{infoSystemDpanel[0].destaques1}</h3>
                    </Link>
                </div>
                <div className={style.card}>
                    <Link className={style.Link} to={`/search/${infoSystemDpanel[0].destaques2}`}>
                        <img src={`https://www.habbo.com.br/habbo-imaging/avatarimage?img_format=png&user=${infoSystemDpanel[0].destaques2}&direction=2&head_direction=3&size=m&gesture=sml&action=wlk&frame=2`} alt="" />
                        <h3>{infoSystemDpanel[0].destaques2}</h3>
                    </Link>
                </div>
                <div className={style.card}>
                    <Link className={style.Link} to={`/search/${infoSystemDpanel[0].destaques3}`}>
                        <img src={`https://www.habbo.com.br/habbo-imaging/avatarimage?img_format=png&user=${infoSystemDpanel[0].destaques3}&direction=2&head_direction=3&size=m&gesture=sml&action=wlk&frame=2`} alt="" />
                        <h3>{infoSystemDpanel[0].destaques3}</h3>
                    </Link>
                </div>
                <div className={style.card}>
                    <Link className={style.Link} to={`/search/${infoSystemDpanel[0].destaques4}`}>
                        <img src={`https://www.habbo.com.br/habbo-imaging/avatarimage?img_format=png&user=${infoSystemDpanel[0].destaques4}&direction=2&head_direction=3&size=m&gesture=sml&action=wlk&frame=2`} alt="" />
                        <h3>{infoSystemDpanel[0].destaques4}</h3>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Highlights;
