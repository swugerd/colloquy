import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Table,
  Model,
  HasMany,
} from 'sequelize-typescript';
import { Group } from 'src/groups/models/group.model';
import { User } from 'src/users/models/users.model';
import { Like } from '../../likes/models/like.model';
import { Comment } from '../../comments/models/comment.model';

interface PostCreationAttrs {
  user_id?: number;
  group_id?: number;
  post_text: string;
  is_anonym: boolean;
  forward_post_id?: number;
}

@Table({ tableName: 'posts' })
export class Post extends Model<Post, PostCreationAttrs> {
  @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
  id: number;

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER, allowNull: false, onDelete: 'CASCADE' })
  user_id: number;

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER, allowNull: true, onDelete: 'CASCADE' })
  user_referer_id: number;

  @ForeignKey(() => Group)
  @Column({ type: DataType.INTEGER, allowNull: true, onDelete: 'CASCADE' })
  group_id: number;

  @Column({ type: DataType.TEXT, allowNull: false })
  post_text: string;

  @Column({ type: DataType.BOOLEAN, allowNull: true })
  is_anonym: boolean;

  @ForeignKey(() => Post)
  @Column({ type: DataType.INTEGER, allowNull: true, onDelete: 'CASCADE' })
  forward_post_id: number;

  @BelongsTo(() => User, 'user_id')
  postCreator: User;

  @BelongsTo(() => User, 'user_referer_id')
  userReferer: User;

  @BelongsTo(() => Group, 'group_id')
  group: Group;

  @BelongsTo(() => Post, 'id')
  forwardedPost: Post;

  @HasMany(() => Like)
  likes: Like;

  @HasMany(() => Comment)
  comments: Comment;
}
