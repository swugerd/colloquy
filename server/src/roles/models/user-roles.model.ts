import { Role } from './roles.model';
import { User } from '../../users/models/users.model';
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Table,
  Model,
  BelongsToMany,
} from 'sequelize-typescript';

@Table({ tableName: 'user_roles', createdAt: false, updatedAt: false })
export class UserRoles extends Model<UserRoles> {
  @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
  id: number;

  @ForeignKey(() => Role)
  @Column({ type: DataType.INTEGER, allowNull: false })
  role_id: number;

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER, allowNull: false })
  user_id: string;
}
