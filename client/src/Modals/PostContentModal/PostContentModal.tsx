import React, { useState } from 'react';
import Post from '../../components/Post/Post';
import ModalLayout from '../../layouts/ModalLayout/ModalLayout';
import s from './PostContentModal.module.scss';
import Comment from '../../components/Comment/Comment';
import Input from '../../components/UI/Input/Input';
import MediaToUpload from '../../components/MediaToUpload/MediaToUpload';
import { useSelector } from 'react-redux';
import { selectModal } from '../../redux/modal/selector';
import { useAxios } from '../../hooks/useAxios';
import { selectIsAuth } from '../../redux/auth/selector';
import Preloader from '../../components/Preloader/Preloader';
import NotFoundBlock from '../../components/NotFoundBlock/NotFoundBlock';
import axios from 'axios';

type PostContentModalProps = {
  onClose: () => void;
  modalType: 'post' | 'photo' | 'video';
};

const PostContentModal: React.FC<PostContentModalProps> = ({ onClose, modalType }) => {
  const {
    modal: {
      postContentModal: { id },
    },
  } = useSelector(selectModal);

  const {
    user: { id: userId },
  } = useSelector(selectIsAuth);

  const {
    response: post,
    isLoading: isPostLoading,
    error: postError,
    setResponse: setPost,
  } = useAxios({
    method: 'get',
    url: `${process.env.REACT_APP_HOSTNAME}/api/posts/single/${id}`,
  });

  const isPostAdmin =
    post &&
    (userId === post.postCreator.id ||
      userId === post.user_referer_id ||
      post.group?.creator_id === userId ||
      userId === post.postCreator.id);

  const hasMediaToUpload = false;

  const [commentText, setCommentText] = useState({ comment_text: '' });

  const handleInputChange = (fields: any) => {
    setCommentText((prev) => {
      return { ...prev, ...fields };
    });
  };

  const handleFormSubmit = async (e: any) => {
    e.preventDefault();

    const addedPost = await axios({
      method: 'post',
      url: userId ? `${process.env.REACT_APP_HOSTNAME}/api/comments/${userId}` : '',
      data: {
        comment_text: commentText.comment_text,
        post_id: id,
      },
    });

    const post = await axios({
      method: 'get',
      url: `${process.env.REACT_APP_HOSTNAME}/api/posts/single/${id}`,
    });

    setPost(post.data);
  };

  return (
    <ModalLayout className={'post-content'} onClose={onClose}>
      {post ? (
        modalType === 'post' &&
        post && (
          <>
            <Post
              id={post.id}
              user={{
                id: post.user_id,
                user_name: post.postCreator.user_name,
                user_avatar: post.postCreator.user_avatar,
                user_nickname: post.postCreator.user_nickname,
                online_type: post.postCreator.online_type,
              }}
              group={
                post.is_anonym
                  ? {
                      group_name: post.group.group_name,
                      group_avatar: post.group.group_avatar,
                      group_adress: post.group.group_adress,
                    }
                  : {}
              }
              content={{ text: post.post_text }}
              isAdmin={isPostAdmin}
              isAnonym={post.is_anonym}
              postType={{
                feed: {
                  date: post.createdAt,
                  likes: post.likes,
                  comments: post.comments,
                },
              }}
              isModalPost={true}
              isForwardPost={false}
              page={'modal'}
              setPosts={setPost}
            />
            <h4 className={s['title']}>Комментарии</h4>
            <ul className={s['comments']}>
              {post && !!post.comments.length ? (
                post.comments.map((comment: any) => (
                  <li className={s['comment']} key={comment.id}>
                    <Comment
                      id={comment.id}
                      user={comment.user}
                      date={comment.createdAt}
                      content={{ text: comment.comment_text }}
                      likes={comment.likes}
                      isAdmin={post.postCreator.id === userId || comment.user_id === userId}
                      currentUserId={userId}
                      setPost={setPost}
                      postId={id}
                    />
                  </li>
                ))
              ) : (
                <NotFoundBlock className={'comments-page'} text={'Комментариев нет'} />
              )}
            </ul>
            <form onSubmit={handleFormSubmit}>
              <Input
                className={!hasMediaToUpload ? 'post-content' : 'post-content-round'}
                placeholder={'Ваше сообщение'}
                type={'text'}
                inputType={'send'}
                page={'message'}
                isTextarea={true}
                name={'comment_text'}
                value={commentText.comment_text}
                setValue={handleInputChange}
              />
            </form>
            {hasMediaToUpload && <MediaToUpload className={'post-modal'} />}
          </>
        )
      ) : (
        <Preloader className="profile" />
      )}
    </ModalLayout>
  );
};

export default PostContentModal;
