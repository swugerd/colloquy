import React, { useState } from 'react';
import Input from '../../components/UI/Input/Input';
import ModalLayout from '../../layouts/ModalLayout/ModalLayout';
import img from '../../assets/uploads/test/image.png';
import s from './CreateBaseModal.module.scss';
import InputButton from '../../components/UI/InputButton/InputButton';
import avatar from '../../assets/img/big-icons/upload-photo.png';
import Button from '../../components/UI/Button/Button';
import { useSelector } from 'react-redux';
import { selectModal } from './../../redux/modal/selector';
import MusicTrack from './../../components/MusicTrack/MusicTrack';

type CreateBaseModalProps = {
  onClose: () => void;
  title: 'Создать беседу' | 'Создать плейлист';
};

const CreateBaseModal: React.FC<CreateBaseModalProps> = ({ onClose, title }) => {
  const users = [
    { id: 1, name: 'Egor_B', img },
    { id: 2, name: 'Egor_B', img },
    { id: 3, name: 'Egor_B', img },
    { id: 4, name: 'Egor_B', img },
    { id: 5, name: 'Egor_B', img },
    { id: 6, name: 'Egor_B', img },
    { id: 7, name: 'Egor_B', img },
  ];

  const tracks = [
    { id: 1, img, title: 'Трекачок', author: 'Юрчик', time: 62, file: '' },
    { id: 2, img, title: 'Трекачок', author: 'Юрчик', time: 62, file: '' },
    { id: 3, img, title: 'Трекачок', author: 'Юрчик', time: 62, file: '' },
    { id: 4, img, title: 'Трекачок', author: 'Юрчик', time: 62, file: '' },
    { id: 5, img, title: 'Трекачок', author: 'Юрчик', time: 62, file: '' },
    { id: 6, img, title: 'Трекачок', author: 'Юрчик', time: 62, file: '' },
    { id: 7, img, title: 'Трекачок', author: 'Юрчик', time: 62, file: '' },
  ];

  const { modal } = useSelector(selectModal);

  const arrayList: any = modal.createBaseModal.modalType === 'conversation' ? users : tracks;

  const [checkboxes, setCheckboxes] = useState<{
    [key: string]: any;
  }>({});
  const handleCheckboxChange = (event: any) => {
    const { name, checked } = event.target;

    if (!checked) {
      const { [name]: removed, ...rest } = checkboxes;
      setCheckboxes(rest);
    } else {
      setCheckboxes({ ...checkboxes, [name]: checked });
    }
    delete checkboxes[''];
  };

  return (
    <ModalLayout className={'create-base'} onClose={onClose} title={title}>
      <div
        className={`${s['wrapper']} ${
          modal.createBaseModal.modalType === 'playlist' ? s['playlists'] : ''
        }`}>
        <div className={s['left']}>
          <div className={s['block']}>
            <h4 className={s['sub-title']}>
              {modal.createBaseModal.modalType === 'conversation'
                ? 'Пригласить участников'
                : 'Выберите музыку'}
            </h4>
            <Input
              className={'create-base'}
              placeholder={'Искать'}
              type={'text'}
              inputType={'search'}
              name={''}
              value={''}
              setValue={() => {}}
            />
          </div>
          <ul className={s['list']}>
            {arrayList.map((item: any) => (
              <li className={s['item']} key={item.id}>
                <label
                  className={`${s['user']} ${checkboxes[`user${item.id}`] ? s['active'] : ''}`}
                  htmlFor={`user${item.id}`}>
                  {modal.createBaseModal.modalType === 'conversation' ? (
                    <>
                      <div className={s['user-img']}>
                        <img src={img} alt="" />
                      </div>
                      <span className={s['user-name']}>{item.name}</span>
                    </>
                  ) : (
                    <MusicTrack
                      img={item.img}
                      title={item.title}
                      author={item.author}
                      time={item.time}
                      isRecs={false}
                      className={'create-base'}
                    />
                  )}
                  <InputButton
                    checked={checkboxes[`user${item.id}`] || false}
                    onChange={handleCheckboxChange}
                    name={`user${item.id}`}
                    id={`user${item.id}`}
                    className={'create-base'}
                    type={'checkbox'}
                  />
                </label>
              </li>
            ))}
          </ul>
        </div>
        <div className={s['right']}>
          <div className={s['block']}>
            <h4 className={`${s['sub-title']} ${s['desktop']}`}>
              {modal.createBaseModal.modalType === 'conversation'
                ? 'Загрузить фото (необязательно)'
                : 'Загрузить обложку'}
            </h4>
            <div className={s['file-block']}>
              <label className={s['file']} htmlFor="uploadPhoto">
                <div className={s['uploaded-photo']}>
                  <img src={avatar} alt="avatar" />
                </div>
                <p className={`${s['text']} ${s['desktop']}`}>
                  Перетащите или <span>выберите</span> фото
                </p>
                <span className={`${s['text']} ${s['mobile']}`}>Выберите фото</span>
              </label>
              <input className={s['input']} type="file" name="photo" id="uploadPhoto" />
            </div>
          </div>
          <div className={`${s['block']} ${s['caption']}`}>
            <h2 className={`${s['sub-title']} ${s['caption-title']}`}>Название</h2>
            <Input
              className={'base-name'}
              placeholder={'Начните вводить'}
              type={'text'}
              inputType={'default'}
              name={''}
              value={''}
              setValue={() => {}}
            />
            {modal.createBaseModal.modalType === 'conversation' ? (
              ''
            ) : (
              <>
                <label className={s['private']} htmlFor="private">
                  <InputButton
                    checked={undefined}
                    onChange={undefined}
                    name={'private'}
                    id={'private'}
                    className={'create-base'}
                    type={'checkbox'}
                  />
                  <span>Закрытый плейлист</span>
                </label>
              </>
            )}
            {modal.createBaseModal.modalType === 'conversation' && (
              <Button className={'create-base'} text={'Создать'} />
            )}
          </div>
        </div>
        <h4 className={`${s['sub-title']} ${s['mobile']}`}>
          {modal.createBaseModal.modalType === 'conversation'
            ? 'Загрузить фото (необязательно)'
            : 'Загрузить обложку'}
        </h4>
      </div>
      {modal.createBaseModal.modalType === 'playlist' && (
        <Button className={'create-base'} text={'Создать'} />
      )}
    </ModalLayout>
  );
};

export default CreateBaseModal;
