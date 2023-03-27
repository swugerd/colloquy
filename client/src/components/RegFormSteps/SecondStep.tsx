import React, { useState } from 'react';
import Icon from '../UI/Icon/Icon';
import Input from '../UI/Input/Input';
import s from './RegFormSteps.module.scss';
import iconS from '../UI/Icon/Icon.module.scss';
import maleSvg from '../../assets/img/icons/male.svg';
import femaleSvg from '../../assets/img/icons/female.svg';
import SelectComponent from '../UI/SelectComponent/SelectComponent';
import GenderInput from '../UI/GenderInput/GenderInput';
import Button from '../UI/Button/Button';
import { useAxios } from '../../hooks/useAxios';

// поменять типы

type SecondStepProps = {
  user_name: string;
  user_surname: string;
  user_patronymic: string;
  user_birthdate: string;
  user_gender: string;
  city_id: any;
  updateFields: (fields: any) => void;
  onSubmit: (event: any) => void;
  cities: {
    id: number;
    value: string;
    label: string;
  }[];
  isLoading: boolean;
  error: any;
};

const SecondStep: React.FC<SecondStepProps> = ({
  user_name,
  user_surname,
  user_patronymic,
  user_birthdate,
  user_gender,
  city_id,
  updateFields,
  onSubmit,
  isLoading,
  error,
  cities,
}) => {
  return (
    <form onSubmit={onSubmit}>
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
          name="user_name"
          value={user_name}
          setValue={updateFields}
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
          name="user_surname"
          value={user_surname}
          setValue={updateFields}
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
          name="user_patronymic"
          value={user_patronymic}
          setValue={updateFields}
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
          name="user_birthdate"
          value={user_birthdate}
          setValue={updateFields}
        />
      </div>
      <div className={s['input-block']}>
        <label className={s['label']} htmlFor="password">
          Пол <span className={s['required']}>*</span>
        </label>
        <div className={`${s['input-block']} ${s['d-flex']}`}>
          <GenderInput
            type={'male'}
            icon={maleSvg}
            inputType={'radio'}
            value={'male'}
            setValue={updateFields}
            checked={user_gender === 'male' ? true : false}
          />
          <GenderInput
            type={'female'}
            icon={femaleSvg}
            inputType={'radio'}
            value={'female'}
            setValue={updateFields}
            checked={user_gender === 'female' ? true : false}
          />
        </div>
      </div>
      <div className={s['input-block']}>
        <label className={s['label']} htmlFor="city">
          Город
        </label>
        {!isLoading && (
          <div>
            <SelectComponent
              placeholder={'Выберите из списка'}
              options={cities}
              noOptionsMessage={'Город не найден'}
              name={'city_id'}
              setValue={updateFields}
              value={city_id}
            />
          </div>
        )}
      </div>
      <Button className={'reg-btn'} text={'Следующий шаг'} />
    </form>
  );
};

export default SecondStep;
