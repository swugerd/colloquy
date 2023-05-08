import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Icon from '../UI/Icon/Icon';
import backSvg from '../../assets/img/icons/back.svg';
import ebalo from '../../assets/uploads/test/ebalo.png';
import s from './GroupPanel.module.scss';
import Input from '../UI/Input/Input';
import Button from '../UI/Button/Button';
import useWindowSize from '../../hooks/useWindowResize';
import SelectComponent from '../UI/SelectComponent/SelectComponent';
import InputButton from '../UI/InputButton/InputButton';
import track from '../../assets/uploads/test/ebalo.png';
import img from '../../assets/uploads/test/ebalo.png';
import video from '../../assets/videos/video.mp4';
import { useDispatch } from 'react-redux';
import { setBackButtonType, setHasBackButton } from '../../redux/mobile/slice';
import Post from '../Post/Post';
import ContentCard from '../ContentCard/ContentCard';

type GroupPanelProps = {
  page: 'create' | 'edit' | 'suggest' | 'blacklist' | 'moderation' | 'requests';
  title?: string;
};

const GroupPanel: React.FC<GroupPanelProps> = ({ page, title }) => {
  const { width } = useWindowSize();

  const dispatch = useDispatch();

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(setHasBackButton('К списку сообществ'));
    dispatch(setBackButtonType('button'));
    return () => {
      dispatch(setHasBackButton(''));
    };
  }, []);

  const hasError = true;

  const navigate = useNavigate();

  const cities = [
    { id: 1, value: 'moscow', label: 'Москва' },
    { id: 2, value: 'ivanteevka', label: 'Ивантеевка' },
    { id: 3, value: 'pivo', label: 'Пиво' },
    { id: 4, value: 'da', label: 'Козел' },
  ];

  const themes = [
    { id: 1, value: 'politics', label: 'Политика' },
    { id: 2, value: 'games', label: 'Игры' },
    { id: 3, value: 'talking', label: 'Общение' },
    { id: 4, value: 'programming', label: 'Программирование' },
  ];

  const posts = [
    {
      id: 1,
      user: { id: 1, name: 'Пашок Кубыркин', img },
      date: 'Вчера',
      content: {
        text: 'ьууп бу п тыц тут буп буп буп тыц  втфыивтфыdsaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaadsadsadsadsadasdsaивфтывифывт я сегодня поел кашку жескую вкусную сегодня приду нажарю пельменей',
        images: [
          { id: 1, img },
          { id: 2, img },
          { id: 3, img },
          { id: 4, img },
          { id: 5, img },
          { id: 6, img },
          { id: 7, img },
          { id: 8, img },
        ],
        videos: [
          { id: 1, video, time: 5002 },
          { id: 2, video, time: 5122 },
          { id: 3, video, time: 1502 },
          { id: 4, video, time: 1502 },
          { id: 5, video, time: 1502 },
          { id: 6, video, time: 1502 },
        ],
        music: [
          {
            id: 1,
            track,
            time: 123,
            name: 'трек анбеливабл демонстрейшн дота оф эншнс)',
            author: 'NaRk0PaShOk21rus',
          },
          { id: 2, track, time: 123, name: 'best dubstep', author: 'best author' },
          { id: 3, track, time: 123, name: 'best dubstep', author: 'best author' },
          { id: 4, track, time: 123, name: 'best dubstep', author: 'best author' },
          { id: 5, track, time: 123, name: 'best dubstep', author: 'best author' },
          { id: 6, track, time: 123, name: 'best dubstep', author: 'best author' },
        ],
      },
      likes: 2812,
      forwards: 12,
      comments: 4,
      views: 12,
    },
    {
      id: 2,
      user: { id: 1, name: 'Пашок Кубыркин', img },
      date: 'Вчера',
      content: {
        text: 'ьууп бу п тыц тут буп буп буп тыц цуц тсфиыиыфивифывтфыивтфыивфтывифывт я сегодня поел кашку жескую вкусную сегодня приду нажарю пельменей',
        // music: [
        //   {
        //     id: 1,
        //     track,
        //     time: 123,
        //     name: 'трек',
        //     author: 'NaRk0PaShOk21rus',
        //   },
        //   { id: 2, track, time: 123, name: 'best dubstep', author: 'best author' },
        //   { id: 3, track, time: 123, name: 'best dubstep', author: 'best author' },
        //   { id: 4, track, time: 123, name: 'best dubstep', author: 'best author' },
        //   { id: 5, track, time: 123, name: 'best dubstep', author: 'best author' },
        //   { id: 6, track, time: 123, name: 'best dubstep', author: 'best author' },
        // ],
      },
      likes: 2812,
      forwards: 12,
      comments: 4,
      views: 12,
    },
    {
      id: 3,
      user: { id: 1, name: 'Пашок Кубыркин', img },
      date: 'Вчера',
      content: {
        images: [
          { id: 1, img },
          { id: 2, img },
          { id: 3, img },
          { id: 4, img },
          { id: 5, img },
          { id: 6, img },
          { id: 7, img },
          { id: 8, img },
        ],
      },
      likes: 2812,
      forwards: 12,
      comments: 4,
      views: 12,
    },
    {
      id: 4,
      user: { id: 1, name: 'Пашок Кубыркин', img },
      date: 'Вчера',
      content: {
        text: 'ьууп бу п тыц тут буп буп буп тыц цуц тсфиыиыфивифывтфыивтфыивфтывифывт я сегодня поел кашку жескую вкусную сегодня приду нажарю пельменей',
        images: [
          { id: 1, img },
          { id: 2, img },
          { id: 3, img },
          { id: 4, img },
          { id: 5, img },
          { id: 6, img },
          { id: 7, img },
          { id: 8, img },
        ],
        videos: [
          { id: 1, video, time: 5002 },
          { id: 2, video, time: 5122 },
          { id: 3, video, time: 1502 },
          { id: 4, video, time: 1502 },
          { id: 5, video, time: 1502 },
          { id: 6, video, time: 1502 },
        ],
        music: [
          {
            id: 1,
            track,
            time: 123,
            name: 'трек',
            author: 'NaRk0PaShOk21rus',
          },
          { id: 2, track, time: 123, name: 'best dubstep', author: 'best author' },
          { id: 3, track, time: 123, name: 'best dubstep', author: 'best author' },
          { id: 4, track, time: 123, name: 'best dubstep', author: 'best author' },
          { id: 5, track, time: 123, name: 'best dubstep', author: 'best author' },
          { id: 6, track, time: 123, name: 'best dubstep', author: 'best author' },
        ],
      },
      likes: 2812,
      forwards: 12,
      comments: 4,
      views: 12,
    },
  ];

  const users = [
    {
      id: 1,
      name: 'Egor_Bdвфывыф asdhjвыфash',
      img: ebalo,
      status: 'егорчик топчикик кмон брооо егорчик топчикик кмон брооо егорчик топчикик кмон брооо',
    },
    { id: 2, name: 'Egor_B', img: ebalo, lastSeen: 'вчера в 12:22' },
    { id: 3, name: 'Egor_B', img: ebalo },
    { id: 4, name: 'Egor_B', img: ebalo, status: 'егорчик топчик', lastSeen: 'вчера в 12:22' },
    { id: 5, name: 'Egor_B', img: ebalo, status: 'егорчик топчик', lastSeen: 'вчера в 12:22' },
    { id: 6, name: 'Egor_B', img: ebalo, status: 'егорчик топчик', lastSeen: 'вчера в 12:22' },
    { id: 7, name: 'Egor_B', img: ebalo, status: 'егорчик топчик', lastSeen: 'вчера в 12:22' },
    { id: 8, name: 'Egor_B', img: ebalo, status: 'егорчик топчик', lastSeen: 'вчера в 12:22' },
  ];

  return (
    <div className={s['group-create']}>
      <div className={s['top']}>
        <h3 className={s['title']}>{title}</h3>
        {page === 'create' ? (
          <button className={s['row']} onClick={() => navigate(-1)}>
            <div className={s['back-icon']}>
              <Icon src={backSvg} id={'back'} className={'white'} />
            </div>
            <span className={s['back-text']}>К списку сообществ</span>
          </button>
        ) : (
          <Link className={s['row']} to={'/groups/colloquy'}>
            <div className={s['back-icon']}>
              <Icon src={backSvg} id={'back'} className={'white'} />
            </div>
            <span className={s['back-text']}>Обратно к сообществу</span>
          </Link>
        )}
      </div>
      {(page === 'create' || page === 'edit') && (
        <div className={`${s['content']}`}>
          <div className={s['avatar-block']}>
            <h4 className={s['sub-title']}>Загрузим аватар</h4>
            <div className={s['avatar-wrapper']}>
              <div className={s['avatar']}>
                <img src={ebalo} alt="" />
              </div>
              <p className={s['suggest']}>
                Перетащите или <span>выберите</span> фото
              </p>
            </div>
          </div>
          <div className={s['main-info']}>
            <div className={s['block']}>
              <h4 className={s['sub-title']}>Название</h4>
              <Input
                className={'group-info'}
                placeholder={'Что-то гениальное'}
                type={'text'}
                inputType={'default'}
                value={''}
                setValue={() => {}}
                name={''}
              />
            </div>
            <div className={s['mobile-block']}>
              <h4 className={s['sub-title']}>Статус</h4>
              <Input
                className={'group-info'}
                placeholder={'Девиз сообщества'}
                type={'text'}
                value={''}
                setValue={() => {}}
                name={''}
                inputType={'default'}
              />
              <span className={s['max']}>Максимальная длина 50 символов</span>
            </div>
          </div>
          {(width <= 1150 || page === 'edit') && (
            <div className={s['sub-info']}>
              <div className={s['mobile-block']}>
                <h4 className={s['sub-title']}>Город</h4>
                <SelectComponent
                  placeholder={'Выберите'}
                  options={cities}
                  noOptionsMessage={'Город не найден'}
                  className={'side-select'}
                  name={''}
                  value={''}
                  setValue={() => {}}
                />
              </div>
              <div className={s['mobile-block']}>
                <h4 className={s['sub-title']}>Тематика</h4>
                <SelectComponent
                  placeholder={'Выберите'}
                  options={themes}
                  noOptionsMessage={'Тема не найдена'}
                  className={'side-select'}
                  name={''}
                  value={''}
                  setValue={() => {}}
                />
              </div>
              <div className={s['mobile-block']}>
                <h4 className={s['sub-title']}>Адрес</h4>
                <Input
                  className={'group-info'}
                  placeholder={'@example'}
                  type={'text'}
                  inputType="default"
                  name={''}
                  value={''}
                  setValue={() => {}}
                />
              </div>
              {width > 550 && (
                <div
                  className={`${s['online-row']} ${s['align-end']} ${
                    page === 'edit' ? s['edit'] : ''
                  }`}>
                  <InputButton
                    checked={undefined}
                    onChange={undefined}
                    name={''}
                    id="online"
                    type={'checkbox'}
                    className={'side-online'}
                  />
                  <label htmlFor="online">Закрытое сообщество</label>
                </div>
              )}
            </div>
          )}
          <div className={`${s['about']} ${page === 'edit' ? s['edit'] : ''}`}>
            <h4 className={s['sub-title']}>Описание</h4>
            <textarea
              className={s['about-input']}
              placeholder="Расскажите о своём сообществе"></textarea>
          </div>
          {width <= 550 && (
            <div
              className={`${s['online-row']} ${s['align-end']} ${
                page === 'edit' ? s['edit'] : ''
              }`}>
              <InputButton
                checked={undefined}
                onChange={undefined}
                name={''}
                id="online"
                type={'checkbox'}
                className={'side-online'}
              />
              <label htmlFor="online">Закрытое сообщество</label>
            </div>
          )}
        </div>
      )}
      {page === 'suggest' &&
        posts.map(({ id, user, content }) => (
          <Post
            id={id}
            user={user}
            content={content}
            key={id}
            isAdmin={false}
            postType={{
              suggest: {
                isAnonym: true,
              },
            }}
            isForwardPost={false}
            page={'group'}
          />
        ))}
      {(page === 'blacklist' || page === 'moderation' || page === 'requests') &&
        users.map(({ id, name, img, status, lastSeen }) => (
          <div className={s['item']} key={id}>
            <ContentCard
              size={'lg'}
              contentData={{
                img,
                status,
                lastSeen,
                name,
                link: '',
              }}
              type={page === 'blacklist' || page === 'moderation' ? 'blacklist' : 'orders'}
              isSearchPage={false}
            />
          </div>
        ))}

      {hasError && <p className={s['error']}>Неверный формат изображения (png, jpg, jpeg)</p>}
      {page === 'create' ? (
        <Button className={'group-create'} text={'Создать'} />
      ) : (
        <Button className={'group-create'} text={'Сохранить'} />
      )}
    </div>
  );
};

export default GroupPanel;
