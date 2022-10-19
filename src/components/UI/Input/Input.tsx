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
          <svg
            className={s[searchIcon]}
            width="25"
            height="25"
            viewBox="0 0 25 25"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M23 22.5C20.0711 19.7663 16.5 16 16.5 16M16.5 16L14.6364 17.2902C11.8617 19.2111 8.17405 19.161 5.45262 17.1653V17.1653C3.5796 15.7917 2.40462 13.6646 2.23913 11.3478L2.20036 10.805C2.07048 8.98676 2.54875 7.17688 3.55992 5.66011L3.64637 5.53044C5.11679 3.32482 7.59223 2 10.2431 2V2C13.1711 2 15.8607 3.61378 17.2386 6.1973L17.4771 6.64451C18.46 8.48747 18.8318 10.6475 18.1412 12.6187C18.0947 12.7514 18.0475 12.8792 18 13C17.5205 14.2189 16.5 16 16.5 16Z"
              stroke="white"
              strokeWidth="4"
              strokeLinecap="round"
            />
          </svg>
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
            <svg
              width="22"
              height="23"
              viewBox="0 0 22 23"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M1 10.5L9.77976 2.55641C10.8869 1.55468 12.3268 1 13.8198 1V1C15.2285 1 16.5927 1.49388 17.6749 2.39571L17.7333 2.44446C18.5635 3.13625 19.1995 4.03202 19.5789 5.04383L19.6087 5.12308C20.1821 6.65231 20.1638 8.34058 19.5572 9.85698L19.223 10.6924C18.7467 11.8833 18.0178 12.9568 17.0867 13.8389L10.3313 20.2388C9.47644 21.0486 8.34371 21.5 7.16619 21.5V21.5C6.08959 21.5 5.04706 21.1226 4.22 20.4333L4.1033 20.3361C3.08739 19.4895 2.5 18.2354 2.5 16.913V16.913C2.5 15.6916 3.00138 14.5237 3.8869 13.6824L11.4419 6.50522C12.0867 5.89263 13.0293 5.71171 13.8551 6.04204V6.04204C14.5693 6.32774 15.091 6.95483 15.2418 7.70914L15.2564 7.78205C15.4093 8.54638 15.1836 9.33749 14.6505 9.90614L8 17"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
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
            <svg
              width="25"
              height="25"
              viewBox="0 0 25 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M21.5808 19.6349C21.994 19.9596 22.5956 19.8896 22.8879 19.4529C24.4579 17.1073 25.1933 14.2898 24.9565 11.4585C24.6933 8.30994 23.2475 5.37791 20.91 3.25219C18.5725 1.12647 15.5168 -0.0352167 12.3575 0.000812777C9.19815 0.0368423 6.16969 1.26792 3.88129 3.44639C1.59289 5.62486 0.214343 8.5891 0.0229546 11.7428C-0.168434 14.8965 0.841541 18.0057 2.84971 20.4449C4.85787 22.8841 7.71524 24.4724 10.847 24.8902C13.6633 25.2659 16.5135 24.6701 18.9335 23.2173C19.3841 22.9468 19.4835 22.3494 19.1796 21.9207V21.9207C18.8756 21.492 18.2835 21.395 17.8293 21.6593C15.8049 22.8373 13.438 23.3159 11.0987 23.0038C8.44371 22.6496 6.02137 21.3032 4.31895 19.2353C2.61652 17.1675 1.76031 14.5317 1.92256 11.8581C2.08481 9.18453 3.25348 6.67159 5.19347 4.82478C7.13347 2.97798 9.70085 1.93433 12.3792 1.90379C15.0575 1.87324 17.648 2.85807 19.6296 4.66015C21.6112 6.46223 22.8369 8.94787 23.0601 11.617C23.2567 13.9688 22.6622 16.3094 21.3861 18.2734C21.0998 18.7141 21.1675 19.3102 21.5808 19.6349V19.6349Z"
                fill="white"
              />
              <path
                d="M8 15L9.17818 16.0473C11.0726 17.7312 13.9274 17.7312 15.8218 16.0473L17 15"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <path
                d="M10 10V10C9.52464 7.86088 6.47536 7.86088 6 10V10"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <path
                d="M19 10V10C18.5246 7.86088 15.4754 7.86088 15 10V10"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </button>
          {/* <button className={s[microIcon]}>
                        <img src={micro} alt="voice" />
                    </button> */}
          <button className={s[sendIcon]}>
            <svg
              width="29"
              height="25"
              viewBox="0 0 29 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path d="M29 12.5L0 25V15L20.5 12.5H29Z" fill="white" />
              <path d="M29 12.5L0 0V9.5L20.5 12.5H29Z" fill="white" />
            </svg>
          </button>
        </div>
      )}
    </>
  );
};

export default Input;
