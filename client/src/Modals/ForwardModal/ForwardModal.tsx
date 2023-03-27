import React, { useRef, useState } from 'react';
import Icon from '../../components/UI/Icon/Icon';
import ModalLayout from '../../layouts/ModalLayout/ModalLayout';
import userSvg from '../../assets/img/icons/user.svg';
import groupSvg from '../../assets/img/icons/groups.svg';
import messageSvg from '../../assets/img/icons/chat.svg';
import searchSvg from '../../assets/img/icons/search.svg';
import s from './ForwardModal.module.scss';
import img from '../../assets/uploads/test/image2.png';
import postSvg from '../../assets/img/icons/post.svg';
import video from '../../assets/videos/video.mp4';
import SelectComponent from '../../components/UI/SelectComponent/SelectComponent';
import Input from '../../components/UI/Input/Input';
import MediaToUpload from '../../components/MediaToUpload/MediaToUpload';
import MusicTrack from '../../components/MusicTrack/MusicTrack';
import useWindowSize from './../../hooks/useWindowResize';

type ForwardModalProps = {
  onClose: () => void;
};

const ForwardModal: React.FC<ForwardModalProps> = ({ onClose }) => {
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

  const { width } = useWindowSize();

  const hasMediaToUpload = false;

  const [selectedIndex, setSelectedIndex] = useState(0);

  const tabs = [
    {
      id: 1,
      text: 'К себе на стену',
      iconSettings: {
        id: 'profile',
        src: userSvg,
        className: 'white',
      },
    },
    {
      id: 2,
      text: 'В сообщество',
      iconSettings: {
        id: 'groups',
        src: groupSvg,
        className: 'white',
      },
    },
    {
      id: 3,
      text: 'В личном сообщении',
      iconSettings: {
        id: 'messages',
        src: messageSvg,
        className: 'white',
      },
    },
  ];

  const title = [
    { id: 1, title: 'Переслать фотографию', type: 'photo' },
    { id: 2, title: 'Переслать видео', type: 'video' },
    { id: 3, title: 'Переслать трек', type: 'audio' },
    { id: 4, title: 'Переслать запись', type: 'post' },
  ].find(({ type }) => type === 'photo')?.title;

  const previewContent = {
    content: {
      src: img,
    },
    type: 'photo',
  };

  return (
    <ModalLayout className={'forward'} onClose={onClose} title={title || 'Переслать ...'}>
      <div className={s['top']}>
        <div className={s['left']}>
          <ul className={s['list']}>
            {tabs.map(({ id, text, iconSettings }, index) => (
              <li
                className={`${s['item']} ${selectedIndex === index ? s['active'] : ''}`}
                key={id}
                onClick={() => setSelectedIndex(index)}>
                <button>
                  <div className={s['icon']}>
                    <Icon
                      src={iconSettings.src}
                      id={iconSettings.id}
                      className={iconSettings.className}
                    />
                  </div>
                  <span>{text}</span>
                </button>
              </li>
            ))}
          </ul>
          {selectedIndex !== 0 && width > 550 && (
            <SelectComponent
              placeholder={
                selectedIndex === 2 ? 'Введите имя собеседника' : 'Введите название сообщества'
              }
              options={users}
              noOptionsMessage={'Собеседник не найден'}
              className={'forward-search'}
              indicatorIconSettings={{
                id: 'search',
                src: searchSvg,
                className: 'search-dropdown',
              }}
              name={''}
              value={''}
              setValue={() => {}}
            />
          )}
        </div>
        <div className={s['right']}>
          <div className={s['image']}>
            {previewContent.type === 'photo' && <img src={previewContent.content.src} alt="" />}
            {previewContent.type === 'video' && <video src={previewContent.content.src} />}
            {previewContent.type === 'audio' && 'audio'}
            {previewContent.type === 'post' && 'post'}
          </div>
        </div>
      </div>
      {selectedIndex !== 0 && width <= 550 && (
        <div className={s['forward-targets']}>
          <Input
            className={'forward-mobile'}
            placeholder={
              selectedIndex === 2 ? 'Введите имя собеседника' : 'Введите название сообщества'
            }
            type={'text'}
            inputType={'search'}
            name={''}
            value={''}
            setValue={() => {}}
          />
          <ul className={s['targets-list']}>
            {users.map(({ id, label, img }) => (
              <li className={s['target-item']} key={id}>
                <div className={s['user-img']}>
                  <img src={img} alt="" />
                </div>
                <span className={s['user-name']}>{label}</span>
                <button className={s['forward-btn']}>Отправить</button>
              </li>
            ))}
          </ul>
        </div>
      )}
      <div className={s['bottom']}>
        <Input
          className={hasMediaToUpload ? 'forward-modal' : 'forward-modal-round'}
          placeholder={'Ваше сообщение'}
          type={'text'}
          inputType={'send'}
          isTextarea={true}
          page="message"
          name={''}
          value={''}
          setValue={() => {}}
        />
        {hasMediaToUpload && <MediaToUpload className={'forward-media'} />}
      </div>
    </ModalLayout>
  );
};

export default ForwardModal;
