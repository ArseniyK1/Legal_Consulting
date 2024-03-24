import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import config from '../../config/configuration';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private logger = new Logger('HTTP');

  private loggerConfig = config().LOGGER;

  use(request: Request, response: Response, next: NextFunction): void {
    const { ip, method, originalUrl, headers, body, query } = request;
    const userAgent = request.get('user-agent') || '';

    // Logging request/response
    // response.on('close', () => {
    //   this.logger.log('req:', `${method} ${originalUrl} - ${userAgent} ${ip}`);
    //   this.logger.log('req headers:', headers);
    // });
    response.on('finish', () => {
      const { statusCode } = response;
      const contentLength = response.get('content-length');

      switch (true) {
        case statusCode < 300:
          this.logger.log(
            `${method} ${originalUrl} ${statusCode} ${contentLength} - ${userAgent} ${ip}`,
          );
          break;
        case statusCode >= 400:
          this.logger.error(
            `${method} ${originalUrl} ${statusCode} ${contentLength} - ${userAgent} ${ip}`,
          );
          break;
        default:
          this.logger.log(
            `${method} ${originalUrl} ${statusCode} - ${userAgent} ${ip}`,
          );
      }

      if (method != 'GET' && this.loggerConfig?.print_req_body)
        this.logger.log(body);
      else if (this.loggerConfig.print_req_body) this.logger.log(query);
    });

    next();
  }
}
