import React from 'react';
import Post from '../Post/Post';
import img from '../../assets/uploads/pasha.png';
import video from '../../assets/videos/video.mp4';
import track from '../../assets/uploads/test/ebalo.png';

type ForwardPostProps = {
  forwardPost: {
    id: number;
    user: {
      id: number;
      name: string;
      img: string;
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
    />
  );
};

export default ForwardPost;
