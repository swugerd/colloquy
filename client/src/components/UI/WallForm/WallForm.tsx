import React, { useState } from 'react';
import Icon from '../Icon/Icon';
import s from './WallForm.module.scss';
import anonymSvg from '../../../assets/img/icons/anonym.svg';
import sendSvg from '../../../assets/img/icons/send.svg';
import Input from '../Input/Input';
import MediaToUpload from '../../MediaToUpload/MediaToUpload';
import axios from 'axios';

type WallFormProps = {
  page: 'profile' | 'feed' | 'group';
  className: string;
  placeholder: string;
  isAdmin: boolean;
  user?: any;
  group?: any;
  currentUserId?: number;
  setPosts?: (data: any) => void;
  postsApiLink?: string;
  posts?: any;
};

const WallForm: React.FC<WallFormProps> = ({
  page,
  className,
  placeholder,
  isAdmin,
  user,
  group,
  currentUserId,
  setPosts,
  postsApiLink,
  posts,
}) => {
  const [isAnonymActive, setIsAnonymActive] = useState(false);

  const hasMediaToUpload = false;

  const [postText, setPostText] = useState({ post_text: '' });

  const handleInputChange = (fields: any) => {
    setPostText((prev) => {
      return { ...prev, ...fields };
    });
  };

  const handleFormSubmit = async (e: any) => {
    e.preventDefault();

    if (page === 'profile') {
      const addedPost = await axios({
        method: 'post',
        url: currentUserId
          ? `${process.env.REACT_APP_HOSTNAME}/api/posts/create/${currentUserId}`
          : '',
        data: {
          post_text: postText.post_text,
          ...(page === 'profile' && user ? { user_referer_id: user.id } : {}),
        },
      });

      setPosts && setPosts([addedPost.data, ...posts]);
    }

    if (page === 'group') {
      const addedPost = await axios({
        method: 'post',
        url: currentUserId
          ? isAdmin
            ? `${process.env.REACT_APP_HOSTNAME}/api/posts/create/${currentUserId}`
            : `${process.env.REACT_APP_HOSTNAME}/api/groups/suggest/${currentUserId}`
          : '',
        data: {
          [isAdmin ? 'post_text' : 'suggest_text']: postText.post_text,
          ...(group ? { group_id: group.id, is_anonym: isAnonymActive } : {}),
        },
      });
      setPosts && isAdmin && setPosts([addedPost.data, ...posts]);
    }

    setPostText({ post_text: '' });
  };

  return page !== 'feed' ? (
    <>
      <form className={s['post-form']} onSubmit={(e: any) => handleFormSubmit(e)}>
        <div className={s['relative']}>
          <Input
            className={'wall-textarea'}
            placeholder={placeholder}
            type={'text'}
            inputType={'send'}
            isTextarea={true}
            classOptions={{
              paperclipIcon: 'paperclip-icon-wall',
              smileIcon: 'smile-icon-wall',
              sendIcon: 'send-icon-wall',
            }}
            name={'post_text'}
            value={postText.post_text ? postText.post_text : ''}
            setValue={handleInputChange}
          />
          {hasMediaToUpload && (
            <MediaToUpload className={page === 'profile' ? 'wall-page' : 'group-page'} />
          )}
        </div>
        <div className={s['input-controls']}>
          {page === 'group' && (
            <>
              <button
                className={`${s['controls-icon']} ${s['anonym']}`}
                onClick={() => setIsAnonymActive(!isAnonymActive)}
                type="button">
                <Icon src={anonymSvg} id={'anonym'} className={isAnonymActive ? 'green' : 'gray'} />
              </button>
            </>
          )}
          <div className={s['row']}>
            <button className={`${s['controls-icon']} ${s['send']}`}>
              <Icon src={sendSvg} id={'send'} className={'gray'} />
            </button>
          </div>
        </div>
      </form>
    </>
  ) : (
    <></>
  );
};

export default WallForm;
