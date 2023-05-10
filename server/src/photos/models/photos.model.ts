import { BelongsTo, Column, DataType, ForeignKey, Table, Model } from 'sequelize-typescript';
import { Group } from 'src/groups/models/group.model';
import { User } from 'src/users/models/users.model';

interface PhotoCreationAttrs {
  user_id?: number;
  group_id?: number;
  photo_url: string;
}

@Table({ tableName: 'photos', updatedAt: false })
export class Photo extends Model<Photo, PhotoCreationAttrs> {
  @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
  id: number;

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER, allowNull: true, onDelete: 'CASCADE' })
  user_id: number;

  @ForeignKey(() => Group)
  @Column({ type: DataType.INTEGER, allowNull: true, onDelete: 'CASCADE' })
  group_id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  photo_url: string;

  @BelongsTo(() => User, 'user_id')
  user: User;

  @BelongsTo(() => Group, 'group_id')
  group: Group;
}
