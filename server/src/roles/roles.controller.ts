import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RoleByValueDto } from './dto/RoleByValue.dto';

@ApiTags('Roles')
@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @ApiOperation({ summary: 'Создаение роли' })
  @Post()
  async createRole(@Body() createRoleDto: CreateRoleDto) {
    return await this.rolesService.createRole(createRoleDto);
  }

  @ApiOperation({ summary: 'Получение роли' })
  @ApiResponse({ type: RoleByValueDto })
  @Get(':value')
  async getRoleByValue(@Param('value') value: string) {
    return await this.rolesService.getRoleByValue(value);
  }
}
