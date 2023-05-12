import { BelongsTo, Column, DataType, ForeignKey, Table, Model } from 'sequelize-typescript';
import { User } from 'src/users/models/users.model';
import { Group } from './group.model';

interface GroupSuggestCreationAttrs {
  user_id: number;
  is_anonym: boolean;
  group_id: number;
  suggest_text: string;
}

@Table({ tableName: 'group_suggest', updatedAt: false })
export class GroupSuggest extends Model<GroupSuggest, GroupSuggestCreationAttrs> {
  @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
  id: number;

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER, allowNull: false, onDelete: 'CASCADE' })
  user_id: number;

  @Column({ type: DataType.BOOLEAN, allowNull: false })
  is_anonym: boolean;

  @ForeignKey(() => Group)
  @Column({ type: DataType.INTEGER, allowNull: false, onDelete: 'CASCADE' })
  group_id: number;

  @Column({ type: DataType.TEXT, allowNull: false })
  suggest_text: string;

  @BelongsTo(() => User, 'user_id')
  user: User;

  @BelongsTo(() => Group, 'group_id')
  group: Group;
}
