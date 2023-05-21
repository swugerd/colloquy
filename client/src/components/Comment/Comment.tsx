import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Comment as CommentType } from '../../types';
import Icon from '../UI/Icon/Icon';
import trashSvg from '../../assets/img/icons/trash.svg';
import markSvg from '../../assets/img/icons/markdown.svg';
import editSvg from '../../assets/img/icons/edit.svg';
import s from './Comment.module.scss';
import likeSvg from '../../assets/img/icons/like.svg';
import MusicTrack from './../MusicTrack/MusicTrack';
import moment from 'moment';
import axios from 'axios';

interface CommentProps extends CommentType {
  isAdmin: boolean;
  currentUserId: number;
  setPost: (data: any) => void;
  postId: number;
}

const Comment: React.FC<CommentProps> = ({
  id,
  user,
  content,
  date,
  likes,
  isAdmin,
  replyUser,
  currentUserId,
  setPost,
  postId,
}) => {
  const { text, images, videos, music } = content;

  const handleUpdateComment = async () => {
    if (!changingText) return;
    setChangingText(changingText);
    setIsCommentChanging(!isCommentChanging);
    const updatedComment = await axios({
      method: 'put',
      url: `${process.env.REACT_APP_HOSTNAME}/api/comments/${id}`,
      data: {
        comment_text: changingText,
      },
    });
  };

  const handleDeleteComment = async () => {
    const deletedComment = await axios({
      method: 'delete',
      url: `${process.env.REACT_APP_HOSTNAME}/api/comments/${id}`,
    });

    const post = await axios({
      method: 'get',
      url: `${process.env.REACT_APP_HOSTNAME}/api/posts/single/${postId}`,
    });

    setPost(post.data);
  };

  const handleTextareaVisibility = () => {
    setChangingText(changingText);
    setIsCommentChanging(!isCommentChanging);
  };

  const textAreaAdjust = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setChangingText(e.target.value);
    e.target.style.height = '1px';
    e.target.style.height = `${e.target.scrollHeight}px`;
    if (e.target.value === '') {
      e.target.style.height = '1px';
    }
  };

  const [changingText, setChangingText] = useState(text ? text : '');
  const [isCommentChanging, setIsCommentChanging] = useState(false);

  const [activeAction, setactiveAction] = useState(
    likes.some((like: any) => like.user_id === currentUserId),
  );

  const handleLike = async () => {
    setactiveAction(!activeAction);

    if (!activeAction) {
      const response = await axios({
        method: 'post',
        url: `${process.env.REACT_APP_HOSTNAME}/api/likes/${currentUserId}`,
        data: {
          comment_id: id,
        },
      });
    } else {
      const likeId = likes.find((like: any) => like.user_id === currentUserId).id;
      const response = await axios({
        method: 'delete',
        url: `${process.env.REACT_APP_HOSTNAME}/api/likes/${likeId}`,
      });
    }

    const post = await axios({
      method: 'get',
      url: `${process.env.REACT_APP_HOSTNAME}/api/posts/single/${postId}`,
    });
    setPost && setPost(post.data);
  };

  const timeoutRef = useRef<any>(null);

  const handleLikeClick = () => {
    clearTimeout(timeoutRef.current);

    timeoutRef.current = setTimeout(handleLike, 500);
  };

  return (
    <div className={`${s['comment']} ${replyUser ? s['reply'] : ''}`}>
      <Link to={`/profile/${user.user_nickname}`} className={s['user-name']}>
        <div className={s['user-img']}>
          <img src={`${process.env.REACT_APP_HOSTNAME}/${user.user_avatar}`} alt="" />
        </div>
      </Link>
      <div className={s['content']}>
        <div className={s['top']}>
          <Link to={`/profile/${user.user_nickname}`} className={s['user-name']}>
            {user.user_name}
          </Link>
          {user.id === currentUserId && !isCommentChanging && (
            <button className={s['action-btn']} onClick={handleTextareaVisibility}>
              <Icon src={editSvg} id={'edit'} className={'gray'} />
            </button>
          )}
          {user.id === currentUserId && isCommentChanging && (
            <button className={`${s['action-btn']}`} onClick={handleUpdateComment}>
              <Icon src={markSvg} id={'markdown'} className={'gray'} />
            </button>
          )}
          {isAdmin && (
            <button className={s['action-btn']} onClick={handleDeleteComment}>
              <Icon src={trashSvg} id={'trash'} className={'gray'} />
            </button>
          )}
        </div>
        <div className={s['content']}>
          {!!text && !isCommentChanging ? (
            <p className={s['text']}>{changingText}</p>
          ) : (
            <textarea
              className={s['textarea']}
              value={changingText}
              onChange={(e) => textAreaAdjust(e)}></textarea>
          )}
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
          <span className={s['date']}>{moment(date).locale('ru').fromNow()}</span>
          <button
            className={`${s['likes']} ${activeAction ? s['active'] : ''}`}
            onClick={handleLikeClick}>
            <div className={s['like-icon']}>
              <Icon
                src={likeSvg}
                id={'like'}
                className={'only-gray'}
                hoverClass={activeAction ? 'active' : ''}
              />
            </div>
            <span className={s['likes-count']}>{likes.length}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Comment;
