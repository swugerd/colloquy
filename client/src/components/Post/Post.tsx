import { useState, useRef } from 'react';
import s from './Post.module.scss';
import playSvg from '../../assets/img/icons/play.svg';
import dotsSvg from '../../assets/img/icons/dots.svg';
import likeSvg from '../../assets/img/icons/like.svg';
import markSvg from '../../assets/img/icons/markdown.svg';
import commentsSvg from '../../assets/img/icons/comment.svg';
import HeaderAvatar from '../UI/HeaderAvatar/HeaderAvatar';
import formatTime from '../../utils/formatTime';
import classNames from 'classnames';
import anonymSvg from '../../assets/img/icons/anonym.svg';
import useWindowSize from './../../hooks/useWindowResize';
import trashSvg from '../../assets/img/icons/trash.svg';
import editSvg from '../../assets/img/icons/edit.svg';
import Icon from '../UI/Icon/Icon';
import { Link } from 'react-router-dom';
import SquareButton from '../UI/SquareButton/SquareButton';
import closeSvg from '../../assets/img/icons/close.svg';
import addSvg from '../../assets/img/icons/add.svg';
import { useAppDispatch } from '../../redux/store';
import {
  setIsForwardModalOpen,
  setIsPostContentModalOpen,
  setPostContentModalId,
} from '../../redux/modal/slice';
import wordDeclension from '../../utils/wordDeclension';
import moment from 'moment';
import { useSelector } from 'react-redux';
import { selectIsAuth } from '../../redux/auth/selector';
import axios from 'axios';

type PostProps = {
  id: number;
  user: {
    id: number;
    user_name: string;
    user_avatar: string;
    user_nickname: string;
    online_type: string;
  };
  content: {
    text?: string;
    images?: {
      id: number;
      img: string;
    }[];
    videos?: {
      id: number;
      video: string;
      time: number;
    }[];
    circles?: {
      id: number;
      circle: string;
      time: number;
    }[];
    voices?: {
      id: number;
      voice: string;
      time: number;
    }[];
    music?: {
      id: number;
      track: string;
      time: number;
      name: string;
      author: string;
    }[];
  };
  postType: {
    feed?: {
      date: string;
      likes?: any;
      forwards?: number;
      comments?: any;
      views?: number;
      forwardPost?: {
        id: number;
        user: {
          id: number;
          user_name: string;
          user_avatar: string;
        };
        date: string;
        content: {
          text?: string;
          images?: {
            id: number;
            img: string;
          }[];
          videos?: {
            id: number;
            video: string;
            time: number;
          }[];
          music?: {
            id: number;
            track: string;
            time: number;
            name: string;
            author: string;
          }[];
        };
      };
    };
    suggest?: {
      isAnonym: boolean;
    };
  };
  isForwardPost: boolean;
  isModalPost?: boolean;
  isAdmin: boolean;
  page: 'profile' | 'feed' | 'modal' | 'group';
  setPosts?: (data: any) => void;
  posts?: any;
  postsApiLink?: string;
  isAnonym?: boolean;
  group?: any;
};

