import React, { useEffect, useRef, useState } from 'react';
import s from './Wall.module.scss';
import paperclipSvg from '../../assets/img/icons/paperclip.svg';
import smileSvg from '../../assets/img/icons/smile.svg';
import commentsSvg from '../../assets/img/icons/comment.svg';
import microSvg from '../../assets/img/icons/voices.svg';
import sendSvg from '../../assets/img/icons/send.svg';
import Post from '../Post/Post';
import img from '../../assets/uploads/pasha.png';
import video from '../../assets/videos/video.mp4';
import circle from '../../assets/videos/video.mp4';
import voice from '../../assets/uploads/test/voice.png';
import track from '../../assets/uploads/test/ebalo.png';
import Icon from '../UI/Icon/Icon';
import WallForm from '../UI/WallForm/WallForm';
import { Post as PostType } from '../../types';
import Preloader from '../Preloader/Preloader';
import { useAxios } from '../../hooks/useAxios';
import { useLocation, useSearchParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsAuth } from '../../redux/auth/selector';
import NotFoundBlock from '../NotFoundBlock/NotFoundBlock';
import axios from 'axios';

type WallProps = {
  className: string;
  page: 'feed' | 'profile' | 'group';
  placeholder: string;
  isAdmin: boolean;
  withoutForm?: boolean;
};

const Wall: React.FC<WallProps> = ({ className, page, placeholder, isAdmin, withoutForm }) => {
  const { pathname } = useLocation();

  const userOrGroupRoute = pathname.split('/')[pathname.split('/').length - 1];

  const {
    user: { id: userId },
  } = useSelector(selectIsAuth);

  const {
    response: user,
    isLoading: isUserLoading,
    error: userError,
  } = useAxios({
    method: 'get',
    url:
      page === 'profile'
        ? `${process.env.REACT_APP_HOSTNAME}/api/users/getByNickname/${userOrGroupRoute}`
        : '',
  });

  const [postPage, setPostPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const limit = 10;
  const [posts, setPosts] = useState<any>([]);
  const [isPostsLoading, setIsPostsLoading] = useState(true);

  const {
    response: group,
    isLoading: isGroupLoading,
    error: groupError,
  } = useAxios({
    method: 'get',
    url:
      page === 'group'
        ? `${process.env.REACT_APP_HOSTNAME}/api/groups/getByAdress/${userOrGroupRoute}`
        : '',
  });

  const [params, setParams] = useSearchParams();

  // const [getPostsLink, setPostsLink] = useState('');

  // useEffect(() => {
  //   setPostsLink(
  //     user || group
  //       ? `${process.env.REACT_APP_HOSTNAME}/api/posts/${
  //           user ? user.id : group.id
  //         }?page=${postPage}&limit=${limit}&type=${user ? 'user_referer' : 'group'}`
  //       : page === 'feed' && userId
  //       ? `${
  //           process.env.REACT_APP_HOSTNAME
  //         }/api/posts/feed/${userId}?page=${postPage}&limit=${limit}${
  //           params.get('filter') ? `&filter=${params.get('filter')}` : ''
  //         }`
  //       : '',
  //   );
  // }, [params, user, group, userId, page, postPage]);

  const getPostsLink =
    user || group
      ? `${process.env.REACT_APP_HOSTNAME}/api/posts/${
          user ? user.id : group.id
        }?page=${postPage}&limit=${limit}&type=${user ? 'user_referer' : 'group'}`
      : page === 'feed' && userId
      ? `${
          process.env.REACT_APP_HOSTNAME
        }/api/posts/feed/${userId}?page=${postPage}&limit=${limit}${
          params.get('filter') ? `&filter=${params.get('filter')}` : ''
        }`
      : '';

  useEffect(() => {
    if (isPostsLoading && getPostsLink) {
      const response = axios
        .get(getPostsLink)
        .then((response) => {
          setPosts([...posts, ...response.data.posts]);
          setTotalCount(response.data.totalCount);

          if (response.data.totalCount >= 10) {
            setPostPage((prevPage) => prevPage + 1);
          }
        })
        .finally(() => setIsPostsLoading(false));
    }
  }, [isPostsLoading, getPostsLink]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && posts.length < totalCount) {
        setIsPostsLoading(true);
      }
    });

    const sentinel = document.querySelector('#sentinel');

    sentinel && observer.observe(sentinel);

    return () => {
      observer.disconnect();
    };
  }, [isPostsLoading]);

  return (
    <div className={`${s['wall']} ${s[className]}`}>
      {!withoutForm && (
        <WallForm
          page={page}
          className={''}
          placeholder={placeholder}
          isAdmin={isAdmin}
          user={page === 'profile' ? user : null}
          group={page === 'group' ? group : null}
          postsApiLink={getPostsLink}
          currentUserId={userId}
          setPosts={setPosts}
          posts={posts}
        />
      )}

      {posts && !posts.length && !isPostsLoading && (
        <NotFoundBlock className={'profile'} text={'Записей ещё нет'} />
      )}

      {!!posts ? (
        posts.map((post: any) => (
          <Post
            id={post.id}
            user={post.postCreator}
            group={post.group_id ? post.group : {}}
            content={{ text: post.post_text }}
            key={post.id}
            isForwardPost={false}
            isAdmin={
              (page === 'profile' &&
                (userId === post.postCreator.id || userId === post.user_referer_id)) ||
              (page === 'group' && (group.creator_id === userId || userId === post.postCreator.id))
            }
            postType={{
              feed: {
                date: post.createdAt,
                likes: post.likes,
                comments: post.comments,
              },
            }}
            page={page}
            postsApiLink={getPostsLink}
            setPosts={setPosts}
            isAnonym={post.is_anonym}
            posts={posts}
          />
        ))
      ) : (
        <Preloader className="profile" />
      )}
      {posts && posts.length && <div id="sentinel" />}
    </div>
  );
};

export default Wall;
