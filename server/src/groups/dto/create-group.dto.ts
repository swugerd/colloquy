export class CreateGroupDto {
  readonly group_name: string;
  readonly group_avatar: string;
  readonly group_status?: string;
  readonly city_id: number;
  readonly thematic_id: number;
  readonly creator_id: number;
  readonly group_adress: string;
  readonly group_about?: string;
  readonly is_private: boolean;
}
