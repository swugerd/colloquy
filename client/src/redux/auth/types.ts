export interface AuthState {
  isAuth: boolean;
  user: {
    id: number;
    name: string;
    nickname: string;
  };
}
