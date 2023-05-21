import { BelongsTo, Column, DataType, ForeignKey, Table, Model } from 'sequelize-typescript';
import { Comment } from '../../comments/models/comment.model';
import { User } from 'src/users/models/users.model';
import { Post } from '../../posts/models/post.model';
import { Photo } from 'src/photos/models/photos.model';
import { Video } from 'src/videos/models/video.model';

interface LikeCreationAttrs {
  user_id: number;
  post_id?: number;
  photo_id?: number;
  video_id?: number;
  comment_id?: number;
}

@Table({ tableName: 'likes', updatedAt: false })
export class Like extends Model<Like, LikeCreationAttrs> {
  @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
  id: number;

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER, allowNull: false, onDelete: 'CASCADE' })
  user_id: number;

  @ForeignKey(() => Post)
  @Column({ type: DataType.INTEGER, allowNull: true, onDelete: 'CASCADE' })
  post_id: number;

  @ForeignKey(() => Photo)
  @Column({ type: DataType.INTEGER, allowNull: true, onDelete: 'CASCADE' })
  photo_id: number;

  @ForeignKey(() => Video)
  @Column({ type: DataType.INTEGER, allowNull: true, onDelete: 'CASCADE' })
  video_id: number;

  @ForeignKey(() => Comment)
  @Column({ type: DataType.INTEGER, allowNull: true, onDelete: 'CASCADE' })
  comment_id: number;

  @BelongsTo(() => User, 'user_id')
  user: User;

  @BelongsTo(() => Post, 'post_id')
  post: Post;

  @BelongsTo(() => Photo, 'photo_id')
  photo: Photo;

  @BelongsTo(() => Video, 'video_id')
  video: Video;

  @BelongsTo(() => Comment, 'comment_id')
  comment: Comment;
}
