import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger/dist/decorators/api-operation.decorator';
import { ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { ReceitaService } from './receitas.service';
import { CreateReceitasDto } from './DTO/create-receita.dto';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { AdminGuard } from '../auth/admin.guard';
import { UpdateReceitasDto } from './DTO/update-receita.dto';


@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('receitas')
export class ReceitaController {

    constructor(private receitaSevice: ReceitaService){}


    @UseGuards(AdminGuard)
    @Post('criar')
    @ApiOperation({ summary: 'Cria uma nova receita' })
    @ApiResponse({ status: 201, description: 'Receita criada com sucesso.' })
    @ApiResponse({ status: 400, description: 'Dados inválidos.' })
    async createreceita(@Body() data: CreateReceitasDto){
        return this.receitaSevice.Criarumareceita(data)
    }

    @Get()
    @ApiOperation({ summary: 'Lista todas as receitas' })
    @ApiResponse({ status: 200, description: 'Lista de receitas.' })
    async todasreceita() {
        return this.receitaSevice.todasreceitas()
    }

    @Get(":id")
    @ApiOperation({ summary: 'Busca uma receita por ID' })
    @ApiResponse({ status: 200, description: 'Receita encontrada.' })
    @ApiResponse({ status: 404, description: 'Receita não encontrada.' })
    async buscaReceitas(@Param("id")id: number) { 
        return this.receitaSevice.buscaReceitas(id)
    }

    @UseGuards(AdminGuard)
    @Put(":id")
    @ApiOperation({ summary: 'Atualiza uma receita por ID' })
    @ApiResponse({ status: 200, description: 'Receita atualizada com sucesso.' })
    @ApiResponse({ status: 404, description: 'Receita não encontrada.' })
   async AtualizaReceitas(@Param('id') id: string, @Body() data: UpdateReceitasDto) {
  return this.receitaSevice.atualizaReceitas(Number(id), data);
}

    @UseGuards(AdminGuard)
    @Delete(":id")
    @ApiOperation({ summary: 'Remove uma receita por ID' })
    @ApiResponse({ status: 200, description: 'Receita removida com sucesso.' })
    async deleteReceita(@Param('id') id: string) {
        return this.receitaSevice.deleteReceitas(Number(id));
    }
}