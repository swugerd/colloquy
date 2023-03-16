export interface Comment {
  id: number;
  user: {
    id: number;
    name: string;
    img: string;
  };
  date: string;
  replyUser?: {
    id: number;
    name: string;
    img: string;
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
}
