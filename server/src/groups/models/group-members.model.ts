import { BelongsTo, Column, DataType, ForeignKey, Table, Model } from 'sequelize-typescript';
import { User } from 'src/users/models/users.model';
import { Group } from './group.model';

interface GroupMemberCreationAttrs {
  group_id: number;
  user_id: number;
  is_admin: boolean;
}

@Table({ tableName: 'group_members', updatedAt: false })
export class GroupMember extends Model<GroupMember, GroupMemberCreationAttrs> {
  @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
  id: number;

  @ForeignKey(() => Group)
  @Column({ type: DataType.INTEGER, allowNull: false, onDelete: 'CASCADE' })
  group_id: number;

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER, allowNull: false, onDelete: 'CASCADE' })
  user_id: number;

  @Column({ type: DataType.BOOLEAN, allowNull: false })
  is_admin: boolean;

  @BelongsTo(() => Group, 'group_id')
  group: Group;

  @BelongsTo(() => User, 'user_id')
  user: User;
}
