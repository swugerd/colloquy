export default class CommentDto {
  readonly post_id?: number;
  readonly photo_id?: number;
  readonly video_id?: number;
  readonly parent_id?: number;
  readonly comment_text: string;
}
