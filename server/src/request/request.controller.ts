import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Request,
} from '@nestjs/common';
import { RequestService } from './request.service';
import { CreateRequestDto } from './dto/create-request.dto';
import { UpdateRequestDto } from './dto/update-request.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AllRequestReturnObject } from '../return-object/allRequestReturn.return-object';
import { CreateRequestReturnObject } from '../return-object/createRequest.return-object';
import { RespondRequestDto } from './dto/respond-request.dto';
import { ChangeStatusDto } from './dto/change-status.dto';
import { Role, Roles } from '../roles/decorators/roles.decorator';
import { GetAllRequestDto } from './dto/getAllRequest.dto';
import { OfferTimeConsultationDto } from './dto/offerTimeConsultation.dto';
import { ProposedRequestDto } from './dto/ProposedRequest.dto';
import { DoneRequestDto } from './dto/DoneRequest.dto';
import { QueryLawyerDto } from '../user/dto/QueryLawyer.dto';

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

  // @Roles(Role.operator)
  @Get('/getAllRequests')
  @ApiOperation({ summary: 'Получение всех заявок всех пользователей' })
  findAllRequests(@Query() query: GetAllRequestDto) {
    return this.requestService.findAllRequests(query);
  }

  @Patch('/proposedRequest')
  @ApiOperation({ summary: 'Откликнуться на предложенную заявку' })
  proposedRequest(@Request() req: any, @Query() query: ProposedRequestDto) {
    return this.requestService.proposedRequest(query);
  }

  @Patch('/doneRequest')
  @ApiOperation({ summary: 'Откликнуться на предложенную заявку' })
  doneRequest(@Request() req: any, @Body() query: DoneRequestDto) {
    return this.requestService.doneRequest(req, query);
  }

  @Roles(Role.lawyer)
  @Get('/getProposedRequest')
  @ApiOperation({ summary: 'Получение всех предложенных заявок юристом' })
  getProposedRequest(@Request() req: any) {
    return this.requestService.getProposedRequest(+req.user.userId);
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

  @Get('fetchMyRequests')
  @Roles(Role.lawyer)
  @ApiOperation({ summary: 'Получение всех активных заявок для юриста' })
  fetchMyRequests(@Request() req: any, @Query() query: GetAllRequestDto) {
    return this.requestService.fetchMyRequests(+req.user.userId, query);
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

  @ApiOperation({ summary: 'Предложить время консультации' })
  @Patch('/offerTimeConsultation')
  async offerTimeConsultation(
    @Request() req: any,
    @Body() dto: OfferTimeConsultationDto,
  ) {
    return await this.requestService.offerTimeConsultation(
      req.user.userId,
      +dto.requestId,
      dto.suggested_date,
    );
  }

  @ApiOperation({ summary: 'Согласиться на предложенное время консультации' })
  @Patch('/confirmSuggestedTime')
  async confirmSuggestedTime(
    @Request() req: any,
    @Query() query: RespondRequestDto,
  ) {
    return await this.requestService.confirmSuggestedTime(+query.requestId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRequestDto: UpdateRequestDto) {
    return this.requestService.update(+id, updateRequestDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.requestService.remove(+id);
  }

  @Patch('/rejectDateMeeting')
  @ApiOperation({ summary: 'Отменить заявку' })
  async rejectDateMeeting(@Query('requestId') requestId: string) {
    return await this.requestService.rejectDateMeeting(requestId);
  }
}
