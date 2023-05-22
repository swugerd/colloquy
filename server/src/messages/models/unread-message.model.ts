import { BelongsTo, Column, DataType, ForeignKey, Table, Model } from 'sequelize-typescript';
import { User } from 'src/users/models/users.model';
import { Message } from './message.model';
import { Chat } from './chat.model';

interface UnreadMessageCreationAttrs {
  chat_id: number;
  user_id: number;
  message_id: number;
}

@Table({ tableName: 'unread_messages', updatedAt: false, createdAt: false })
export class UnreadMessage extends Model<UnreadMessage, UnreadMessageCreationAttrs> {
  @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
  id: number;

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER, allowNull: false, onDelete: 'CASCADE' })
  chat_id: number;

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER, allowNull: false, onDelete: 'CASCADE' })
  user_id: number;

  @ForeignKey(() => Message)
  @Column({ type: DataType.INTEGER, allowNull: false, onDelete: 'CASCADE' })
  message_id: number;

  @BelongsTo(() => Chat, 'chat_id')
  chat: Chat;

  @BelongsTo(() => User, 'user_id')
  user: User;

  @BelongsTo(() => Message, 'message_id')
  message: Message;
}
