import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger/dist/decorators/api-operation.decorator';
import { ApiResponse } from '@nestjs/swagger';
import { ReceitaService } from './receitas.service';
import { CreateReceitasDto } from './DTO/create-receita.dto';



@Controller('receitas')
export class ReceitaController {

    constructor(private receitaSevice: ReceitaService){}



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


    @Put(":id")
    @ApiOperation({ summary: 'Atualiza uma receita por ID' })
    @ApiResponse({ status: 200, description: 'Receita atualizada com sucesso.' })
    @ApiResponse({ status: 404, description: 'Receita não encontrada.' })
    async AtualizaReceitas(@Param('id') id: number, @Body() updateReceitaDto: CreateReceitasDto) {
        return this.receitaSevice.atualizaReceitas(id, updateReceitaDto);
    }

    @Delete(":id")
    @ApiOperation({ summary: 'Remove uma receita por ID' })
    @ApiResponse({ status: 200, description: 'Receita removida com sucesso.' })
    async deleteReceita(@Param('id') id: number) {
        return this.receitaSevice.deleteReceitas(id);
    }
}