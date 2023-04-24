export interface AuthState {
  isAuth: boolean;
  user: {
    name: string;
    nickname: string;
  };
}
