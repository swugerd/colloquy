import React from 'react';
import Post from '../../components/Post/Post';
import ModalLayout from '../../layouts/ModalLayout/ModalLayout';
import img from '../../assets/uploads/test/image.png';
import s from './PostContentModal.module.scss';
import video from '../../assets/videos/video.mp4';
import track from '../../assets/uploads/test/ebalo.png';
import likeSvg from '../../assets/img/icons/like.svg';
import forwardSvg from '../../assets/img/icons/forward.svg';
import commentSvg from '../../assets/img/icons/comment.svg';
import { Comment as CommentType, Post as PostType } from '../../types';
import arrowSvg from '../../assets/img/icons/arrow.svg';
import addSvg from '../../assets/img/icons/add.svg';
import trashSvg from '../../assets/img/icons/trash.svg';
import Comment from '../../components/Comment/Comment';
import Input from '../../components/UI/Input/Input';
import MediaToUpload from '../../components/MediaToUpload/MediaToUpload';
import { Link } from 'react-router-dom';
import Icon from '../../components/UI/Icon/Icon';
import useWindowSize from '../../hooks/useWindowResize';

type PostContentModalProps = {
  onClose: () => void;
  modalType: 'post' | 'photo' | 'video';
};

const PostContentModal: React.FC<PostContentModalProps> = ({ onClose, modalType }) => {
  const post: PostType = {
    id: 1,
    user: { id: 1, name: 'Пашок Кубыркин', img },
    date: 'Вчера',
    forwardPost: {
      id: 1,
      user: { id: 1, name: 'Павлентий Кубышкин', img },
      date: '01.03.2023',
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
    },
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
  };

  const comments: CommentType[] = [
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
          { id: 9, img },
          { id: 10, img },
        ],
        videos: [
          // { id: 1, video, time: 5002 },
          // { id: 2, video, time: 5122 },
          // { id: 3, video, time: 1502 },
          // { id: 4, video, time: 1502 },
          // { id: 5, video, time: 1502 },
          // { id: 6, video, time: 1502 },
        ],
        music: [
          {
            id: 1,
            track,
            time: 123,
            name: 'трек анбеливабл демонстрейшн дота оф эншнс)',
            author: 'NaRk0PaShOk21rus',
          },
          // { id: 2, track, time: 123, name: 'best dubstep', author: 'best author' },
          // { id: 3, track, time: 123, name: 'best dubstep', author: 'best author' },
          // { id: 4, track, time: 123, name: 'best dubstep', author: 'best author' },
          // { id: 5, track, time: 123, name: 'best dubstep', author: 'best author' },
          // { id: 6, track, time: 123, name: 'best dubstep', author: 'best author' },
        ],
      },
      likes: 2812,
    },
    {
      id: 2,
      user: { id: 2, name: 'Пашок Кубыркин', img },
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
          { id: 9, img },
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
      replyUser: {
        id: 1,
        name: 'Пашканьё кубышкио',
        img: img,
      },
      likes: 2812,
    },
    {
      id: 3,
      user: { id: 2, name: 'Пашок Кубыркин', img },
      date: 'Вчера',
      content: {
        text: 'ьууп бу п тыц тут буп буп буп тыц  втфыивтфыdsaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaadsadsadsadsadasdsaивфтывифывт я сегодня поел кашку жескую вкусную сегодня приду нажарю пельменей',
      },
      replyUser: {
        id: 1,
        name: 'Пашканьё кубышкио',
        img: img,
      },
      likes: 2812,
    },
    {
      id: 4,
      user: { id: 2, name: 'Пашок Кубыркин', img },
      date: 'Вчера',
      content: {
        text: 'ьууп бу п тыц тут буп буп буп тыц  втфыивтфыdsaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaadsadsadsadsadasdsaивфтывифывт я сегодня поел кашку жескую вкусную сегодня приду нажарю пельменей',
      },
      likes: 2812,
    },
    {
      id: 5,
      user: { id: 2, name: 'Пашок Кубыркин', img },
      date: 'Вчера',
      content: {
        text: 'ьууп бу п тыц тут буп буп буп тыц  втфыивтфыdsaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaadsadsadsadsadasdsaивфтывифывт я сегодня поел кашку жескую вкусную сегодня приду нажарю пельменей',
      },
      likes: 2812,
    },
    {
      id: 6,
      user: { id: 2, name: 'Пашок Кубыркин', img },
      date: 'Вчера',
      content: {
        text: 'ьууп бу п тыц тут буп буп буп тыц  втфыивтфыdsaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaadsadsadsadsadasdsaивфтывифывт я сегодня поел кашку жескую вкусную сегодня приду нажарю пельменей',
      },
      likes: 2812,
    },
    {
      id: 7,
      user: { id: 2, name: 'Пашок Кубыркин', img },
      date: 'Вчера',
      content: {
        text: 'ьууп бу п тыц тут буп буп буп тыц  втфыивтфыdsaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaadsadsadsadsadasdsaивфтывифывт я сегодня поел кашку жескую вкусную сегодня приду нажарю пельменей',
      },
      likes: 2812,
    },
  ];

  const isPostAdmin = true;

  const hasMediaToUpload = false;

  const { width } = useWindowSize();

  return (
    <ModalLayout className={'post-content'} onClose={onClose}>
      {modalType === 'post' && (
        <Post
          id={post.id}
          user={{
            id: post.user.id,
            name: post.user.name,
            img: post.user.img,
          }}
          content={post.content}
          isAdmin={isPostAdmin}
          postType={{
            feed: {
              date: post.date,
              likes: post.likes,
              forwards: post.forwards,
              comments: post.comments,
              views: post.views,
              forwardPost:
                post.forwardPost && Object.entries(post.forwardPost).length
                  ? {
                      id: post.forwardPost.id,
                      user: {
                        id: post.forwardPost.user.id,
                        name: post.forwardPost.user.name,
                        img: post.forwardPost.user.img,
                      },
                      date: post.forwardPost.date,
                      content: post.forwardPost.content,
                    }
                  : undefined,
            },
          }}
          isModalPost={true}
          isForwardPost={false}
          page={'modal'}
        />
      )}
      {(modalType === 'photo' || modalType === 'video') && (
        <div className={s['content']}>
          <div className={s['top']}>
            <div className={s['user']}>
              <div className={s['user-img']}>
                <img src={img} alt="" />
              </div>
              <div className={s['user-info']}>
                <Link className={s['user-name']} to={'/profile/swugerd'}>
                  Egor_C
                </Link>
                <span className={s['date']}>Вчера в 19:21</span>
              </div>
            </div>
            {width > 550 && (
              <div className={s['activities-block']}>
                {modalType === 'video' && (
                  <div className={s['video-title']}>как наебать обезьяну</div>
                )}
                <div className={s['activities']}>
                  <button className={s['activity']}>
                    <div className={s['activity-icon']}>
                      <Icon src={likeSvg} id={'like'} className={'only-gray'} />
                    </div>
                    <span className={s['activity-count']}>2812</span>
                  </button>
                  <div className={s['activity']}>
                    <div className={s['activity-icon']}>
                      <Icon src={commentSvg} id={'comments'} className={'only-gray'} />
                    </div>
                    <span className={s['activity-count']}>4</span>
                  </div>
                  <button className={s['activity']}>
                    <div className={s['activity-icon']}>
                      <Icon src={forwardSvg} id={'forward'} className={'gray'} />
                    </div>
                    <span className={s['activity-count']}>12</span>
                  </button>
                </div>
              </div>
            )}
            <div className={s['content-count']}>
              <span className={s['count']}>1</span>
              <span className={s['separator']}>/</span>
              <span className={s['all-count']}>20</span>
            </div>
            <div></div>
          </div>
          <div className={s['media']}>
            {modalType === 'photo' ? (
              <img src={img} alt="" />
            ) : (
              <video src={video} controls></video>
            )}
            <button className={s['prev-btn']}>
              <Icon src={arrowSvg} id={'arrow'} className={'gray'} />
            </button>
            <button className={s['next-btn']}>
              <Icon src={arrowSvg} id={'arrow'} className={'gray'} />
            </button>
            {isPostAdmin && (
              <button className={s['action-btn']}>
                <Icon src={trashSvg} id={'trash'} className={'white'} />
              </button>
            )}
            <button className={s['action-btn']}>
              <Icon src={addSvg} id={'add'} className={'white'} />
            </button>
          </div>
          {width <= 550 && (
            <div className={s['activities-block']}>
              {modalType === 'video' && (
                <div className={s['video-title']}>как наебать обезьяну</div>
              )}
              <div className={s['activities']}>
                <button className={s['activity']}>
                  <div className={s['activity-icon']}>
                    <Icon src={likeSvg} id={'like'} className={'only-gray'} />
                  </div>
                  <span className={s['activity-count']}>2812</span>
                </button>
                <div className={s['activity']}>
                  <div className={s['activity-icon']}>
                    <Icon src={commentSvg} id={'comments'} className={'only-gray'} />
                  </div>
                  <span className={s['activity-count']}>4</span>
                </div>
                <button className={s['activity']}>
                  <div className={s['activity-icon']}>
                    <Icon src={forwardSvg} id={'forward'} className={'gray'} />
                  </div>
                  <span className={s['activity-count']}>12</span>
                </button>
              </div>
            </div>
          )}
        </div>
      )}
      <h4 className={s['title']}>Комментарии</h4>
      <ul className={s['comments']}>
        {comments.map(({ id, user, content, date, likes, replyUser }) => (
          <li className={s['comment']} key={id}>
            <Comment
              id={id}
              user={user}
              date={date}
              content={content}
              likes={likes}
              isAdmin={isPostAdmin}
              replyUser={replyUser}
            />
          </li>
        ))}
      </ul>
      <Input
        className={!hasMediaToUpload ? 'post-content' : 'post-content-round'}
        placeholder={'Ваше сообщение'}
        type={'text'}
        inputType={'send'}
        page={'message'}
        isTextarea={true}
        name={''}
        value={''}
        setValue={() => {}}
      />
      {hasMediaToUpload && <MediaToUpload className={'post-modal'} />}
    </ModalLayout>
  );
};

export default PostContentModal;
