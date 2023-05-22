import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Table,
  Model,
  HasMany,
} from 'sequelize-typescript';
import { User } from 'src/users/models/users.model';
import { Message } from './message.model';

interface ChatCreationAttrs {
  user1_id: number;
  user2_id: number;
}

@Table({ tableName: 'chats', updatedAt: false })
export class Chat extends Model<Chat, ChatCreationAttrs> {
  @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
  id: number;

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER, allowNull: false, onDelete: 'CASCADE' })
  user1_id: number;

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER, allowNull: false, onDelete: 'CASCADE' })
  user2_id: number;

  @BelongsTo(() => User, 'user1_id')
  user1: User;

  @BelongsTo(() => User, 'user2_id')
  user2: User;

  @HasMany(() => Message)
  messages: Message[];
}
