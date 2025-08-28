import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator"; 



export class CreateUserDto {
  @ApiProperty({
    example: "criar", description: "nome da User",
  })
  @IsString({ message: "O nome deve ser uma string" })
  @IsNotEmpty({ message: "O nome é obrigatório" })
  name: string;

  @ApiProperty({
    example: "joão paulo", description: "descrição do User",
  })
  @IsString({ message: "A descrição deve ser uma string" })
  @IsNotEmpty({ message: "A descrição é obrigatória" })
  email: string;

  @ApiProperty({
    example: "senha123", description: "senha do User",
  })
  @IsString({ message: "A senha deve ser uma string" })
  @IsNotEmpty({ message: "A senha é obrigatória" })
  senha: string;

 
}