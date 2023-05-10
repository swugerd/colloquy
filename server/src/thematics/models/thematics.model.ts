import { Group } from 'src/groups/models/group.model';
import { Column, DataType, HasMany, Table, Model } from 'sequelize-typescript';

interface ThematicCreationAttrs {
  thematic_name: string;
  thematic_value: string;
}

@Table({ tableName: 'thematics', createdAt: false, updatedAt: false })
export class Thematic extends Model<Thematic, ThematicCreationAttrs> {
  @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
  id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  thematic_name: string;

  @Column({ type: DataType.STRING, allowNull: false })
  thematic_value: string;

  @HasMany(() => Group)
  group: Group;
}
