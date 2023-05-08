export class UpdateUserDto {
  readonly user_name?: string;
  readonly user_surname?: string;
  readonly user_patronymic?: string;
  readonly city_id?: number;
  readonly user_nickname?: string;
  readonly user_about?: string;
  user_phone?: string;
  user_sub_phone?: string;
  readonly user_telegram?: string;
  readonly user_status?: string;
  readonly user_avatar?: string;
  readonly online_type?: 'pc-online' | 'pc-dnd' | 'pc-afk' | 'pc-offline';
  readonly id?: number;
}
