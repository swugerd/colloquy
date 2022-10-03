import React, { useRef, useState } from 'react';
import search from '../../../assets/img/icons/search.svg';
import paperclip from '../../../assets/img/icons/paperclip.svg';
import smile from '../../../assets/img/icons/smile.svg';
import micro from '../../../assets/img/icons/micro.svg';
import send from '../../../assets/img/icons/send.svg';
import s from './Input.module.scss';

type InputProps = {
  className: string;
  placeholder: string;
  type: string;
  inputType: 'send' | 'search' | 'default';
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
          />
        </div>
      )}
      {inputType === 'search' && (
        <div className={s['input-block']}>
          <img className={s[searchIcon]} src={search} alt="icon" />
          <input
            className={`${s['input']} ${s[className]}`}
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={changeValueHandler}
            ref={inputRef}
          />
          <button className={`${s[closeIcon]} ${value && s.active}`} onClick={clearInputHandler}>
            <svg
              width="17"
              height="17"
              viewBox="0 0 17 17"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <line
                x1="4.96468"
                y1="4.96448"
                x2="12.0357"
                y2="12.0355"
                stroke="white"
                strokeLinecap="round"
              />
              <line
                x1="12.0356"
                y1="4.96443"
                x2="4.96458"
                y2="12.0355"
                stroke="white"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>
      )}
      {inputType === 'send' && (
        <div className={s['input-block']}>
          <button className={s[paperclipIcon]}>
            <img src={paperclip} alt="icon" />
          </button>
          <input
            className={`${s['input']} ${s[className]}`}
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={changeValueHandler}
          />
          <button className={s[smileIcon]}>
            <img src={smile} alt="smile" />
          </button>
          {/* <button className={s[microIcon]}>
                        <img src={micro} alt="voice" />
                    </button> */}
          <button className={s[sendIcon]}>
            <img src={send} alt="send" />
          </button>
        </div>
      )}
    </>
  );
};

export default Input;
