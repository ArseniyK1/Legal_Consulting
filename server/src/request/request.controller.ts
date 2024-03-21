import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Request,
} from '@nestjs/common';
import { RequestService } from './request.service';
import { CreateRequestDto } from './dto/create-request.dto';
import { UpdateRequestDto } from './dto/update-request.dto';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ReqGuardsReturnObject } from '../return-object/reqGuards.return-object';
import { AllRequestReturnObject } from '../return-object/allRequestReturn.return-object';
import { CreateRequestReturnObject } from '../return-object/createRequest.return-object';

@ApiTags('Request')
@Controller('request')
export class RequestController {
  constructor(private readonly requestService: RequestService) {}

  @Post()
  @ApiOperation({ summary: 'Создание заявки' })
  @ApiResponse({ type: CreateRequestReturnObject })
  createRequest(
    @Request() req: any,
    @Body() createRequestDto: CreateRequestDto,
  ) {
    return this.requestService.createRequest(req, createRequestDto);
  }

  @Get()
  @ApiOperation({ summary: 'Получение всех заявок пользователя' })
  @ApiResponse({ type: [AllRequestReturnObject] })
  findAllRequestByUser(@Request() req: any) {
    return this.requestService.findAllRequestByUser(req);
  }

  @Get('/openRequest')
  @ApiOperation({
    summary: 'Получение всех открытых заявок пользователей для юриста',
  })
  getOpenRequestByLawyer() {
    return this.requestService.getOpenRequestByLawyer();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.requestService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRequestDto: UpdateRequestDto) {
    return this.requestService.update(+id, updateRequestDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.requestService.remove(+id);
  }
}
