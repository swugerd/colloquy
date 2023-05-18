import { BelongsTo, Column, DataType, ForeignKey, Table, Model } from 'sequelize-typescript';
import { User } from 'src/users/models/users.model';
import { Group } from './group.model';

interface BlacklistCreationAttrs {
  user_id?: number;
  group_id?: number;
  blocked_user_id: number;
}

@Table({ tableName: 'blacklist', updatedAt: false })
export class Blacklist extends Model<Blacklist, BlacklistCreationAttrs> {
  @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
  id: number;

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER, allowNull: true, onDelete: 'CASCADE' })
  user_id: number;

  @ForeignKey(() => Group)
  @Column({ type: DataType.INTEGER, allowNull: true, onDelete: 'CASCADE' })
  group_id: number;

  @Column({ type: DataType.INTEGER, allowNull: false })
  blocked_user_id: number;

  @BelongsTo(() => User, 'blocked_user_id')
  blockedUser: User;

  @BelongsTo(() => Group, 'group_id')
  group: Group;
}
