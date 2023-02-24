import React from 'react';
import Select from 'react-select';
import s from './SelectComponent.module.scss';

type SelectComponentProps = {
  placeholder: string;
  options: {
    value: string;
    label: string;
  }[];
  noOptionsMessage: string;
  className?: string;
  id?: string;
};

const SelectComponent: React.FC<SelectComponentProps> = ({
  placeholder,
  options,
  noOptionsMessage,
  className,
  id,
}) => {
  return (
    <Select
      placeholder={placeholder}
      id={id}
      options={options}
      // @ts-ignore
      className={`${className ? s[className] : ''}`}
      classNames={{
        control: (state: any) => `${s['control']} ${state.isFocused ? s['focus'] : ''}`,
        placeholder: (state: any) => s['placeholder'],
        indicatorSeparator: (state: any) => s['indicator-separator'],
        option: (state: any) =>
          `${s['option']} ${state.isFocused ? s['focus'] : ''} ${
            state.isSelected ? s['isActive'] : ''
          }`,
        menu: (state: any) => s['menu'],
        menuList: (state: any) => s['menu-list'],
        valueContainer: (state: any) => `${s['value']} ${state.isFocused ? s['focus'] : ''}`,
        noOptionsMessage: (state: any) => s['no-options'],
      }}
      noOptionsMessage={() => noOptionsMessage}
    />
  );
};

export default SelectComponent;
