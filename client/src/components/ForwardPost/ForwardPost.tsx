import React from 'react';
import Post from '../Post/Post';

type ForwardPostProps = {
  forwardPost: {
    id: number;
    user: {
      id: number;
      user_name: string;
      user_avatar: string;
      user_nickname: string;
      online_type: string;
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

const ForwardPost: React.FC<ForwardPostProps> = ({ forwardPost }) => {
  return (
    <Post
      id={forwardPost.id}
      user={forwardPost.user}
      content={forwardPost.content}
      key={1}
      postType={{
        feed: {
          date: forwardPost.date,
        },
      }}
      isForwardPost={true}
      isAdmin={false}
      page="modal"
    />
  );
};

export default ForwardPost;
