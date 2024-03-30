import { Length } from 'class-validator';
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { Request } from 'express';

/**
 * Добавляет стандартный в стандартный ответ с ошибкой в body поля timestamp и url

 пример Response body:
 {
  "statusCode": 500,
  "timestamp": "12.01.2023, 13:48:12",
  "message": "IncomeService: Ошибка при запросе документов поступления: Unexpected number in JSON at position 2",
  "error": "Internal Server Error",
  "url": "/api/v1/income"
  "method": "GET"
}

 */

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger();
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}
  catch(exception: any, host: ArgumentsHost): void {
    // In certain situations `httpAdapter` might not be available in the
    // constructor method, thus we should resolve it here.
    const { httpAdapter } = this.httpAdapterHost;

    const ctx = host.switchToHttp();

    const request = ctx.getRequest<Request>();

    const responseBody = {
      statusCode:
        exception instanceof HttpException
          ? exception.getStatus()
          : HttpStatus.INTERNAL_SERVER_ERROR,
      timestamp: new Date().toLocaleString(),
      // exception: exception,
      url: request.url,
      method: request.method,
      payload: {},
    };
    const getAllCause = (item: HttpException | Error) => {
      const stack = [];
      let matched;
      try {
        const spliceStack = item.stack.split('\n')[1].split('/');
        // возвращает массив с модулем и строками где ошибка
        matched = spliceStack[spliceStack.length - 1].match(
          /(^.*ts):(\d{0,10}):(\d{0,10})/,
        );
      } catch (e) {
        this.logger.error(e.message);
      }
      stack.push({
        // message: item.message,
        moduleName: matched?.[1] || 'unknown',
        // type: item.name,
        // statusCode:
        //   item instanceof HttpException
        //     ? item.getStatus()
        //     : HttpStatus.INTERNAL_SERVER_ERROR,
      });
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      if (!item.cause) return stack;
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const getCause = getAllCause(item.cause as Error);
      stack.push(...getCause);
      return stack;
    };
    switch (request.method) {
      case 'GET':
        responseBody.payload = request.query;
        break;
      case 'POST':
        responseBody.payload = request.body;
        break;
      default:
        responseBody.payload = request.body;
        break;
    }
    let causes = [];

    if (Array.isArray(exception))
      exception.forEach((item) => causes.push(...getAllCause(item)));
    else causes = getAllCause(exception);

    responseBody['message'] =
      exception.response?.message ||
      exception.message ||
      causes[causes.length - 1]?.message ||
      'unknown error message';
    responseBody['error'] =
      causes[causes.length - 1]?.type ||
      exception.response?.error ||
      exception.name ||
      'unknown error';
    responseBody['statusCode'] =
      causes[causes.length - 1]?.statusCode ||
      exception.response?.statusCode ||
      exception.statusCode ||
      HttpStatus.INTERNAL_SERVER_ERROR;
    responseBody['stackTrace'] = causes;

    httpAdapter.reply(ctx.getResponse(), responseBody, responseBody.statusCode);
  }
}
