import { Sequelize } from 'sequelize';
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Table,
  Model,
  BelongsToMany,
} from 'sequelize-typescript';
import { City } from 'src/cities/models/cities.model';
import { Role } from 'src/roles/models/roles.model';
import { UserRoles } from 'src/roles/models/user-roles.model';

interface UserCreationAttrs {
  nickname: string;
  email: string;
  password: string;
  name: string;
  surname: string;
  birthdate: string;
  gender: 'male' | 'female';
  avatar: string;
}

@Table({ tableName: 'users' })
export class User extends Model<User, UserCreationAttrs> {
  @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
  id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  user_name: string;

  @Column({ type: DataType.STRING, allowNull: false })
  user_surname: string;

  @Column({ type: DataType.STRING, allowNull: true })
  user_patronymic: string;

  @Column({ type: DataType.STRING, allowNull: false })
  user_avatar: string;

  @Column({ type: DataType.STRING, allowNull: false })
  user_gender: 'male' | 'female';

  @ForeignKey(() => City)
  @Column({ type: DataType.INTEGER, allowNull: true })
  city_id: number | undefined;

  @Column({ type: DataType.DATE, allowNull: false })
  user_birthdate: string;

  @Column({ type: DataType.STRING, allowNull: false, unique: true })
  user_nickname: string;

  @Column({ type: DataType.STRING, allowNull: false })
  user_password: string;

  @Column({ type: DataType.STRING, allowNull: false, unique: true })
  user_email: string;

  @Column({ type: DataType.STRING, allowNull: true, unique: true })
  user_phone: string;

  @Column({ type: DataType.STRING, allowNull: true, unique: true })
  user_sub_phone: string;

  @Column({ type: DataType.STRING, allowNull: true, unique: true })
  user_telegram: string;

  @Column({ type: DataType.STRING, allowNull: true })
  user_status: string;

  @Column({ type: DataType.STRING, allowNull: true })
  user_about: string;

  @Column({
    type: DataType.DATE,
    allowNull: false,
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
  })
  last_seen: string;

  @Column({ type: DataType.STRING, allowNull: false, defaultValue: 'pc-online' })
  online_type: 'pc-online' | 'pc-dnd' | 'pc-afk' | 'pc-offline';

  @BelongsTo(() => City)
  city: City;

  @BelongsToMany(() => Role, () => UserRoles)
  roles: Role[];
}
