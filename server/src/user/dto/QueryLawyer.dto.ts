import { IsOptional, IsString } from 'class-validator';

export class QueryLawyerDto {
  type_law?: string;
  lawyerName?: string;
  organization?: string;
}
