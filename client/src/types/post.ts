export interface Post {
  id: number;
  user: {
    id: number;
    user_name: string;
    user_img: string;
    user_nickname: string;
  };
  date: string;
  forwardPost?: {
    id: number;
    user: {
      id: number;
      user_name: string;
      user_img: string;
      user_nickname: string;
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
  likes: number;
  forwards: number;
  comments: number;
  views: number;
}
