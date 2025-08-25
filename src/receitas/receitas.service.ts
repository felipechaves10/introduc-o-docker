

import { Injectable } from '@nestjs/common';
import { Prisma, PrismaClient, receitas } from '@prisma/client';
import { promises } from 'dns';
import { PrismaService } from '../prisma/prisma.service';

const prisma = new PrismaClient();

@Injectable()
export class ReceitaService {

    constructor(private prisma: PrismaService){}


    async Criarumareceita(data: Prisma.receitasCreateInput): Promise<receitas>{
        return this.prisma.receitas.create({
            data
        });
    }
    async todasreceitas(){
        return this.prisma.receitas.findMany();
    }

    async buscaReceitas(id: number){
        return this.prisma.receitas.findUnique({
            where:{id}
        });
    }
    async atualizaReceitas(id: number, data: Prisma.receitasUpdateInput): Promise<receitas> {
        return this.prisma.receitas.update({
            where: {id},
             data
        });

    }


    async deleteReceitas(id: number) {
        return this.prisma.receitas.delete({
            where: {id},
            
        });
    }










}