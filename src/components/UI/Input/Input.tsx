import React, { useRef, useState } from 'react';
import searchSvg from '../../../assets/img/icons/search.svg';
import closeSvg from '../../../assets/img/icons/close.svg';
import paperclipSvg from '../../../assets/img/icons/paperclip.svg';
import smileSvg from '../../../assets/img/icons/smile.svg';
import microSvg from '../../../assets/img/icons/micro.svg';
import sendSvg from '../../../assets/img/icons/send.svg';
import s from './Input.module.scss';
import Icon from '../Icon/Icon';

type InputProps = {
  className: string;
  placeholder: string;
  type: string;
  inputType: 'send' | 'search' | 'default';
  id?: string;
  classOptions?: {
    searchIcon: string;
    closeIcon: string;
    paperclipIcon: string;
    smileIcon: string;
    microIcon: string;
    sendIcon: string;
  };
};

const Input: React.FC<InputProps> = ({
  className,
  placeholder,
  type = 'default',
  inputType,
  id,
  classOptions = {
    searchIcon: 'search-icon',
    closeIcon: 'close-icon',
    paperclipIcon: 'paperclip-icon',
    smileIcon: 'smile-icon',
    microIcon: 'micro-icon',
    sendIcon: 'send-icon',
  },
}) => {
  const [value, setValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const { searchIcon, closeIcon, paperclipIcon, smileIcon, microIcon, sendIcon } = classOptions;

  const changeValueHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const clearInputHandler = () => {
    setValue('');
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <>
      {inputType === 'default' && (
        <div className={s['input-block']}>
          <input
            className={`${s['input']} ${s[className]}`}
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={changeValueHandler}
            id={id}
          />
        </div>
      )}
      {inputType === 'search' && (
        <div className={s['input-block']}>
          <Icon src={searchSvg} id={'search'} className={'inp-search'} />
          <input
            className={`${s['input']} ${s[className]}`}
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={changeValueHandler}
            ref={inputRef}
            id={id}
          />
          <button className={`${s[closeIcon]} ${value && s.active}`} onClick={clearInputHandler}>
            <Icon
              src={closeSvg}
              id={'close'}
              className={'close-inp'}
              hoverClass={value ? 'active' : ''}
            />
          </button>
        </div>
      )}
      {inputType === 'send' && (
        <div className={s['input-block']}>
          <button className={s[paperclipIcon]}>
            <Icon src={paperclipSvg} id={'paperclip'} className={'gray'} />
          </button>
          <input
            className={`${s['input']} ${s[className]}`}
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={changeValueHandler}
            id={id}
          />
          <button className={s[smileIcon]}>
            <Icon src={smileSvg} id={'smile'} className={'gray'} />
          </button>
          {/* <button className={s[microIcon]}>
                        <img src={micro} alt="voice" />
                    </button> */}
          <button className={s[sendIcon]}>
            <Icon src={sendSvg} id={'send'} className={'gray'} />
          </button>
        </div>
      )}
    </>
  );
};

export default Input;
