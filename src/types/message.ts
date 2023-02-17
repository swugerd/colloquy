export interface Message {
  id: number;
  senderId: number;
  message?: string;
  forwardMessage?: {
    id: number;
    messageId: number;
  };
  images?: { id: number; img: string }[];
  videos?: { id: number; video: string }[];
  audios?: { id: number; audio: string; time: number; name: string; author: string }[];
  timestamp: string;
  unread?: boolean;
}
