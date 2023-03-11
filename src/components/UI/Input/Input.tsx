import React, { useEffect, useRef, useState } from 'react';
import searchSvg from '../../../assets/img/icons/search.svg';
import closeSvg from '../../../assets/img/icons/close.svg';
import paperclipSvg from '../../../assets/img/icons/paperclip.svg';
import smileSvg from '../../../assets/img/icons/smile.svg';
import microSvg from '../../../assets/img/icons/micro.svg';
import sendSvg from '../../../assets/img/icons/send.svg';
import s from './Input.module.scss';
import Icon from '../Icon/Icon';
import { useAppDispatch } from '../../../redux/store';
import { setIsUploadFilesModalOpen, setIsUploadMediaModalOpen } from '../../../redux/modal/slice';

type InputProps = {
  className: string;
  placeholder: string;
  type: string;
  inputType: 'send' | 'search' | 'default';
  id?: string;
  isTextarea?: boolean;
  page?: string;
  button?: any;
  initialValue?: string;
  classOptions?: {
    searchIcon?: string;
    closeIcon?: string;
    paperclipIcon?: string;
    smileIcon?: string;
    microIcon?: string;
    sendIcon?: string;
  };
};

const Input: React.FC<InputProps> = ({
  className,
  placeholder,
  type = 'default',
  inputType,
  button,
  isTextarea,
  id,
  page,
  initialValue,
  classOptions = {
    searchIcon: 'search-icon',
    closeIcon: 'close-icon',
    paperclipIcon: 'paperclip-icon',
    smileIcon: 'smile-icon',
    microIcon: 'micro-icon',
    sendIcon: 'send-icon',
  },
}) => {
  const [value, setValue] = useState(initialValue ? initialValue : '');
  const inputRef = useRef<HTMLInputElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const { searchIcon, closeIcon, paperclipIcon, smileIcon, microIcon, sendIcon } = classOptions;

  const dispatch = useAppDispatch();

  const handleModalOpen = (e: any) => {
    e.stopPropagation();
    dispatch(setIsUploadFilesModalOpen(true));
  };

  useEffect(() => {
    if (button) button.current = buttonRef.current;
    if (inputRef.current && initialValue) {
      inputRef.current.style.width = initialValue?.length * 20 + 'px';
    }
  }, [button, initialValue]);

  const textAreaAdjust = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    e.target.style.height = '1px';
    e.target.style.height = `${e.target.scrollHeight}px`;
    if (e.target.value === '') {
      e.target.style.height = '1px';
    }
  };

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
            ref={inputRef}
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
          <button
            className={`${s[closeIcon ? closeIcon : 'close-icon']} ${value && s.active}`}
            onClick={clearInputHandler}>
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
          <button
            className={s[paperclipIcon ? paperclipIcon : 'paperclip-icon']}
            ref={buttonRef}
            type="button"
            onClick={(e) => handleModalOpen(e)}>
            <Icon src={paperclipSvg} id={'paperclip'} className={'gray'} />
          </button>
          {isTextarea ? (
            <textarea
              className={s[className]}
              placeholder={placeholder}
              onChange={textAreaAdjust}></textarea>
          ) : (
            <input
              className={`${s['input']} ${s[className]}`}
              type={type}
              placeholder={placeholder}
              value={value}
              onChange={changeValueHandler}
              id={id}
            />
          )}
          <button className={s[smileIcon ? smileIcon : 'smile-icon']} type="button">
            <Icon src={smileSvg} id={'smile'} className={'gray'} />
          </button>
          {/* <button className={s[microIcon]}>
                        <img src={micro} alt="voice" />
                    </button> */}
          {page === 'message' ? (
            <button className={s[sendIcon ? sendIcon : 'send-icon']}>
              <Icon src={sendSvg} id={'send'} className={'gray'} />
            </button>
          ) : (
            ''
          )}
        </div>
      )}
    </>
  );
};

export default Input;
