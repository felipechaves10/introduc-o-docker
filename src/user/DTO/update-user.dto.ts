import { PartialType } from '@nestjs/swagger';
import{ CreateUserDto } from './cretate-user.dto'; 

export class UpdateUserDto extends PartialType(CreateUserDto) {}