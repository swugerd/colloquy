import { User } from '../../users/models/users.model';
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Table,
  Model,
} from 'sequelize-typescript';

interface CityCreationAttrs {
  name: string;
  value: string;
}

@Table({ tableName: 'cities', createdAt: false, updatedAt: false })
export class City extends Model<City, CityCreationAttrs> {
  @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
  id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  city_name: string;

  @Column({ type: DataType.STRING, allowNull: false })
  city_value: string;

  @HasMany(() => User)
  user: User;
}
