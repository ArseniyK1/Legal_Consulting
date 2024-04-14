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
import { Public } from '../auth/public.decorator';
import { RespondRequestDto } from './dto/Respond-request.dto';
import { ChangeStatusDto } from './dto/ChangeStatus.dto';

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

  @Get('/getMyRequest')
  @ApiOperation({ summary: 'Получение всех активных заявок пользователя' })
  getMyRequest(@Request() req: any) {
    return this.requestService.getMyRequest(req);
  }

  @Get('/openRequest')
  @ApiOperation({
    summary: 'Получение всех открытых заявок пользователей для юриста',
  })
  getOpenRequestByLawyer() {
    return this.requestService.getOpenRequestByLawyer();
  }

  @Patch('/changeStatus')
  @ApiOperation({
    summary: 'Изменение статуста заявки (для оператора)',
  })
  changeStatus(@Query() query: ChangeStatusDto) {
    return this.requestService.changeStatus(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.requestService.findOne(+id);
  }

  @ApiOperation({ summary: 'Откликнуться на заявку (для юристов)' })
  @Patch('/respondRequest')
  async respondRequest(@Request() req: any, @Query() query: RespondRequestDto) {
    return await this.requestService.respondRequest(
      req.user.userId,
      +query.requestId,
    );
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
