import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Table,
  Model,
  HasMany,
} from 'sequelize-typescript';
import { Photo } from 'src/photos/models/photos.model';
import { User } from 'src/users/models/users.model';
import { Post } from '../../posts/models/post.model';
import { Video } from 'src/videos/models/video.model';
import { Like } from 'src/likes/models/like.model';

interface CommentCreationAttrs {
  user_id: number;
  comment_text: string;
  parent_id?: number;
  post_id?: number;
  photo_id?: number;
  video_id?: number;
}

@Table({ tableName: 'comments' })
export class Comment extends Model<Comment, CommentCreationAttrs> {
  @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
  id: number;

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER, allowNull: false, onDelete: 'CASCADE' })
  user_id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  comment_text: string;

  @ForeignKey(() => Comment)
  @Column({ type: DataType.INTEGER, allowNull: true, onDelete: 'CASCADE' })
  parent_id: number;

  @ForeignKey(() => Post)
  @Column({ type: DataType.INTEGER, allowNull: true, onDelete: 'CASCADE' })
  post_id: number;

  @ForeignKey(() => Photo)
  @Column({ type: DataType.INTEGER, allowNull: true, onDelete: 'CASCADE' })
  photo_id: number;

  @ForeignKey(() => Video)
  @Column({ type: DataType.INTEGER, allowNull: true, onDelete: 'CASCADE' })
  video_id: number;

  @BelongsTo(() => User, 'user_id')
  user: User;

  @BelongsTo(() => Post, 'post_id')
  post: Post;

  @BelongsTo(() => Photo, 'photo_id')
  photo: Photo;

  @BelongsTo(() => Video, 'video_id')
  video: Video;

  @BelongsTo(() => Comment, 'id')
  parent: Comment;

  @HasMany(() => Like)
  likes: Like;
}
