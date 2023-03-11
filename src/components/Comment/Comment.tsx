import React from 'react';
import { Link } from 'react-router-dom';
import { Comment as CommentType } from '../../types';
import Icon from '../UI/Icon/Icon';
import forwardSvg from '../../assets/img/icons/forward.svg';
import trashSvg from '../../assets/img/icons/trash.svg';
import editSvg from '../../assets/img/icons/edit.svg';
import s from './Comment.module.scss';
import likeSvg from '../../assets/img/icons/like.svg';
import MusicTrack from './../MusicTrack/MusicTrack';

interface CommentProps extends CommentType {
  isAdmin: boolean;
}

const Comment: React.FC<CommentProps> = ({
  id,
  user,
  content,
  date,
  likes,
  isAdmin,
  replyUser,
}) => {
  const { text, images, videos, music } = content;
  return (
    <div className={`${s['comment']} ${replyUser ? s['reply'] : ''}`}>
      <div className={s['user-img']}>
        <img src={user.img} alt="" />
      </div>
      <div className={s['contnet']}>
        <div className={s['top']}>
          <Link to={'/profile/swugerd'} className={s['user-name']}>
            {user.name}
          </Link>
          <button className={`${s['action-btn']} ${s['reply-btn']}`}>
            <Icon src={forwardSvg} id={'forward'} className={'gray'} />
          </button>
          {(user.id === 1 || replyUser?.id === 1) && (
            <button className={s['action-btn']}>
              <Icon src={editSvg} id={'edit'} className={'gray'} />
            </button>
          )}
          {isAdmin && (
            <button className={s['action-btn']}>
              <Icon src={trashSvg} id={'trash'} className={'gray'} />
            </button>
          )}
        </div>
        <div className={s['content']}>
          {!!text && <p className={s['text']}>{text}</p>}
          {!!images?.length && (
            <div className={s['row']}>
              {images.map(({ id, img }) => (
                <div className={s['image']} key={id}>
                  <img src={img} alt="" />
                </div>
              ))}
            </div>
          )}
          {!!videos?.length && (
            <div className={s['row']}>
              {videos.map(({ id, video }) => (
                <div className={s['image']} key={id}>
                  <video src={video} controls></video>
                </div>
              ))}
            </div>
          )}
          {music?.length && (
            <div className={s['tracks']}>
              {music.map(({ id, track, author, name }) => (
                <div key={id}>
                  <MusicTrack
                    img={track}
                    title={name}
                    author={author}
                    time={0}
                    isRecs={false}
                    className={'comment-track'}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
        <div className={s['bottom']}>
          <span className={s['date']}>{date}</span>
          <button className={s['likes']}>
            <div className={s['like-icon']}>
              <Icon src={likeSvg} id={'like'} className={'only-gray'} />
            </div>
            <span className={s['likes-count']}>{likes}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Comment;
