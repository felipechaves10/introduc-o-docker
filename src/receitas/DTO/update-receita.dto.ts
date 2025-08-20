import { PartialType } from '@nestjs/swagger';
import{ CreateReceitasDto } from './create-receita.dto'; 

export class UpdateReceitasDto extends PartialType(CreateReceitasDto) {}