const Post: React.FC<PostProps> = ({
  id,
  user,
  postType,
  content,
  isForwardPost,
  isModalPost,
  page,
  isAdmin,
  setPosts,
  postsApiLink,
  isAnonym,
  group,
  posts,
}) => {
  const { user_name: userName, user_avatar: userImg, user_nickname: userLink, online_type } = user;
  const { group_name: groupName, group_avatar: groupImg, group_adress: groupLink } = group;
  const { text, images, videos, circles, voices, music } = content;
  const { width } = useWindowSize();
  const maxVisibleContent: {
    images: number;
    videos: number;
    voices: number;
    circles: number;
    circlesSolo: number;
    voicesSolo: number;
    music: number;
  } = {
    images: width <= 768 ? 2 : 6,
    videos: width <= 768 ? 1 : 3,
    voices: 2,
    circles: 2,
    circlesSolo: width <= 768 ? 2 : 3,
    voicesSolo: 2,
    music: 1,
  };

  const {
    user: { id: userId },
  } = useSelector(selectIsAuth);

  const { feed, suggest } = postType;

  const { likes, comments, date } = feed || {};

  const dispatch = useAppDispatch();

  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleForwardModalOpen = (e: any) => {
    e.stopPropagation();
    dispatch(setIsForwardModalOpen(true));
  };

  const handlePostContentModalOpen = (e: any) => {
    e.stopPropagation();
    dispatch(setPostContentModalId(id));
    dispatch(setIsPostContentModalOpen(true));
  };

  const checkLastContent = (
    type: 'class' | 'element',
    contentType:
      | 'images'
      | 'videos'
      | 'circles'
      | 'circlesSolo'
      | 'voicesSolo'
      | 'voices'
      | 'music',
    content: any,
    index: number,
  ) => {
    if (type === 'class') {
      return index === maxVisibleContent[contentType] - 1 &&
        content.length > maxVisibleContent[contentType]
        ? s['last-media']
        : '';
    } else {
      return (
        index === maxVisibleContent[contentType] - 1 &&
        content.length > maxVisibleContent[contentType] && (
          <span className={s['more']}>+{content.length - maxVisibleContent[contentType]}</span>
        )
      );
    }
  };

  const handleSuggest = async (type: 'approve' | 'reject') => {
    const response = await axios({
      method: 'delete',
      url: `${process.env.REACT_APP_HOSTNAME}/api/groups/suggest/${id}?type=${type}`,
    });

    const posts = await axios({
      method: 'get',
      url: group ? `${process.env.REACT_APP_HOSTNAME}/api/groups/suggest/${group.id}` : '',
    });

    setPosts && setPosts(posts.data);
  };

  const handleDeletePost = async () => {
    const deletedPost = await axios({
      method: 'delete',
      url: `${process.env.REACT_APP_HOSTNAME}/api/posts/${id}`,
    });

    setPosts && setPosts(posts.filter((post: any) => post.id !== deletedPost.data.id));
  };

  const handleUpdatePost = async () => {
    if (!changingText) return;
    setChangingText(changingText);
    setIsPostChanging(!isPostChanging);
    const updatedPost = await axios({
      method: 'put',
      url: `${process.env.REACT_APP_HOSTNAME}/api/posts/${id}`,
      data: {
        post_text: changingText,
      },
    });
  };

  const handleTextareaVisibility = () => {
    setChangingText(changingText);
    setIsPostChanging(!isPostChanging);
  };

  const [activeAction, setactiveAction] = useState(
    likes?.some((like: any) => like.user_id === userId),
  );

  const [likesLength, setLikesLength] = useState(likes?.length);

  const handleLike = async () => {
    setactiveAction(!activeAction);

    if (!activeAction) {
      setLikesLength((prev: any) => prev + 1);
      const response = await axios({
        method: 'post',
        url: `${process.env.REACT_APP_HOSTNAME}/api/likes/${userId}`,
        data: {
          post_id: id,
        },
      });
    } else {
      setLikesLength((prev: any) => prev - 1);
      const likeId = likes.find((like: any) => like.user_id === userId).id;
      const response = await axios({
        method: 'delete',
        url: `${process.env.REACT_APP_HOSTNAME}/api/likes/${likeId}`,
      });
    }

    if (page === 'modal') {
      const post = await axios({
        method: 'get',
        url: `${process.env.REACT_APP_HOSTNAME}/api/posts/single/${id}`,
      });
      setPosts && setPosts(post.data);
    }
  };

  const timeoutRef = useRef<any>(null);

  const handleLikeClick = () => {
    clearTimeout(timeoutRef.current);

    timeoutRef.current = setTimeout(handleLike, 500);
  };

  const [changingText, setChangingText] = useState(text ? text : '');
  const [isPostChanging, setIsPostChanging] = useState(false);

  const textAreaAdjust = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setChangingText(e.target.value);
    e.target.style.height = '1px';
    e.target.style.height = `${e.target.scrollHeight}px`;
    if (e.target.value === '') {
      e.target.style.height = '1px';
    }
  };

  return (
    <>
      <div
        className={`${s['post']} ${isForwardPost ? s['forward'] : ''} ${
          isModalPost ? s['modal'] : ''
        }`}>
        <div className={`${s['top-row']}`}>
          <div className={`${s['user']} ${page === 'modal' ? s['modal-margin'] : ''}`}>
            <Link
              to={
                ((page === 'group' || page === 'modal') && groupLink && isAnonym) ||
                (page === 'feed' && groupLink)
                  ? `/groups/${groupLink}`
                  : `/profile/${userLink}`
              }>
              <HeaderAvatar
                className="post"
                img={
                  ((page === 'group' || page === 'modal') && groupImg && isAnonym) ||
                  (page === 'feed' && groupImg)
                    ? groupImg
                    : userImg
                }
                title={
                  ((page === 'group' || page === 'modal') && groupName && isAnonym) ||
                  (page === 'feed' && groupName)
                    ? groupName
                    : userName
                }
                indicatorClass={['sm-indicator', 'border-elem']}
                onlineType={
                  ((page === 'group' || page === 'modal') && groupName && isAnonym) ||
                  (page === 'feed' && groupName)
                    ? ''
                    : online_type
                }
              />
            </Link>
            <div className={`${s['user-info']}`}>
              <Link
                className={s['user-name']}
                to={
                  ((page === 'group' || page === 'modal') && groupLink && isAnonym) ||
                  (page === 'feed' && groupLink)
                    ? `/groups/${groupLink}`
                    : `/profile/${userLink}`
                }>
                {((page === 'group' || page === 'modal') && groupName && isAnonym) ||
                (page === 'feed' && groupName)
                  ? groupName
                  : userName}
              </Link>
              <span className={s['post-date']}>{moment(date).locale('ru').fromNow()}</span>
            </div>
          </div>
          {feed &&
            !isForwardPost &&
            (page === 'profile' || page === 'modal' || page === 'group') &&
            user?.id === userId &&
            !isPostChanging && (
              <button className={`${s['hide']}`} onClick={handleTextareaVisibility}>
                <Icon src={editSvg} id={'edit'} className={'gray'} />
              </button>
            )}
          {feed &&
            !isForwardPost &&
            (page === 'profile' || page === 'modal' || page === 'group') &&
            user?.id === userId &&
            isPostChanging && (
              <button className={`${s['hide']}`} onClick={handleUpdatePost}>
                <Icon src={markSvg} id={'markdown'} className={'gray'} />
              </button>
            )}
          {feed &&
            !isForwardPost &&
            (page === 'profile' || page === 'modal' || page === 'group') &&
            isAdmin && (
              <button className={`${s['hide']}`} onClick={handleDeletePost}>
                <Icon src={trashSvg} id={'trash'} className={'gray'} />
              </button>
            )}
          {suggest && (
            <div className={s['row']}>
              <SquareButton
                className={'post-button'}
                icon={closeSvg}
                id={'close'}
                onClick={() => handleSuggest('reject')}
              />
              <SquareButton
                className={'post-button'}
                icon={addSvg}
                id={'add'}
                onClick={() => handleSuggest('approve')}
              />
            </div>
          )}
        </div>
        <div
          className={`${s['content']} ${!isModalPost ? s['cursor-pointer'] : ''}`}
          onClick={
            !isModalPost && !isPostChanging ? (e) => handlePostContentModalOpen(e) : () => {}
          }>
          {!!text && !isPostChanging ? (
            <p className={s['post-text']}>{changingText}</p>
          ) : (
            <textarea
              className={s['post-textarea']}
              value={changingText}
              onChange={(e) => textAreaAdjust(e)}></textarea>
          )}
          {!!images?.length && (
            <div
              className={classNames({
                [s['post-images']]: true,
                [s['post-images-one']]: images.length === 1,
                [s['post-images-two']]: images.length === 2,
                [s['post-images-three']]: images.length === 3 && width > 768,
                [s['post-images-four']]: images.length === 4 && width > 768,
                [s['post-images-five']]: images.length === 5 && width > 768,
                [s['post-images-six']]: images.length >= maxVisibleContent.images && width > 768,
                [s['post-images-mobile']]: images.length > maxVisibleContent.images && width <= 768,
              })}>
              {images.map(({ id, img }, index) =>
                index > maxVisibleContent.images - 1 ? null : (
                  <div
                    className={`${s['post-image']} ${s[`grid-area-${index}`]} ${checkLastContent(
                      'class',
                      'images',
                      images,
                      index,
                    )}`}
                    key={id}>
                    <img src={img} alt="post-img" />
                    {checkLastContent('element', 'images', images, index)}
                  </div>
                ),
              )}
            </div>
          )}
          {!!videos?.length && (
            <div
              className={classNames({
                [s['post-videos']]: true,
                [s['post-videos-one']]: videos.length === 1,
                [s['post-videos-two']]: videos.length === 2 && width > 768,
                [s['post-videos-three']]: videos.length >= maxVisibleContent.videos && width > 768,
                [s['post-videos-mobile']]: videos.length > maxVisibleContent.videos && width <= 768,
              })}>
              {videos.map(({ id, video }, index) =>
                index > maxVisibleContent.videos - 1 ? null : (
                  <div
                    className={`${s['post-video']} ${s[`grid-area-${index}`]} ${checkLastContent(
                      'class',
                      'videos',
                      videos,
                      index,
                    )}`}
                    key={id}>
                    <video controls>
                      <source src={video} type="video/mp4" />
                    </video>
                    {checkLastContent('element', 'videos', videos, index)}
                  </div>
                ),
              )}
            </div>
          )}
          {!!circles?.length && voices?.length ? (
            <div className={s['media-wrapper']}>
              <div className={`${s['post-circles']} ${s['circles-separator']}`}>
                {circles.map(({ id, circle, time }, index) =>
                  index > maxVisibleContent.circles - 1 ? null : (
                    <div
                      className={`${s['post-circle']} ${checkLastContent(
                        'class',
                        'circles',
                        circles,
                        index,
                      )} ${maxVisibleContent.circles - 1 === index ? s['last-circle'] : ''}`}
                      key={id}>
                      <video controls>
                        <source src={circle} type="video/mp4" />
                      </video>
                      {checkLastContent('element', 'circles', circles, index)}
                    </div>
                  ),
                )}
              </div>
              <div className={s['post-voices']}>
                {voices.map(({ id, voice, time }, index) =>
                  index > maxVisibleContent.voices - 1 ? null : (
                    <div
                      className={`${s['post-voice']} ${checkLastContent(
                        'class',
                        'voices',
                        voices,
                        index,
                      )} ${maxVisibleContent.voices - 1 === index ? s['last-voice'] : ''}`}
                      key={id}>
                      <img src={voice} alt="voice" />
                      {checkLastContent('element', 'voices', voices, index)}
                    </div>
                  ),
                )}
              </div>
            </div>
          ) : !voices?.length && !circles?.length ? (
            ''
          ) : !circles?.length ? (
            <div className={`${s['post-only-media']} ${s['only-voices']}`}>
              {voices &&
                voices.map(({ id, voice, time }, index) =>
                  index > maxVisibleContent.voicesSolo - 1 ? null : (
                    <div
                      className={`${s['post-voice']} ${checkLastContent(
                        'class',
                        'voicesSolo',
                        voices,
                        index,
                      )}`}
                      key={id}>
                      <img src={voice} alt="voice" />
                      {checkLastContent('element', 'voicesSolo', voices, index)}
                    </div>
                  ),
                )}
            </div>
          ) : !voices?.length ? (
            <div className={s['post-only-media']}>
              {circles.map(({ id, circle, time }, index) =>
                index > maxVisibleContent.circlesSolo - 1 ? null : (
                  <div
                    className={`${s['post-circle']} ${checkLastContent(
                      'class',
                      'circlesSolo',
                      circles,
                      index,
                    )}`}
                    key={id}>
                    <video>
                      <source src={circle} type="video/mp4" />
                    </video>
                    {checkLastContent('element', 'circlesSolo', circles, index)}
                  </div>
                ),
              )}
            </div>
          ) : (
            ''
          )}
          {music?.length && (
            <div className={s['post-track']}>
              <div className={s['track-left']}>
                <button className={s['play-btn']}>
                  <Icon src={playSvg} id={'play'} className={'white'} />
                </button>
                <div className={s['track-info']}>
                  <span className={s['track-name']}>{music[0].name}</span>
                  <span className={s['track-separator']}>&mdash;</span>
                  <Link className={s['track-author']} to="/profile/swugerd">
                    {music[0].author}
                  </Link>
                  <span className={s['track-time']}>{formatTime(music[0].time)}</span>
                </div>
              </div>
              {music.length > 1 && (
                <button className={s['more-btn']}>
                  <span className={s['more-text']}>
                    Ещё {music.length - 1}{' '}
                    {wordDeclension(music.length - 1, ['трек', 'трека', 'треков'])}
                  </span>
                  <Icon src={dotsSvg} id={'dots'} className={'only-gray'} />
                </button>
              )}
            </div>
          )}
        </div>
        {feed && !isForwardPost && (
          <div className={s['actions']}>
            <button
              className={`${s['actions-info']} ${s['likes']} ${activeAction ? s['active'] : ''}`}
              onClick={handleLikeClick}>
              <Icon
                src={likeSvg}
                id={'like'}
                className={'only-gray'}
                hoverClass={activeAction ? 'active' : ''}
              />
              <span>{likesLength}</span>
            </button>
            <button
              className={`${s['actions-info']} ${s['comments']}`}
              onClick={!isModalPost ? (e) => handlePostContentModalOpen(e) : () => {}}>
              <Icon src={commentsSvg} id={'comments'} className={'only-gray'} />
              <span>{comments.length}</span>
            </button>
          </div>
        )}
        {suggest && (
          <div className={s['row']}>
            <div className={`${s['controls-icon']} ${s['anonym']}`}>
              <Icon
                src={anonymSvg}
                id={'anonym'}
                className={!postType.suggest?.isAnonym ? 'gray' : 'green'}
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Post;
