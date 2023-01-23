import React, { useState } from 'react';
import Select from 'react-select';
import Icon from '../UI/Icon/Icon';
import Input from '../UI/Input/Input';
import s from './RegFormSteps.module.scss';
import iconS from '../UI/Icon/Icon.module.scss';
import maleSvg from '../../assets/img/icons/male.svg';
import femaleSvg from '../../assets/img/icons/female.svg';

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
            <input
              type="radio"
              name="gender"
              className={`${s['inp-disabled']} ${iconS['inp-check']}`}
            />
            <div className={`${s['custom-btn']} ${s['male']}`}>
              <Icon src={maleSvg} id={'male'} className={'white'} />
            </div>
          </div>
          <div className={s['radio-btn']}>
            <input
              type="radio"
              name="gender"
              className={`${s['inp-disabled']} ${iconS['inp-check']}`}
            />
            <div className={`${s['custom-btn']} ${s['female']}`}>
              <Icon src={femaleSvg} id={'female'} className={'white'} />
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
