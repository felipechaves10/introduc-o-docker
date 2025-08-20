import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator"; 



export class CreateReceitasDto {
  @ApiProperty({
    example: "criar", description: "nome da Receita",
  })
  @IsString({ message: "O nome deve ser uma string" })
  @IsNotEmpty({ message: "O nome é obrigatório" })
  name: string;

  @ApiProperty({
    example: "bolos de milho", description: "descrição da Receita",
  })
  @IsString({ message: "A descrição deve ser uma string" })
  @IsNotEmpty({ message: "A descrição é obrigatória" })
  ingrediete: string;

  @ApiProperty({
    example: 10.99, description: "preço da Receita",
  })
  @IsNotEmpty({ message: "O preço é obrigatório" })
  preparo: string;
}