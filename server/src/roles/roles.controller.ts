import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { ApiOperation } from '@nestjs/swagger';
import { AuthGuard } from '../auth/auth.guard';
import { Public } from '../auth/public.decorator';
import { Role, Roles } from './decorators/roles.decorator';

@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @ApiOperation({ summary: 'Создаение роли' })
  @Post()
  async createRole(@Body() createRoleDto: CreateRoleDto) {
    return await this.rolesService.createRole(createRoleDto);
  }

  @ApiOperation({ summary: 'Получение роли' })
  @Get(':value')
  async getRoleByValue(@Param('value') value: string) {
    return await this.rolesService.getRoleByValue(value);
  }
}
