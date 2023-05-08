import { BelongsTo, Column, DataType, ForeignKey, Table, Model } from 'sequelize-typescript';
import { User } from 'src/users/models/users.model';

interface FriendRequestsCreationAttrs {
  user_outcome_id: number;
  user_income_id: number;
}

@Table({ tableName: 'friend_requests' })
export class FriendsRequests extends Model<FriendsRequests, FriendRequestsCreationAttrs> {
  @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
  id: number;

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER, allowNull: false, onDelete: 'CASCADE' })
  user_outcome_id: number;

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER, allowNull: false, onDelete: 'CASCADE' })
  user_income_id: number;

  @BelongsTo(() => User, 'user_outcome_id')
  user: User;

  @BelongsTo(() => User, 'user_income_id')
  friend: User;
}
