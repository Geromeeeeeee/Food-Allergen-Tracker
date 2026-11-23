import { PartialType } from '@nestjs/mapped-types';
import { CreateBusinessOwnerDto } from './create-business_owner.dto.js';

export class UpdateBusinessOwnerDto extends PartialType(CreateBusinessOwnerDto) {}
