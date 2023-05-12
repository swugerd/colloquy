export class CreatePostDto {
  readonly user_id: number;
  readonly user_referer_id?: number;
  readonly group_id?: number;
  readonly is_anonym?: boolean;
  readonly post_text: string;
  readonly forward_post_id?: number;
}
