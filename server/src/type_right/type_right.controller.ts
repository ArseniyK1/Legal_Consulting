import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TypeRightService } from './type_right.service';
import { CreateTypeRightDto } from './dto/create-type_right.dto';
import { UpdateTypeRightDto } from './dto/update-type_right.dto';

@Controller('type-right')
export class TypeRightController {
  constructor(private readonly typeRightService: TypeRightService) {}

  @Post()
  create(@Body() createTypeRightDto: CreateTypeRightDto) {
    return this.typeRightService.create(createTypeRightDto);
  }

  @Get()
  findAll() {
    return this.typeRightService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.typeRightService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTypeRightDto: UpdateTypeRightDto) {
    return this.typeRightService.update(+id, updateTypeRightDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.typeRightService.remove(+id);
  }
}
