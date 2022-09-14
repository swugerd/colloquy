import React from 'react'
import s from './NotFoundBlock.module.scss'
import nothingImg from '../../assets/img/big-icons/items-not-found.svg';

type NotFoundBlockProps = {
    className: string;
    text: string;
}

const NotFoundBlock: React.FC<NotFoundBlockProps> = ({ className, text }) => {
    return (
        <div className={s['wrapper']}>
            <div className={s[className]}>
                <img src={nothingImg} alt="nothing-img" />
            </div>
            <p className={s['nothing-text']}>{text}</p>
        </div>
    )
}

export default NotFoundBlock