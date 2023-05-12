import { BelongsTo, Column, DataType, ForeignKey, Table, Model } from 'sequelize-typescript';
import { User } from 'src/users/models/users.model';
import { Group } from './group.model';

interface GroupRequestCreationAttrs {
  user_id: number;
  group_id: number;
}

@Table({ tableName: 'group_requests', updatedAt: false })
export class GroupRequest extends Model<GroupRequest, GroupRequestCreationAttrs> {
  @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
  id: number;

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER, allowNull: false, onDelete: 'CASCADE' })
  user_id: number;

  @ForeignKey(() => Group)
  @Column({ type: DataType.INTEGER, allowNull: false, onDelete: 'CASCADE' })
  group_id: number;

  @BelongsTo(() => User, 'user_id')
  user: User;

  @BelongsTo(() => Group, 'group_id')
  group: Group;
}
