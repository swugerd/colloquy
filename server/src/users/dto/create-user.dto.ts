export class CreateUserDto {
  readonly user_nickname: string;
  readonly user_email: string;
  readonly user_password: string;
  readonly user_name: string;
  readonly user_surname: string;
  readonly user_birthdate: string;
  readonly user_gender: 'male' | 'female';
  readonly user_avatar: string;
}
