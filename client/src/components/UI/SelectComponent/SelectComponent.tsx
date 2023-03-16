import React from 'react';
import Select, { components } from 'react-select';
import Icon from '../Icon/Icon';
import s from './SelectComponent.module.scss';

type SelectComponentProps = {
  placeholder: string;
  options: {
    value: string;
    label: string;
    img?: string;
  }[];
  noOptionsMessage: string;
  className?: string;
  indicatorIconSettings?: {
    id: string;
    src: string;
    className: string;
  };
  id?: string;
};

const SelectComponent: React.FC<SelectComponentProps> = ({
  placeholder,
  options,
  noOptionsMessage,
  className,
  indicatorIconSettings,
  id,
}) => {
  const DropdownIndicator = (props: any) => {
    return (
      <components.DropdownIndicator {...props}>
        <Icon
          src={indicatorIconSettings ? indicatorIconSettings?.src : ''}
          id={indicatorIconSettings ? indicatorIconSettings?.id : ''}
          className={indicatorIconSettings ? indicatorIconSettings?.className : ''}
        />
      </components.DropdownIndicator>
    );
  };

  const Option = (props: any) => {
    return (
      <components.Option {...props}>
        <div className={s['forward-row']}>
          <div className={s['forward-image']}>
            <img src={props.data.img} alt="" />
          </div>
          <div className={s['forward-text']}>{props.data.label}</div>
        </div>
      </components.Option>
    );
  };

  const handleSelectClick = (event: React.MouseEvent) => {
    event.stopPropagation();
  };

  return (
    <div onClick={handleSelectClick}>
      <Select
        placeholder={placeholder}
        id={id}
        options={options}
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
        components={indicatorIconSettings ? { DropdownIndicator, Option } : {}}
        noOptionsMessage={() => noOptionsMessage}
        captureMenuScroll={false}
      />
    </div>
  );
};

export default SelectComponent;
