import React, { useRef } from 'react';
import Icon from '../../components/UI/Icon/Icon';
import ModalLayout from '../../layouts/ModalLayout/ModalLayout';
import userSvg from '../../assets/img/icons/user.svg';
import groupSvg from '../../assets/img/icons/groups.svg';
import messageSvg from '../../assets/img/icons/chat.svg';
import searchSvg from '../../assets/img/icons/search.svg';
import s from './ForwardModal.module.scss';
import img from '../../assets/uploads/test/image2.png';
import SelectComponent from '../../components/UI/SelectComponent/SelectComponent';
import Input from '../../components/UI/Input/Input';
import MediaToUpload from '../../components/MediaToUpload/MediaToUpload';

// доделать компонент (сделать табы для стены сообщества и сообшений)

// адаптив

// посмотреть, что делать, когда открыта модалка репоста и нажата кнопка добавить файл (открывать модалку поверх другой)

type ForwardModalProps = {
  onClose: () => void;
  button: any;
};

const ForwardModal: React.FC<ForwardModalProps> = ({ onClose, button }) => {
  const users = [
    {
      id: 1,
      label: 'Пашкентио рабадулио кринжулио дабстеп дропчик',
      img,
      value: 'Пашкентио рабадулио кринжулио',
    },
    { id: 2, label: 'пашок', img, value: 'пашок' },
    { id: 3, label: 'скамерулио', img, value: 'скамерулио' },
    { id: 4, label: 'дабстеп гейминг', img, value: 'дабстеп гейминг' },
  ];
  const hasMediaToUpload = true;
  return (
    <ModalLayout
      className={'forward'}
      onClose={onClose}
      button={button}
      title={'Переслать фотографию'}>
      <div className={s['top']}>
        <div className={s['left']}>
          <ul className={s['list']}>
            <li className={s['item']}>
              <button>
                <div className={s['icon']}>
                  <Icon src={userSvg} id={'profile'} className={'white'} />
                </div>
                <span>К себе на стену</span>
              </button>
            </li>
            <li className={s['item']}>
              <button>
                <div className={s['icon']}>
                  <Icon src={groupSvg} id={'groups'} className={'white'} />
                </div>
                <span>В сообщество</span>
              </button>
            </li>
            <li className={s['item']}>
              <button>
                <div className={s['icon']}>
                  <Icon src={messageSvg} id={'messages'} className={'white'} />
                </div>
                <span>В личном сообщении</span>
              </button>
            </li>
          </ul>
          <SelectComponent
            placeholder={'Введите имя собеседника'}
            options={users}
            noOptionsMessage={'Собеседник не найден'}
            className={'forward-search'}
            indicatorIconSettings={{
              id: 'search',
              src: searchSvg,
              className: 'search-dropdown',
            }}
          />
        </div>
        <div className={s['right']}>
          <div className={s['image']}>
            <img src={img} alt="" />
          </div>
        </div>
      </div>
      <div className={s['bottom']}>
        <Input
          className={hasMediaToUpload ? 'forward-modal' : 'forward-modal-round'}
          placeholder={'Ваше сообщение'}
          type={'text'}
          inputType={'send'}
          isTextarea={true}
          page="message"
        />
        {hasMediaToUpload && <MediaToUpload className={'forward-media'} />}
      </div>
    </ModalLayout>
  );
};

export default ForwardModal;
