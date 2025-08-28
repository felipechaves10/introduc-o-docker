
import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger/dist/decorators/api-operation.decorator';
import { ApiResponse } from '@nestjs/swagger';
import { CreateUserDto } from './DTO/cretate-user.dto';
import { UserService } from './user.service';
import { identity } from 'rxjs';

@Controller('user')
export class UserController{

    constructor(private userService: UserService){}



    @Post('criar')
    @ApiOperation({ summary: 'Cria um novo usuário' })
    @ApiResponse({ status: 201, description: 'Usuário criado com sucesso.' })
    @ApiResponse({ status: 400, description: 'Dados inválidos.' })
    async createUser(@Body() data: CreateUserDto) {
        return this.userService.createUser(data);
    }

    @Get()
    @ApiOperation({ summary: 'Lista todos os usuários' })
    @ApiResponse({ status: 200, description: 'Lista de usuários.' })
    async findAllUsers() {
        return this.userService.findAll();
    }

    @Get(":id")
    @ApiOperation({ summary: 'Busca um usuário por ID' })
    @ApiResponse({ status: 200, description: 'Usuário encontrado.' })
    @ApiResponse({ status: 404, description: 'Usuário não encontrado.' })
    async findUserById(@Param("id") id: number) {
        return this.userService.atualizarUser(id);
    }


    @Put(":id")
    @ApiOperation({ summary: 'Atualiza um usuário por ID' })
    @ApiResponse({ status: 200, description: 'Usuário atualizado com sucesso.' })
    @ApiResponse({ status: 404, description: 'Usuário não encontrado.' })
    async updateUser(@Param('id') id: number, @Body() updateUserDto: CreateUserDto) {
        return this.userService.update(id, updateUserDto);
    }

    @Delete(":id")
    @ApiOperation({ summary: 'Remove um usuário por ID' })
    @ApiResponse({ status: 200, description: 'Usuário removido com sucesso.' })
    async deleteUser(@Param('id') id: number) {
        return this.userService.removeUser(id);
    }
}