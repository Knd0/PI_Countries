import React from 'react';
import style from './Loader.module.css';

const Loader = (props) => {
    return (
        <div className={style.container}>
            <div className={style.loader}></div>
            <div className={style.text}>Cargando...</div>
        </div>
    )
}

export default Loader