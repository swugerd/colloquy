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
import { UserRoles } from './user-roles.model';

interface RoleCreationAttrs {
  name: string;
  value: string;
}

@Table({ tableName: 'roles', createdAt: false, updatedAt: false })
export class Role extends Model<Role, RoleCreationAttrs> {
  @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
  id: number;

  @Column({ type: DataType.STRING, allowNull: false, unique: true })
  role_name: string;

  @Column({ type: DataType.STRING, allowNull: false, unique: true })
  role_value: string;

  @Column({ type: DataType.STRING, allowNull: true })
  role_desc: string;

  @BelongsToMany(() => User, () => UserRoles)
  users: User[];
}
