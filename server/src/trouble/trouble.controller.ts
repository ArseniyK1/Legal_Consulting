import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TroubleService } from './trouble.service';
import { CreateTroubleDto } from './dto/create-trouble.dto';
import { UpdateTroubleDto } from './dto/update-trouble.dto';

@Controller('trouble')
export class TroubleController {
  constructor(private readonly troubleService: TroubleService) {}

  @Post()
  create(@Body() createTroubleDto: CreateTroubleDto) {
    return this.troubleService.create(createTroubleDto);
  }

  @Get()
  findAll() {
    return this.troubleService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.troubleService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTroubleDto: UpdateTroubleDto) {
    return this.troubleService.update(+id, updateTroubleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.troubleService.remove(+id);
  }
}
