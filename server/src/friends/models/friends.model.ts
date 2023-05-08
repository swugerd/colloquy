import { BelongsTo, Column, DataType, ForeignKey, Table, Model } from 'sequelize-typescript';
import { User } from 'src/users/models/users.model';

interface FriendshipCreationAttrs {
  user1_id: number;
  user2_id: number;
}

@Table({ tableName: 'friendships' })
export class Friends extends Model<Friends, FriendshipCreationAttrs> {
  @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
  id: number;

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER, allowNull: false, onDelete: 'CASCADE' })
  user1_id: number;

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER, allowNull: false, onDelete: 'CASCADE' })
  user2_id: number;

  @BelongsTo(() => User, 'user1_id')
  user: User;

  @BelongsTo(() => User, 'user2_id')
  friend: User;
}
