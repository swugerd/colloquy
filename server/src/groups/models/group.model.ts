import { BelongsTo, Column, DataType, ForeignKey, Table, Model } from 'sequelize-typescript';
import { City } from 'src/cities/models/cities.model';
import { Thematic } from 'src/thematics/models/thematics.model';
import { User } from 'src/users/models/users.model';

interface GroupCreationAttrs {
  group_name: string;
  group_avatar: string;
  group_status?: string;
  city_id: number;
  thematic_id: number;
  group_adress: string;
  group_about?: string;
}

@Table({ tableName: 'groups', updatedAt: false })
export class Group extends Model<Group, GroupCreationAttrs> {
  @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
  id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  group_name: string;

  @Column({ type: DataType.STRING, allowNull: false })
  group_avatar: string;

  @Column({ type: DataType.STRING, allowNull: false })
  group_status: string;

  @ForeignKey(() => City)
  @Column({ type: DataType.INTEGER, allowNull: false, onDelete: 'CASCADE' })
  city_id: number;

  @ForeignKey(() => Thematic)
  @Column({ type: DataType.INTEGER, allowNull: false, onDelete: 'CASCADE' })
  thematic_id: number;

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER, allowNull: false, onDelete: 'CASCADE' })
  creator_id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  group_adress: string;

  @Column({ type: DataType.STRING, allowNull: false })
  group_about: string;

  @BelongsTo(() => City, 'city_id')
  city: City;

  @BelongsTo(() => Thematic, 'thematic_id')
  thematic: Thematic;

  @BelongsTo(() => User, 'creator_id')
  creator: User;
}
