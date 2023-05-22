import { BelongsTo, Column, DataType, ForeignKey, Table, Model } from 'sequelize-typescript';
import { User } from 'src/users/models/users.model';
import { Chat } from './chat.model';

interface MessageCreationAttrs {
  message_text: string;
  sender_id: number;
  chat_id: number;
}

@Table({ tableName: 'messages' })
export class Message extends Model<Message, MessageCreationAttrs> {
  @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
  id: number;

  @Column({ type: DataType.TEXT, allowNull: false })
  message_text: string;

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER, allowNull: false, onDelete: 'CASCADE' })
  sender_id: number;

  @ForeignKey(() => Chat)
  @Column({ type: DataType.INTEGER, allowNull: true, onDelete: 'CASCADE' })
  chat_id: number;

  @BelongsTo(() => User, 'sender_id')
  user: User;

  @BelongsTo(() => Chat, 'chat_id')
  chat: Chat;
}
