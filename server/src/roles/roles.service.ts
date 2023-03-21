import { CreateRoleDto } from './dto/create-role.dto';
import { Role } from './models/roles.model';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class RolesService {
  constructor(@InjectModel(Role) private readonly roleRepository: typeof Role) {}

  async createRole(dto: CreateRoleDto) {
    console.log(dto);
    const role = await this.roleRepository.create(dto);
    return role;
  }

  async getRoles() {
    const roles = await this.roleRepository.findAll({
      include: { all: true },
      order: [['id', 'ASC']],
    });
    return roles;
  }

  async getRoleByValue(value: string) {
    const role = await this.roleRepository.findOne({ where: { role_value: value } });
    return role;
  }
}
