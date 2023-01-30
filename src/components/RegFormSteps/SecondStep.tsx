import React, { useState } from 'react';
import Icon from '../UI/Icon/Icon';
import Input from '../UI/Input/Input';
import s from './RegFormSteps.module.scss';
import iconS from '../UI/Icon/Icon.module.scss';
import maleSvg from '../../assets/img/icons/male.svg';
import femaleSvg from '../../assets/img/icons/female.svg';
import SelectComponent from '../UI/SelectComponent/SelectComponent';
import GenderInput from '../UI/GenderInput/GenderInput';

const SecondStep: React.FC = () => {
  const cities = [
    { value: 'moscow', label: 'Москва' },
    { value: 'ivanteevka', label: 'Ивантеевка' },
    { value: 'pivo', label: 'Пиво' },
    { value: 'da', label: 'Козел' },
  ];
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
          <GenderInput type={'male'} icon={maleSvg} inputType={'radio'} />
          <GenderInput type={'female'} icon={femaleSvg} inputType={'radio'} />
        </div>
      </div>
      <div className={s['input-block']}>
        <label className={s['label']} htmlFor="city">
          Город
        </label>
        <div>
          <SelectComponent
            placeholder={'Выберите из списка'}
            options={cities}
            noOptionsMessage={'Город не найден'}
          />
        </div>
      </div>
    </>
  );
};

export default SecondStep;
