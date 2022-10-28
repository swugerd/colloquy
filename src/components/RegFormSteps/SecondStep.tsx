import React, { useState } from 'react';
import Select from 'react-select';
import Input from '../UI/Input/Input';
import s from './RegFormSteps.module.scss';

const SecondStep: React.FC = () => {
  const cities = [
    { value: 'moscow', label: 'Москва' },
    { value: 'ivanteevka', label: 'Ивантеевка' },
    { value: 'pivo', label: 'Пиво' },
    { value: 'moscow', label: 'Гараж' },
    { value: 'ivanteevka', label: 'Козел' },
    { value: 'pivo', label: 'что' },
  ];
  const customStyles = {
    control: (provided: any, state: any) => ({
      ...provided,
      background: '#1f1f1f',
      border: 'none',
      boxShadow: state.isFocused ? '0 0 0 2px #0f9c72' : '',
      borderRadius: state.menuIsOpen ? '1rem 1rem 0 0' : '1rem',
      cursor: 'pointer',
      transition: '0.2s linear box-shadow',
      color: 'white',
      ':hover': {
        boxShadow: '0 0 0 2px #0f9c72',
      },
    }),
    placeholder: (provided: any, state: any) => ({
      ...provided,
      fontFamily: 'OpenSans',
      fontSize: '1.4rem',
      color: '#9b9b9b',
      fontWeight: '600',
    }),
    indicatorSeparator: (provided: any, state: any) => ({
      ...provided,
      display: 'none',
    }),
    option: (provided: any, state: any) => ({
      ...provided,
      cursor: 'pointer',
      borderRadius: '1rem',
      fontFamily: 'Montserrat',
      fontSize: '1.6rem',
      fontWeight: '600',
      color: 'white',
      background: state.isFocused ? 'rgba(31, 31, 31, 0.5)' : '',
      backgroundColor: state.isDisabled ? 'rgba(31, 31, 31, 0.5)' : '',
    }),
    menu: (provided: any, state: any) => ({
      ...provided,
      top: '3.2rem',
      borderRadius: '0 0 1rem 1rem',
      background: '#3d3d3d',
      // '@media only screen and (max-width: 1200px)': {
      //   ...provided['@media only screen and (max-width: 1200px)'],
      //   display: 'none',
      // },
    }),
    menuList: (provided: any, state: any) => ({
      ...provided,
      maxHeight: '15rem',
      padding: '1rem',
      '::-webkit-scrollbar': {
        background: 'transparent',
        width: '0.3rem',
      },
      '::-webkit-scrollbar-thumb': {
        background: '#0f9c72',
        border: '1rem solid rgba(0, 0, 0, 0)',
        borderRadius: '1rem',
      },
    }),
  };
  return (
    <>
      <div className={s['input-block']}>
        <label className={s['label']} htmlFor="firstname">
          Имя <span className={s['required']}>*</span>
        </label>
        <Input
          className={'auth-input'}
          placeholder={'Иван'}
          type={'text'}
          inputType={'default'}
          id="firstname"
        />
      </div>
      <div className={s['input-block']}>
        <label className={s['label']} htmlFor="lastname">
          Фамилия <span className={s['required']}>*</span>
        </label>
        <Input
          className={'auth-input'}
          placeholder={'Иванов'}
          type={'text'}
          inputType={'default'}
          id="lastname"
        />
      </div>
      <div className={s['input-block']}>
        <label className={s['label']} htmlFor="patronymic">
          Отчество
        </label>
        <Input
          className={'auth-input'}
          placeholder={'Иванович'}
          type={'text'}
          inputType={'default'}
          id="patronymic"
        />
      </div>
      <div className={s['input-block']}>
        <label className={s['label']} htmlFor="birthDate">
          Дата рождения <span className={s['required']}>*</span>
        </label>
        <Input
          className={'auth-input'}
          placeholder={'__/__/____'}
          type={'date'}
          inputType={'default'}
          id="birthDate"
        />
      </div>
      <div className={s['input-block']}>
        <label className={s['label']} htmlFor="password">
          Пол <span className={s['required']}>*</span>
        </label>
        <div className={`${s['input-block']} ${s['d-flex']}`}>
          <div className={s['radio-btn']}>
            <input type="radio" name="gender" className={s['inp-disabled']} />
            <div className={`${s['custom-btn']} ${s['male']}`}>
              <svg
                width="29"
                height="29"
                viewBox="0 0 29 29"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  className={s['path']}
                  d="M24 17C24 23.6274 18.6274 29 12 29C5.37258 29 0 23.6274 0 17C0 10.3726 5.37258 5 12 5C18.6274 5 24 10.3726 24 17ZM2.05857 17C2.05857 22.4905 6.5095 26.9414 12 26.9414C17.4905 26.9414 21.9414 22.4905 21.9414 17C21.9414 11.5095 17.4905 7.05857 12 7.05857C6.5095 7.05857 2.05857 11.5095 2.05857 17Z"
                  fill="white"
                />
                <circle cx="8" cy="19" r="1" fill="white" />
                <circle cx="16" cy="19" r="1" fill="white" />
                <path
                  d="M8.5 23C8.5 23 9.46958 23.7904 10.5 24C11.6481 24.2335 12.3697 24.3083 13.5 24C14.3425 23.7702 15.5 23 15.5 23"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <path
                  d="M1 17L2.97183 16.2606C4.30844 15.7593 5.52226 14.9777 6.53166 13.9683L7.12951 13.3705C7.70765 12.7923 8.21271 12.1455 8.63337 11.4444L9.41215 10.1464C9.45147 10.0809 9.5468 10.0819 9.58472 10.1483L10.1147 11.0758C11.0209 12.6616 12.3441 13.969 13.9407 14.856L14.7305 15.2947C15.5724 15.7625 16.4775 16.1061 17.4176 16.315L19.4284 16.7619C20.1407 16.9201 20.8681 17 21.5977 17H23"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <path
                  className={s['path']}
                  d="M19.7929 7.79289C19.4024 8.18342 19.4024 8.81658 19.7929 9.20711C20.1834 9.59763 20.8166 9.59763 21.2071 9.20711L19.7929 7.79289ZM28 1H29C29 0.447715 28.5523 0 28 0V1ZM21.5 0C20.9477 0 20.5 0.447715 20.5 1C20.5 1.55228 20.9477 2 21.5 2V0ZM27 7C27 7.55228 27.4477 8 28 8C28.5523 8 29 7.55228 29 7H27ZM21.2071 9.20711L28.7071 1.70711L27.2929 0.292893L19.7929 7.79289L21.2071 9.20711ZM28 0H21.5V2H28V0ZM29 7V1H27V7H29Z"
                  fill="white"
                />
              </svg>
            </div>
          </div>
          <div className={s['radio-btn']}>
            <input type="radio" name="gender" className={s['inp-disabled']} />
            <div className={`${s['custom-btn']} ${s['female']}`}>
              <svg
                width="30"
                height="31"
                viewBox="0 0 30 31"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  className={s['path']}
                  d="M27 13C27 19.6274 21.6274 25 15 25C8.37258 25 3 19.6274 3 13C3 6.37258 8.37258 1 15 1C21.6274 1 27 6.37258 27 13ZM5.05857 13C5.05857 18.4905 9.5095 22.9414 15 22.9414C20.4905 22.9414 24.9414 18.4905 24.9414 13C24.9414 7.5095 20.4905 3.05857 15 3.05857C9.5095 3.05857 5.05857 7.5095 5.05857 13Z"
                  fill="white"
                />
                <path
                  d="M1 8.5L1.36862 5.55104C1.45525 4.85798 1.68561 4.19064 2.04496 3.59173L2.18252 3.36247C2.71004 2.48327 3.53467 1.82178 4.50737 1.49754L4.72874 1.42375C5.54958 1.15014 6.44083 1.17633 7.24418 1.49767V1.49767C7.8914 1.75656 8.1364 2.54539 7.74974 3.1254L7.46265 3.55603C6.83873 4.4919 5.92068 5.19311 4.85362 5.54879L4.72278 5.59241C3.91864 5.86045 3.18796 6.31204 2.58859 6.91141L1 8.5ZM1 8.5V10.5"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <path
                  d="M28.5 8.5L28.1314 5.55104C28.0447 4.85798 27.8144 4.19064 27.455 3.59173L27.3175 3.36247C26.79 2.48327 25.9653 1.82178 24.9926 1.49754L24.7713 1.42375C23.9504 1.15014 23.0592 1.17633 22.2558 1.49767V1.49767C21.6086 1.75656 21.3636 2.54539 21.7503 3.1254L22.0374 3.55603C22.6613 4.4919 23.5793 5.19311 24.6464 5.54879L24.7772 5.59241C25.5814 5.86045 26.312 6.31204 26.9114 6.91141L28.5 8.5ZM28.5 8.5V10.5"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <path
                  d="M4 11.5H7.94458C7.97905 11.5 8.0111 11.4822 8.02938 11.453L10.4055 7.6512C10.4469 7.58498 10.5448 7.58963 10.5797 7.65948L12.4724 11.4447C12.4893 11.4786 12.5239 11.5 12.5618 11.5H17.4382C17.4761 11.5 17.5107 11.4786 17.5276 11.4447L19.4203 7.65948C19.4552 7.58963 19.5531 7.58498 19.5945 7.6512L21.9706 11.453C21.9889 11.4822 22.0209 11.5 22.0554 11.5H26"
                  stroke="white"
                  strokeWidth="2"
                />
                <path
                  d="M15 24V29.5M12.5 27.5H17"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <circle cx="11" cy="15" r="1" fill="white" />
                <circle cx="19" cy="15" r="1" fill="white" />
                <path
                  d="M11.5 19C11.5 19 12.4696 19.7904 13.5 20C14.6481 20.2335 15.3697 20.3083 16.5 20C17.3425 19.7702 18.5 19 18.5 19"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div className={s['input-block']}>
        <label className={s['label']} htmlFor="city">
          Город
        </label>
        <div>
          <Select placeholder="Выберите из списка" options={cities} styles={customStyles} />
        </div>
      </div>
    </>
  );
};

export default SecondStep;
